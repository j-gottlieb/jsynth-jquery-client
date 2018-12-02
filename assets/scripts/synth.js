const frequencies = require('./frequencies')

const synth = {}

class Synth {
  constructor (key, pitch) {
    this.key = key
    this.pitch = pitch
    this.audioContext = new AudioContext()
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.start()
  }

  synthOn () {
    this.oscillator.frequency.value = this.pitch
    this.oscillator.connect(this.audioContext.destination)
  }

  synthOff () {
    this.oscillator.disconnect()
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
