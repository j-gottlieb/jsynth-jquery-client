'use strict'
const authEvents = require('./Auth/events')
const effectsEvents = require('./Effects/events')

$(() => {
  // Auth events
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  $('#sign-out-button').on('click', authEvents.onSignOut)
  // Settings events
  $('#chorus-range').on('change', effectsEvents.onChorusChange)
  $('#filter-cutoff').on('change', effectsEvents.onFilterChange)
  $('#save-settings').on('submit', effectsEvents.onSaveSetting)
  $('#update-settings').on('submit', effectsEvents.onUpdateSetting)
  $('#get-settings').on('click', effectsEvents.onGetSettings)
  $('#effects-select').on('change', effectsEvents.onSelectSetting)
  $('#delete').on('click', effectsEvents.onDeleteSetting)
  $('#oscillator-type').on('change', effectsEvents.onSelectOscillatorType)
})
