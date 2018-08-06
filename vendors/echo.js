/**
 * This vendor manage echo in nuxt app
 */
import Echo from 'laravel-echo'

export default {
  /**
   * Initialized once $echo Echo Object in $root.$options Vue instance
   * @param VueRootInstance
   * @returns {Echo}
   */
  getEcho (VueRootInstance) {
    if (!VueRootInstance.$options.$echo && VueRootInstance.$store.state.user.token !== null) {
      VueRootInstance.$options.$echo = new Echo({
        broadcaster: 'socket.io',
        host: process.env.api.socketIo,
        auth: {
          headers: {
            Authorization: 'Bearer ' + VueRootInstance.$store.state.user.token
          }
        }
      })
      return true
    } else if (VueRootInstance.$options.$echo instanceof Echo) {
      return true
    } else {
      return false
    }
  },
  /**
   * Init a subscribe to new advert event and lauch a callback when a new advert is emmited
   * @param VueRootInstance
   * @param companyId
   * @param callBack
   */
  subscribeToNewAdvert (VueRootInstance, companyId, callBack) {
    if (this.getEcho(VueRootInstance)) {
      VueRootInstance.$options.$echo.private('update-adverts-for-company.' + companyId)
        .listen('UpdateAdvertEvent', () => {
          callBack()
        })
    }
  },
  /**
   * unsubscribe of new advert echo
   * @param VueRootInstance
   * @param companyId
   */
  unsubscribeToNewAdvert (VueRootInstance, companyId) {
    if (this.getEcho(VueRootInstance)) {
      VueRootInstance.$options.$echo.leave('update-adverts-for-company.' + companyId)
    }
  },
  /**
   * Init a subscribe to new answer event on each advert lauch a callback when a new answer is emmited on an advert
   * @param VueRootInstance
   * @param adverts
   * @param callBack(id of advert to update, number of the new response_count)
   */
  subscribeToAnswers (VueRootInstance, adverts, callBack) {
    if (this.getEcho(VueRootInstance)) {
      adverts.forEach(function (advert) {
        VueRootInstance.$options.$echo.private('new-answer-on.' + advert.id)
          .listen('NewAnswerEvent', function (event) {
            callBack(advert.id, event.numberOfAnswers)
          })
      })
    }
  },
  /**
   * unsubscribe of answers echo
   * @param VueRootInstance
   * @param adverts
   */
  unsubscribeToAnswers (VueRootInstance, adverts) {
    if (this.getEcho(VueRootInstance)) {
      adverts.forEach(function (advert) {
        VueRootInstance.$root.$options.$echo.leave('new-answer-on.' + advert.id)
      })
    }
  }
}
