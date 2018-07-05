/**
 * This vendor manage echo in nuxt app
 */
import Echo from 'laravel-echo'

export default {
  /**
   * Return initialized Echo Object
   * @param token
   * @returns {Echo}
   */
  getEcho (token) {
    if (process.client) {
      window.io = require('socket.io-client')
    } else {
      global['io'] = require('socket.io-client')
    }

    return new Echo({
      broadcaster: 'socket.io',
      host: process.env.api.socketIo,
      auth: {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    })
  },
  /**
   * Init a subscribe to new advert event and lauch a callback when a new advert is emmited
   * @param vueEchoObject
   * @param companyId
   * @param callBack
   */
  subscribeToNewAdvert (vueEchoObject, companyId, callBack) {
    if (vueEchoObject instanceof Echo) {
      vueEchoObject.private('update-adverts-for-company.' + companyId)
        .listen('UpdateAdvertEvent', () => {
          callBack()
        })
    }
  },
  /**
   * unsubscribe of new advert echo
   * @param vueEchoObject
   * @param companyId
   */
  unsubscribeToNewAdvert (vueEchoObject, companyId) {
    if (vueEchoObject instanceof Echo) {
      vueEchoObject.leave('update-adverts-for-company.' + companyId)
    }
  },
  /**
   * Init a subscribe to new answer event on each advert lauch a callback when a new answer is emmited on an advert
   * @param vueEchoObject
   * @param adverts
   * @param callBack(id of advert to update, number of the new response_count)
   */
  subscribeToAnswers (vueEchoObject, adverts, callBack) {
    if (vueEchoObject instanceof Echo) {
      adverts.forEach(function (advert) {
        vueEchoObject.private('new-answer-on.' + advert.id)
          .listen('NewAnswerEvent', function (event) {
            callBack(advert.id, event.numberOfAnswers)
          })
      })
    }
  },
  unsubscribeToAnswers (vueEchoObject, adverts) {
    if (vueEchoObject instanceof Echo) {
      adverts.forEach(function (advert) {
        // leave before to ensure not double subscription
        vueEchoObject.leave('new-answer-on.' + advert.id)
      })
    }
  }
}
