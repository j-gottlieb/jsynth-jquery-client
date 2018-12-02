const store = require('../store.js')

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
  $('#display-message').hide()
  $('#sign-up-form').trigger('reset')
  $('#signInModal').modal('toggle')
  $('#display-message').text('')
  $('#display-message').css('color', 'green')
  $('#display-message').text(`Welcome, ${store.user.email}.`).fadeToggle().delay(2000).fadeToggle()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess
}
