const store = require('../store.js')

const populateSelect = function () {
  store.settings.map(setting => {
    $('#effects-select').append(`<option value=${setting.name}>${setting.name}</option>`)
  })
}

module.exports = {
  populateSelect
}
