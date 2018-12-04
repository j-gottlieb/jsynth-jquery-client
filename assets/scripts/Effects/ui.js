const store = require('../store.js')

const saveSettingSuccess = function (response) {
  $('#update-settings [name=name]').val(response.synth_setting.name)
  $('#save-settings').trigger('reset')
  $('#settings-message').hide()
  $('#settings-message').css('color', 'green')
  $('#settings-message').text('Setting Saved').fadeToggle().delay(2000).fadeToggle()
}

const getSettingsSuccess = function (response) {
  store.settings = null
  store.settings = response.synth_settings
}

const updateSettingSuccess = function (response) {
  $('#settings-message').hide()
  $('#settings-message').css('color', 'green')
  $('#settings-message').text('Setting has been updated').fadeToggle().delay(2000).fadeToggle()
}

const deleteSettingSuccess = function (response) {
  $('#update-settings').trigger('reset')
  $('#settings-message').hide()
  $('#settings-message').text('')
  $('#settings-message').css('color', 'red')
  $('#settings-message').text('Setting has been deleted').fadeToggle().delay(2000).fadeToggle()
}

module.exports = {
  saveSettingSuccess,
  getSettingsSuccess,
  updateSettingSuccess,
  deleteSettingSuccess
}
