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
  store.current_setting.name = getFormFields(event.target).name
  console.log(store.current_setting)
  event.preventDefault()
  const settings = store.current_setting
  api.saveSetting(settings)
    .then(ui.saveSettingSuccess)
    .then(() => onGetSettings())
}

const onGetSettings = function (event) {
  api.getSettings()
    .then(ui.getSettingsSuccess)
    .then(effectsSelect.populateSelect)
    .catch(ui.getSettingsFailure)
}

module.exports = {
  onChorusChange,
  onFilterChange,
  onSaveSetting,
  onGetSettings
}
