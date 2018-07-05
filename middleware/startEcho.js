/*
  This Middleware start Echo
 */
import echo from '~/vendors/echo.js'
import Vue from 'vue'
export default function ({ store, app }) {
  console.log('middleware startecho')
  if (process.client && !(Vue.prototype.$echo) && store.state.user.auth === true && store.state.user.token !== null) {
    console.log('startEchooooooooo')
    Vue.prototype.$echo = echo.getEcho(store.state.user.token)
  }
}
