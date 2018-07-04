/*
  This Middleware start Echo
 */
import echo from '~/vendors/echo.js'
import Vue from 'vue'
export default function ({ store, app }) {
  if (store.state.user.auth === true && store.state.user.token !== null) {
    Vue.prototype.$echo = echo.getEcho(store.state.user.token)
  }
}
