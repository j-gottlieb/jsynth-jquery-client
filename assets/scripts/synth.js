
const audioContext = new AudioContext()
const oscillator = audioContext.createOscillator()
oscillator.start()
let playing = false

const toggleSynth = function (event) {
  console.log('synth clicked')
  if (!playing) {
    oscillator.connect(audioContext.destination)
    playing = true
  } else {
    oscillator.disconnect()
    playing = false
  }
}

module.exports = {
  toggleSynth
}
