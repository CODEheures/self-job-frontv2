export default function ({ req, store }) {
  store.commit('UNSET_USER_TOKEN')

  let cookieName = 'sj_t='
  let decodedCookie
  if (process.server) {
    decodedCookie = decodeURIComponent(req.headers.cookie)
  } else {
    decodedCookie = decodeURIComponent(document.cookie)
  }

  let items = decodedCookie.split(';')
  items.forEach((item, index) => {
    let trimItem = item.trimLeft()
    if (trimItem.indexOf(cookieName) === 0) {
      store.commit('SET_USER_TOKEN', trimItem.substring(cookieName.length, trimItem.length))
    }
  })

  return null
}
