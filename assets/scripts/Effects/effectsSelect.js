const store = require('../store.js')

const populateSelect = function () {
  if (store.settings.length === 0) {
    $('#effects-select').html('<option value="" disabled selected>Create some settings!</option>')
  } else {
    $('#effects-select').html('')
    store.settings.map(setting => {
      $('#effects-select').append(`<option value=${setting.name}>${setting.name}</option>`)
    })
  }
}

module.exports = {
  populateSelect
}
