const config = require('../config.js')
const store = require('../store.js')

const saveSetting = function (settings) {
  return $.ajax({
    url: config.apiUrl + '/synth_settings',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      'synth_setting': {
        'name': settings.name,
        'chorusrate': settings.chorusrate,
        'chorustoggle': settings.chorustoggle,
        'filtercutoff': settings.filtercutoff,
        'filtertoggle': settings.filtertoggle
      }
    }
  })
}

const getSettings = function () {
  return $.ajax({
    url: config.apiUrl + '/synth_settings',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const updateSetting = function (settings) {
  return $.ajax({
    url: config.apiUrl + '/synth_settings/' + settings.id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      'synth_setting': settings
    }
  })
}

const deleteSetting = function (id) {
  return $.ajax({
    url: config.apiUrl + '/synth_settings/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  saveSetting,
  getSettings,
  updateSetting,
  deleteSetting
}
