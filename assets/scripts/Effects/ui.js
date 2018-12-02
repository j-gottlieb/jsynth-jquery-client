const store = require('../store.js')

const saveSettingSuccess = function (response) {
  $('#settings-message').text('Setting Saved')
}

const getSettingsSuccess = function (response) {
  store.settings = response.synth_settings
  console.log(store.settings)
}

module.exports = {
  saveSettingSuccess,
  getSettingsSuccess
}
