export const state = () => ({
  sidebar: false,
  locales: ['en', 'fr'],
  locale: 'fr',
  user: {
    auth: false,
    token: null
  }
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_USER_TOKEN (state, token) {
    state.user.auth = true
    state.user.token = token
  },
  UNSET_USER_TOKEN (state) {
    state.user.auth = false
    state.user.token = null
  }
}
