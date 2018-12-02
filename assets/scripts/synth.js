const frequencies = require('./frequencies')

const synth = {}

class Synth {
  constructor (key, pitch) {
    this.key = key
    this.pitch = pitch
    this.audioContext = new AudioContext()
    this.oscillator = this.audioContext.createOscillator()
    this.gain = this.audioContext.createGain()
    this.gain.gain.value = 0.0
    this.oscillator.start()
  }

  synthOn () {
    this.gain.gain.setTargetAtTime(0.8, this.audioContext.currentTime, 0.02)
    this.oscillator.frequency.value = this.pitch
    this.oscillator.connect(this.gain)
    this.gain.connect(this.audioContext.destination)
  }

  synthOff () {
    this.gain.gain.setTargetAtTime(0.00001, this.audioContext.currentTime, 0.05)
    // this.oscillator.disconnect()
  }
}

const synthCall = function (event) {
  const key = event.key
  frequencies.default.map(note => {
    if (note.keyboard === key && !synth[key]) {
      synth[note.keyboard] = new Synth(note.keyboard, note.pitch)
    }
  })
  if (event.type === 'keydown') {
    synth[key].synthOn()
  } else {
    synth[key].synthOff()
    synth[key] = null
  }
}

module.exports = {
  synthCall
}
