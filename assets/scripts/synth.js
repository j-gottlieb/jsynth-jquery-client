const frequencies = require('./frequencies')

const audioContext = new AudioContext()
const oscillator = audioContext.createOscillator()
oscillator.start()
const findPitch = (key) => {
  frequencies.default.map(note => {
    if (note.keyboard === key) {
      return note.pitch
    }
  })
}

class Synth {
  constructor (key) {
    this.key = key
    this.pitch = findPitch(key)
  }

  synthOn () {
    console.log(findPitch(this.key))
    oscillator.frequency.value = this.pitch
    oscillator.connect(audioContext.destination)
  }

  synthOff () {
    oscillator.disconnect()
  }
}

const synthCall = function (event) {
  const newNote = new Synth(event.key)
  if (event.type === 'keydown') {
    newNote.synthOn(event.key)
  } else {
    newNote.synthOff()
  }
}

module.exports = {
  synthCall
}
