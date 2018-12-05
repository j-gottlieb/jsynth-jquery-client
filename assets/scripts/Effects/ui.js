const store = require('../store.js')

const saveSettingSuccess = function (response) {
  const newSetting = response.synth_settings[response.synth_settings.length - 1]
  store.settings = response.synth_settings
  store.current_setting = newSetting
  $('#update-settings [name=name]').val(newSetting.name)
  $('#save-settings').trigger('reset')
  $('#settings-message').hide()
  $('#settings-message').css('color', 'green')
  $('#settings-message').text('Setting Saved').fadeToggle().delay(2000).fadeToggle()
}

const saveSettingFailure = function () {
  $('#update-settings').trigger('reset')
  $('#settings-message').hide()
  $('#settings-message').text('')
  $('#settings-message').css('color', 'red')
  $('#settings-message').text('Name taken. Please choose another').fadeToggle().delay(2000).fadeToggle()
}

const getSettingsSuccess = function (response) {
  store.settings = null
  store.settings = response.synth_settings
  // if user has no settings, use this default setting
  if (store.settings.length === 0) {
    store.current_setting = {
      id: null,
      name: '',
      oscillator_type: 'sine',
      chorusrate: 4,
      chorustoggle: true,
      filtercutoff: 1000,
      filtertoggle: true
    }
  } else {
    store.current_setting = response.synth_settings[0]
  }
  $('#update-settings [name=name]').val(store.current_setting.name)
  $('#filter-cutoff').val(store.current_setting.filtercutoff)
  $('#chorus-range').val(store.current_setting.chorusrate)
  $('#oscillator-type').find(`option[value=${store.current_setting.oscillator_type}]`).attr('selected', true)
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

const deleteSettingFailure = function (response) {
  $('#update-settings').trigger('reset')
  $('#settings-message').hide()
  $('#settings-message').text('')
  $('#settings-message').css('color', 'black')
  $('#settings-message').text('You have no settings to delete').fadeToggle().delay(2000).fadeToggle()
}

module.exports = {
  saveSettingSuccess,
  getSettingsSuccess,
  updateSettingSuccess,
  deleteSettingSuccess,
  deleteSettingFailure,
  saveSettingFailure
}
