'use strict'
const synth = require('./synth.js')
const authEvents = require('./Auth/events')
const effectsEvents = require('./Effects/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // synth keyboard listeners
  $('body').keydown(synth.synthCall)
  $('body').keyup(synth.synthCall)
  // Auth events
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  $('#sign-out-button').on('click', authEvents.onSignOut)
  $('#chorus-range').on('change', effectsEvents.onChorusChange)
  $('#save-settings').on('click', effectsEvents.onSaveSetting)
  $('#get-settings').on('click', effectsEvents.onGetSettings)
})
