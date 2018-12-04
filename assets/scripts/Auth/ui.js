const store = require('../store.js')
const synth = require('../synth.js')
// const effectsSelect = require('../Effects/effectsSelect')

const signUpSuccess = function () {
  $('#display-message').hide()
  $('#sign-up-form').trigger('reset')
  $('#signUpModal').modal('toggle')
  $('#display-message').text('')
  $('#display-message').css('color', 'green')
  $('#display-message').text('You have signed up!').fadeToggle().delay(2000).fadeToggle()
}

const signUpFailure = function () {
  $('#display-message').hide()
  $('#sign-in-form').trigger('reset')
  $('#signInModal').modal('toggle')
  $('#display-message').text('')
  $('#display-message').css('color', 'red')
  $('#display-message').text('Sign up failed.').fadeToggle().delay(2000).fadeToggle()
}

const signInSuccess = function (response) {
  store.user = response.user
  store.audioContext = new AudioContext()
  $('#display-message').hide()
  $('#sign-in-form').trigger('reset')
  $('#signInModal').modal('toggle')
  $('#display-message').text('')
  $('#display-message').css('color', 'green')
  $('#display-message').text(`Welcome, ${store.user.email}.`).fadeToggle().delay(2000).fadeToggle()
  $('.signed-in').show()
  $('.signed-out').hide()
  $('.synth-container').keydown(synth.synthCall)
  $('.synth-container').keyup(synth.synthCall)
  $('.synth-container').focusout(synth.synthCall)
}

const signInFailure = function () {
  $('#display-message').hide()
  $('#sign-in-form').trigger('reset')
  $('#signInModal').modal('toggle')
  $('#display-message').text('')
  $('#display-message').css('color', 'red')
  $('#display-message').text('Please try again.').fadeToggle().delay(2000).fadeToggle()
}

const changePasswordSuccess = function () {
  $('#display-message').hide()
  $('#change-password-form').trigger('reset')
  $('#changePasswordModal').modal('toggle')
  $('#display-message').text('')
  $('#display-message').css('color', 'green')
  $('#display-message').text('You have changed your password.').fadeToggle().delay(2000).fadeToggle()
}

const changePasswordFailure = function () {
  $('#display-message').hide()
  $('#change-password-form').trigger('reset')
  $('#changePasswordModal').modal('toggle')
  $('#display-message').text('')
  $('#display-message').css('color', 'red')
  $('#display-message').text('Please try again.').fadeToggle().delay(2000).fadeToggle()
}

const signOutSuccess = function () {
  store.user = null
  $('#display-message, #settings-message').hide()
  $('form').trigger('reset')
  $('#display-message, #settings-message').text('')
  $('#display-message').css('color', 'green')
  $('#display-message').text('You have signed out.').fadeToggle().delay(2000).fadeToggle()
  $('.signed-in').hide()
  $('.signed-out').show()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess
}
