import Tuna from 'tunajs'
const frequencies = require('./frequencies')
const store = require('./store')

const synthKeys = {}

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

class Synth {
  constructor (key, pitch) {
    this.key = key
    this.pitch = pitch
    // this.store.audioContext = store.audioContext
    this.oscillator = store.audioContext.createOscillator()
    this.gain = store.audioContext.createGain()
    this.oscillator.frequency.value = this.pitch
    // this.oscillator.type = store.current_setting.oscillator_type
    this.gain.gain.value = 0.0
    this.tuna = new Tuna(store.audioContext)
    this.oscillator.start(store.audioContext.currentTime)
    this.filter = new this.tuna.Filter({
      frequency: 4, // 20 to 22050
      Q: 1, // 0.001 to 100
      gain: 0, // -40 to 40 (in decibels)
      filterType: 'lowpass', // lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
      bypass: 0
    })

    this.chorus = new this.tuna.Chorus({
      rate: 4, // 0.01 to 8+
      feedback: 0.4, // 0 to 1+
      delay: 0.5, // 0 to 1
      bypass: 0 // the value 1 starts the effect as bypassed, 0 or 1
    })
    this.oscillator.connect(this.chorus)
    this.chorus.connect(this.filter)
    this.filter.connect(this.gain)
  }

  synthOn () {
    this.oscillator.type = store.current_setting.oscillator_type
    $(`#${this.key}`).addClass(`${this.key}`)
    this.filter.frequency = store.current_setting.filtercutoff
    this.chorus.rate = store.current_setting.chorusrate
    this.gain.gain.setTargetAtTime(0.8, store.audioContext.currentTime, 0.02)
    this.gain.connect(store.audioContext.destination)
  }

  synthOff () {
    const key = this.key
    $(`#${this.key}`).removeClass(`${this.key}`)
    this.gain.gain.setTargetAtTime(0.00001, store.audioContext.currentTime, 0.05)
    return new Promise((resolve) => {
      // whenever the node actually finishes playing, disconnect it
      this.oscillator.onended = function () {
        synthKeys[key].oscillator.disconnect()
        resolve()
      }
    })
  }
}

const synthCall = function (event) {
  const key = event.key
  if (event.type === 'keydown' && event.key === ',') {
    store.octave -= 1
  } else if (event.type === 'keydown' && event.key === '.') {
    store.octave += 1
  }
  frequencies.default.map(note => {
    if (note.keyboard === key && !synthKeys[key]) {
      synthKeys[note.keyboard] = new Synth(note.keyboard, note.pitch)
    }
  })
  if (event.type === 'keydown' && synthKeys[key]) {
    synthKeys[key].oscillator.frequency.value = octavizer(synthKeys[key].pitch)
    synthKeys[key].synthOn()
  } else if (synthKeys[key]) {
    synthKeys[key].synthOff()
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
