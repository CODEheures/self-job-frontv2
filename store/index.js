export const state = () => ({
  sidebar: false,
  locales: ['en', 'fr'],
  locale: 'fr',
  errors: [],
  user: {
    auth: false,
    token: null,
    info: null
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
    state.user.info = null
  },
  ADD_ERROR (state, id) {
    state.errors.push(id)
  },
  REMOVE_ERRORS (state) {
    state.errors = []
  },
  SET_USER (state, user) {
    state.user.info = user
  },
  UNSET_USER (state) {
    state.user.auth = false
    state.user.token = null
    state.user.info = null
  }
}
