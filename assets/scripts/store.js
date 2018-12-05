'use strict'

const store = {
  current_setting: {
    id: null,
    name: '',
    oscillator_type: 'sine',
    chorusrate: 4,
    chorustoggle: true,
    filtercutoff: 1000,
    filtertoggle: true
  },
  octave: 0
}

module.exports = store
