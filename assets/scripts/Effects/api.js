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
      'synth_setting': settings
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

module.exports = {
  saveSetting,
  getSettings
}
