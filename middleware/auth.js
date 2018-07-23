/*
  Middleware redirect if no auth
 */
export default function ({ redirect, store, route }) {
  if (!store.state.user.auth) {
    return redirect(302, {path: '/login', query: {'unauthorized': true, 'redirectAfterLoginSuccess': {name: route.name, params: route.params, query: route.query}}}, {})
  }
}
