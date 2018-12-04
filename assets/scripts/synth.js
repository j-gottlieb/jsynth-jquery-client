import Tuna from 'tunajs'
const frequencies = require('./frequencies')
const store = require('./store')

const synthKeys = {}
const audioContext = new AudioContext()

class Synth {
  constructor (key, pitch) {
    this.key = key
    this.pitch = pitch
    this.audioContext = audioContext
    this.oscillator = this.audioContext.createOscillator()
    this.gain = this.audioContext.createGain()
    this.oscillator.frequency.value = this.pitch
    this.oscillator.type = 'square'
    this.gain.gain.value = 0.0
    this.tuna = new Tuna(this.audioContext)
    this.oscillator.start()
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
    $(`#${this.key}`).addClass(`${this.key}`)
    this.filter.frequency = store.current_setting.filtercutoff
    this.chorus.rate = store.current_setting.chorusrate
    this.gain.gain.setTargetAtTime(0.8, this.audioContext.currentTime, 0.02)
    this.gain.connect(this.audioContext.destination)
  }

  synthOff () {
    $(`#${this.key}`).removeClass(`${this.key}`)
    this.gain.gain.setTargetAtTime(0.00001, this.audioContext.currentTime, 0.05)
  }
}

const synthCall = function (event) {
  const key = event.key
  frequencies.default.map(note => {
    if (note.keyboard === key && !synthKeys[key]) {
      synthKeys[note.keyboard] = new Synth(note.keyboard, note.pitch)
    }
  })
  if (event.type === 'keydown' && synthKeys[key]) {
    synthKeys[key].synthOn()
  } else if (synthKeys[key]) {
    synthKeys[key].synthOff()
    synthKeys[key] = null
  }
}

module.exports = {
  synthCall
}
