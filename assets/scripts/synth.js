import Tuna from 'tunajs'
const frequencies = require('./frequencies')
const store = require('./store')

// temporary store to hold active synth nodes
const synthKeys = {}

// function to return new pitch when user adjusts octave
const octavizer = function (pitch) {
  let newPitch = pitch
  const oct = store.octave
  switch (true) {
    case (oct === 1):
      newPitch = pitch * 2
      break
    case (oct === 2):
      newPitch = pitch * 4
      break
    case (oct >= 3):
      newPitch = pitch * 8
      break
    case (oct === -1):
      newPitch = pitch / 2
      break
    case (oct === -2):
      newPitch = pitch / 4
      break
    case (oct <= -3):
      newPitch = pitch / 8
      break
  }
  return newPitch
}

// Synth class is instansiated each time the user plays a note and destroyed on
// release.
class Synth {
  constructor (key, pitch) {
    // user input key
    this.key = key
    // frequency for that note
    this.pitch = pitch
    // Create new oscillator node attached to audio context in the store
    this.oscillator = store.audioContext.createOscillator()
    // create gain node on audio context
    this.gain = store.audioContext.createGain()
    // assign this.pitch to the freqency value of the oscillator
    this.oscillator.frequency.value = this.pitch
    // set gain value
    this.gain.gain.value = 0.0
    // Create new instance of tunajs object to call its effects function
    this.tuna = new Tuna(store.audioContext)
    // start oscillator node
    this.oscillator.start(store.audioContext.currentTime)
    // create lowpass filter from tunajs
    this.filter = new this.tuna.Filter({
      frequency: 4, // 20 to 22050
      Q: 1, // 0.001 to 100
      gain: 0, // -40 to 40 (in decibels)
      filterType: 'lowpass', // lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
      bypass: 0
    })
    // create chorus effect from tunajs
    this.chorus = new this.tuna.Chorus({
      rate: 4, // 0.01 to 8+
      feedback: 0.4, // 0 to 1+
      delay: 0.5, // 0 to 1
      bypass: 0 // the value 1 starts the effect as bypassed, 0 or 1
    })
    // connect signal chain before destination
    this.oscillator.connect(this.chorus)
    this.chorus.connect(this.filter)
    this.filter.connect(this.gain)
  }
  // Function called when user plays a note
  synthOn () {
    // assign waveform type based on current_setting
    this.oscillator.type = store.current_setting.oscillator_type
    // assign class to current key to change ui color
    $(`#${this.key}`).addClass(`${this.key}`)
    // assign filter cutoff
    this.filter.frequency = store.current_setting.filtercutoff
    // assign chorus rate
    this.chorus.rate = store.current_setting.chorusrate
    // fade gain up to avoid ugly clicking noise at note start
    this.gain.gain.setTargetAtTime(0.8, store.audioContext.currentTime, 0.02)
    // connect node to audio output
    this.gain.connect(store.audioContext.destination)
  }
  // Function called when user stops playing a note
  synthOff () {
    const key = this.key
    // remove ui coloring
    $(`#${this.key}`).removeClass(`${this.key}`)
    // fade note out
    this.gain.gain.setTargetAtTime(0.00001, store.audioContext.currentTime, 0.05)
    // create promise to disconnect node from output once the note has fully stopped.
    // this is IMPORTANT - prevents memory leak from nodes persisting.
    return new Promise((resolve) => {
      // whenever the node actually finishes playing, disconnect it
      this.oscillator.onended = function () {
        synthKeys[key].oscillator.disconnect()
        resolve()
      }
    })
  }
}

// function to handle keydown/up event
const synthCall = function (event) {
  const key = event.key
  // reassign octave state when user hits octave keys
  if (event.type === 'keydown' && event.key === ',') {
    store.octave -= 1
  } else if (event.type === 'keydown' && event.key === '.') {
    store.octave += 1
  }
  // create new Synth instance based on which key was hit
  frequencies.default.map(note => {
    if (note.keyboard === key && !synthKeys[key]) {
      synthKeys[note.keyboard] = new Synth(note.keyboard, note.pitch)
    }
  })
  // assign frequency value based on octave state and call method to start synth
  if (event.type === 'keydown' && synthKeys[key]) {
    synthKeys[key].oscillator.frequency.value = octavizer(synthKeys[key].pitch)
    synthKeys[key].synthOn()
    // on key release, synth stops
  } else if (synthKeys[key]) {
    synthKeys[key].synthOff()
    // on focusout, synth stops
  } else if (event.type === 'focusout') {
    for (const key in synthKeys) {
      if (synthKeys[key]) {
        synthKeys[key].synthOff()
      }
    }
  }
}

module.exports = {
  synthCall
}
