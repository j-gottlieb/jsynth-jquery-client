const store = require('../store.js')

const saveSettingSuccess = function (response) {
  $('#settings-message').text('Setting Saved')
}

const getSettingsSuccess = function (response) {
  store.settings = null
  store.settings = response.synth_settings
}

module.exports = {
  saveSettingSuccess,
  getSettingsSuccess
}
