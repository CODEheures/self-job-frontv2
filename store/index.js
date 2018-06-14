export const state = () => ({
  sidebar: false,
  locales: ['en', 'fr'],
  locale: 'fr'
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
