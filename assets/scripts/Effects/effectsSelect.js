const store = require('../store.js')

// dynamically populate settings dropdown with all of current user's settings
const populateSelect = function () {
  // default value with user has no settings
  if (store.settings.length === 0) {
    $('#effects-select').html('<option value="" disabled selected>Create some settings!</option>')
  } else {
    $('#effects-select').html('')
    store.settings.map(setting => {
      $('#effects-select').append("<option value='" + setting.name + "'>" + setting.name + '</option>')
    })
  }
}

module.exports = {
  populateSelect
}
