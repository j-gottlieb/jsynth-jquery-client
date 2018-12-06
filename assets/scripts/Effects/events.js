const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
const effectsSelect = require('../Effects/effectsSelect')

// change current setting when user moves slider input
const onChorusChange = function (event) {
  const chorusRate = event.target.value
  store.current_setting.chorusrate = chorusRate
}
// change current setting when user moves slider input
const onFilterChange = function (event) {
  const filterCutoff = event.target.value
  store.current_setting.filtercutoff = filterCutoff
}
// change current setting when user selects new option
const onSelectOscillatorType = function (event) {
  const type = this.value
  store.current_setting.oscillator_type = type
}

// Collect arguments to send via POST ajax request to api
const onSaveSetting = function (event) {
  const currentName = getFormFields(event.target).name
  // replace the current setting's name with the user's input
  store.current_setting.name = currentName
  event.preventDefault()
  const settings = store.current_setting
  api.saveSetting(settings)
    // retrieve all settings
    .then(api.getSettings)
    // update ui
    .then(ui.saveSettingSuccess)
    // populate settings dropdown with updated list
    .then(effectsSelect.populateSelect)
    // select the newly created setting
    .then(() => saveSettingPopulateSelect(currentName))
    .catch(ui.saveSettingFailure)
}

// dynamically select the newly created effect after user saves new effect
const saveSettingPopulateSelect = function (name) {
  $('#effects-select').find('option').each(function () {
    if (this.value !== name) {
      $(this).removeAttr('selected')
    } else if (this.value === name) {
      $(this).attr('selected', 'selected')
    }
  })
}
// Collect arguments to send via PATCH ajax request to api
const onUpdateSetting = function (event) {
  event.preventDefault()
  const name = getFormFields(event.target).name
  // If user has entered nothing in the form, use the previous name
  if (getFormFields(event.target).name !== '') {
    store.current_setting.name = name
  }
  const settings = store.current_setting
  if (store.current_setting.id) {
    api.updateSetting(settings)
      .then(ui.updateSettingSuccess)
      .then(api.getSettings)
      .then(effectsSelect.populateSelect)
      .then(() => saveSettingPopulateSelect(name))
      .catch()
  } else {
    // if no setting is selected, display this message
    $('#settings-message').hide()
    $('#settings-message').text('Please select a setting to update').fadeToggle().delay(2000).fadeToggle()
  }
}

// GET ajax request to api
const onGetSettings = function (event) {
  return api.getSettings()
    .then(ui.getSettingsSuccess)
    .then(effectsSelect.populateSelect)
    .catch(ui.getSettingsFailure)
}

// User selects a setting
const onSelectSetting = function (event) {
  const settings = store.settings
  // Loop through all settings to find the selected one
  const setting = settings.find(element => element.name === this.value)
  store.current_setting = setting
  // change sliders based on selected setting
  $('#filter-cutoff').val(setting.filtercutoff)
  $('#chorus-range').val(setting.chorusrate)
  // change oscillator_type dropdown to match selected setting
  $('#oscillator-type').find('option').each(function () {
    $(this).removeAttr('selected')
  })
  $('#oscillator-type').find(`option[value=${store.current_setting.oscillator_type}]`).attr('selected', 'selected')
  // populate update field with selected setting's name
  $('#update-settings [name=name]').val(setting.name)
}

// DELETE ajax request to api
const onDeleteSetting = function (event) {
  const id = store.current_setting.id
  api.deleteSetting(id)
    .then(api.getSettings)
    .then(ui.deleteSettingSuccess)
    .then(effectsSelect.populateSelect)
    .catch(ui.deleteSettingFailure)
}

module.exports = {
  onChorusChange,
  onFilterChange,
  onSaveSetting,
  onGetSettings,
  onSelectSetting,
  onUpdateSetting,
  onDeleteSetting,
  onSelectOscillatorType
}
