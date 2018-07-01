/*
  This Middleware set User token by reading cookies
  If cookies sj_t exist user is auth and token is save
 */
export default function ({ req, store }) {
  // Get the decodedCookie
  let decodedCookie
  if (process.server) {
    decodedCookie = decodeURIComponent(req.headers.cookie)
  } else {
    decodedCookie = decodeURIComponent(document.cookie)
  }

  // Search the token cookie
  let items = decodedCookie.split(';')
  let existToken = false
  items.forEach((item, index) => {
    let trimItem = item.trimLeft()
    if (trimItem.indexOf(process.env.tokenCookieName) === 0) {
      store.commit('SET_USER_TOKEN', trimItem.substring(process.env.tokenCookieName.length, trimItem.length))
      existToken = true
    }
  })

  // Unset the old bad token if cookie doesn't exist
  if (!existToken) { store.commit('UNSET_USER_TOKEN') }

  return null
}
