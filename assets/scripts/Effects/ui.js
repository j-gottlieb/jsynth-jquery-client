const store = require('../store.js')

const saveSettingSuccess = function (response) {
  $('#settings-message').text('Setting Saved').fadeToggle().delay(2000).fadeToggle()
}

const getSettingsSuccess = function (response) {
  store.settings = null
  store.settings = response.synth_settings
}

const updateSettingSuccess = function (response) {
  $('#settings-message').text('Setting has been updated').fadeToggle().delay(2000).fadeToggle()
}

module.exports = {
  saveSettingSuccess,
  getSettingsSuccess,
  updateSettingSuccess
}
