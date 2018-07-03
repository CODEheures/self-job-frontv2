/*
 This file provide function to reformat route object if params lang is equal to fallbacklocale
 route: Object ({name: '....', params {....}, ...)
 */
export default {
  reformat (route) {
    if (
      !!route.name &&
      route.name.indexOf('lang') === 0 &&
      !!route.params &&
      !!route.params.lang &&
      route.params.lang === process.env.fallbackLocale
    ) {
      if (route.name === 'lang') {
        route.name = 'index'
      } else {
        route.name = route.name.replace('lang-', '')
      }
      delete route.params.lang
    }
    return route
  }
}
