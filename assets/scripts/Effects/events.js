const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
const effectsSelect = require('../Effects/effectsSelect')

const onChorusChange = function (event) {
  const chorusRate = event.target.value
  store.current_setting.chorusrate = chorusRate
}
const onFilterChange = function (event) {
  const filterCutoff = event.target.value
  store.current_setting.filtercutoff = filterCutoff
}

const onSaveSetting = function (event) {
  const currentName = getFormFields(event.target).name
  store.current_setting.name = currentName
  event.preventDefault()
  const settings = store.current_setting
  api.saveSetting(settings)
    .then(ui.saveSettingSuccess)
    .then(() => onGetSettings())
    .then(() => saveSettingPopulateSelect(currentName))
}

const saveSettingPopulateSelect = function (name) {
  $('#effects-select').find(`option[value=${name}]`).attr('selected', true)
}

const onUpdateSetting = function (event) {
  event.preventDefault()
  if (getFormFields(event.target).name !== '') {
    store.current_setting.name = getFormFields(event.target).name
  }
  const settings = store.current_setting
  if (store.current_setting.id) {
    api.updateSetting(settings)
      .then(ui.updateSettingSuccess)
      .then(() => onGetSettings())
      .catch()
  } else {
    $('#settings-message').hide()
    $('#settings-message').text('Please select a setting to update').fadeToggle().delay(2000).fadeToggle()
  }
}

const onGetSettings = function (event) {
  return api.getSettings()
    .then(ui.getSettingsSuccess)
    .then(effectsSelect.populateSelect)
    .catch(ui.getSettingsFailure)
}

const onSelectSetting = function (event) {
  const settings = store.settings
  for (let i = 0; i < settings.length; i++) {
    if (settings[i].name === this.value) {
      store.current_setting = settings[i]
      $('#filter-cutoff').val(settings[i].filtercutoff)
      $('#chorus-range').val(settings[i].chorusrate)
      $('#update-settings [name=name]').val(settings[i].name)
      return
    }
  }
}

const onDeleteSetting = function (event) {
  const id = store.current_setting.id
  api.deleteSetting(id)
    .then(ui.deleteSettingSuccess)
    .then(() => onGetSettings())
    .catch()
}

module.exports = {
  onChorusChange,
  onFilterChange,
  onSaveSetting,
  onGetSettings,
  onSelectSetting,
  onUpdateSetting,
  onDeleteSetting
}
