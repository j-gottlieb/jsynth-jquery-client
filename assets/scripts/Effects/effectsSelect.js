const store = require('../store.js')
const settingsTemplate = require('../templates/settings.handlebars')

// dynamically populate settings dropdown with all of current user's settings
const populateSelect = function () {
  // default value with user has no settings
  const showSettingsHtml = settingsTemplate({ settings: store.settings })
  if (store.settings.length === 0) {
    $('#effects-select').html('<option value="" disabled selected>Create some settings!</option>')
  } else {
    $('#effects-select').html(showSettingsHtml)
  }
}

module.exports = {
  populateSelect
}
