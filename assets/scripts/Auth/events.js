const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')

const onSignUp = function (event) {
  event.preventDefault()
  const credentials = getFormFields(event.target)
  api.signUp(credentials)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const credentials = getFormFields(event.target)
  api.signIn(credentials)
    .then(ui.signInSuccess)
    .then(ui.signInFailure)
}

module.exports = {
  onSignUp,
  onSignIn
}
