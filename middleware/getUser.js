/*
  This Middleware set User info
 */
import Api from '~/plugins/api.js'
export default async function ({ store, route, redirect, app }) {
  if (store.state.user.auth === true && store.state.user.token !== null && Object.keys(store.state.user.info).length === 0) {
    try {
      let response = await Api.getUser(store.state.user.token)
      store.commit('SET_USER', response.data)
    } catch (e) {
      store.commit('ADD_ERROR', 0)
    }
  }
  return null
}
