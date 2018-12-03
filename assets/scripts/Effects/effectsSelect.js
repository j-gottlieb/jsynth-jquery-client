const store = require('../store.js')

const populateSelect = function () {
  console.log(store.user)
  console.log(store.current_setting)
  console.log(store.settings)
  $('#effects-select').append(`<option value='hello'>hello</option>`)
  // store.synth_settings.map(setting => {
  //   $('#effects-select').append(`<option value=${setting.name}>${setting.name}</option>`)
  // })
}

module.exports = {
  populateSelect
}
