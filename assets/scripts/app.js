'use strict'
const synth = require('./synth.js')
const authEvents = require('./Auth/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('body').keydown(synth.synthCall)
  $('body').keyup(synth.synthCall)
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
})
