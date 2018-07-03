import routeI18n from '~/vendors/routeI18n.js'
const Filters = {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
  uppercase: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
  },
  'routeI18nReformat': function (route) {
    return routeI18n.reformat(route)
  }
}

export default Filters
