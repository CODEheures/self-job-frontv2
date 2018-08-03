import axios from 'axios'

let apiDomain = ''
if (process.server) {
  apiDomain = process.env.api.href_server
} else {
  apiDomain = process.env.api.href_client
}

const routes = {
  domain: apiDomain,
  login: apiDomain + '/login',
  logout: apiDomain + '/logout',
  register: apiDomain + '/register',
  resetPassword: apiDomain + '/resetPassword',
  updatePassword: apiDomain + '/updatePassword',
  invite: apiDomain + '/invite',
  existUser: apiDomain + '/existUser',
  isInvitedAndFreeUser: apiDomain + '/isInvitedAndFreeUser',
  user: apiDomain + '/user',
  colleagues: apiDomain + '/colleagues',
  setUserProperty: apiDomain + '/user/set',
  getAdverts: apiDomain + '/getAdverts',
  showAdvert: apiDomain + '/advert/',
  showQuiz: apiDomain + '/quiz/',
  sendQuizAnswers: apiDomain + '/quiz/',
  getMyAdverts: apiDomain + '/myAdverts',
  getAdvertAnswers: apiDomain + '/advert/answers/',
  postPicture: apiDomain + '/picture',
  delPicture: apiDomain + '/picture',
  postAdvert: apiDomain + '/advert',
  publishAdvert: apiDomain + '/advert/publish',
  deleteAdvert: apiDomain + '/advert',
  getQuestionsLibrary: apiDomain + '/question/library',
  removeOfLibrary: apiDomain + '/question/library/remove',
  changeQuestionLibraryType: apiDomain + '/question/library/type'
}

axios.defaults.timeout = 5000

const Api = {
  listRoutes () {
    return routes
  },
  register (name, email, password, passwordConfirmation, language) {
    return axios.request({
      method: 'post',
      url: routes.register,
      data: {'name': name, 'email': email, 'password': password, 'password_confirmation': passwordConfirmation, 'language': language},
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  resetPassword (email, language) {
    return axios.request({
      method: 'post',
      url: routes.resetPassword,
      data: {'email': email, 'language': language},
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  updatePassword (password, passwordConfirmation, accessToken) {
    return axios.request({
      method: 'put',
      url: routes.updatePassword,
      data: {'password': password, 'password_confirmation': passwordConfirmation},
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
  login (email, password, language) {
    return axios.request({
      method: 'post',
      url: routes.login,
      data: {'email': email, 'password': password, 'language': language},
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  logout (accessToken) {
    return axios.request({
      method: 'post',
      url: routes.logout,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
  invite (email, accessToken) {
    return axios.request({
      method: 'post',
      url: routes.invite,
      data: {'email': email},
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
  existUser (email) {
    return axios.request({
      method: 'get',
      url: routes.existUser,
      params: {
        email: email
      },
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  isInvitedAndFreeUser (email) {
    return axios.request({
      method: 'get',
      url: routes.isInvitedAndFreeUser,
      params: {
        email: email
      },
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  getUser (accessToken) {
    return axios.request({
      method: 'get',
      url: routes.user,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
  getColleagues (accessToken) {
    return axios.request({
      method: 'get',
      url: routes.colleagues,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
  postUserProperty (property, value, accessToken) {
    return axios.request({
      method: 'post',
      url: routes.setUserProperty,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: {
        property: property,
        value: value
      }
    })
  },
  postAdvert (advert, questions, language, accessToken) {
    return axios.request({
      method: 'post',
      url: routes.postAdvert,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: {
        'advert': advert,
        'questions': questions,
        'language': language
      }
    })
  },
  publishAdvert (id, publish, accessToken) {
    return axios.request({
      method: 'put',
      url: routes.publishAdvert,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: {
        'id': id,
        'publish': publish
      }
    })
  },
  deleteAdvert (id, accessToken) {
    return axios.request({
      method: 'delete',
      url: routes.deleteAdvert,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: {
        'id': id
      }
    })
  },
  getAdverts (searchs, location, mileage, fromResult, language) {
    return axios.request({
      method: 'post',
      url: routes.getAdverts,
      headers: {
        'Accept': 'application/json'
      },
      data: {
        searchs: searchs,
        location: {
          lat: location.latitude,
          lon: location.longitude
        },
        mileage: mileage,
        from: fromResult,
        language: language
      }
    })
  },
  showAdvert (id) {
    return axios.request({
      method: 'get',
      url: routes.showAdvert + id,
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  showQuiz (id) {
    return axios.request({
      method: 'get',
      url: routes.showQuiz + id,
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  sendQuizAnswers (id, email, phone, answers) {
    return axios.request({
      method: 'post',
      url: routes.sendQuizAnswers,
      headers: {
        'Accept': 'application/json'
      },
      data: {
        'id': id,
        'email': email,
        'phone': phone,
        'answers': answers
      }
    })
  },
  getMyAdverts (accessToken) {
    return axios.request({
      method: 'get',
      url: routes.getMyAdverts,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
  getAdvertAnswers (id, accessToken) {
    return axios.request({
      method: 'get',
      url: routes.getAdvertAnswers + id,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
  delPicture (url, accessToken) {
    return axios.request({
      method: 'delete',
      url: routes.delPicture,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: {
        url: url
      }
    })
  },
  getQuestionsLibrary (language, accessToken) {
    return axios.request({
      method: 'get',
      url: routes.getQuestionsLibrary,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        language: language
      }
    })
  },
  removeOfLibrary (hash, accessToken) {
    return axios.request({
      method: 'put',
      url: routes.removeOfLibrary,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: {
        hash: hash
      }
    })
  },
  changeQuestionLibraryType (hash, type, accessToken) {
    return axios.request({
      method: 'put',
      url: routes.changeQuestionLibraryType,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: {
        hash: hash,
        type: type
      }
    })
  }
}

export default Api
