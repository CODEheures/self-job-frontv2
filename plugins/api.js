import axios from 'axios'

const apiDomain = process.env.api.href

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

axios.defaults.timeout = 3000

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
  updatePassword (password, passwordConfirmation) {
    return axios.request({
      method: 'put',
      url: routes.updatePassword,
      data: {'password': password, 'password_confirmation': passwordConfirmation},
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
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
  logout () {
    return axios.request({
      method: 'post',
      url: routes.logout,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  invite (email) {
    return axios.request({
      method: 'post',
      url: routes.invite,
      data: {'email': email},
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
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
  getUser () {
    return axios.request({
      method: 'get',
      url: routes.user,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  getColleagues () {
    return axios.request({
      method: 'get',
      url: routes.colleagues,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  postUserProperty (property, value) {
    return axios.request({
      method: 'post',
      url: routes.setUserProperty,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        property: property,
        value: value
      }
    })
  },
  postAdvert (advert, questions, language) {
    return axios.request({
      method: 'post',
      url: routes.postAdvert,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        'advert': advert,
        'questions': questions,
        'language': language
      }
    })
  },
  publishAdvert (id, publish) {
    return axios.request({
      method: 'put',
      url: routes.publishAdvert,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        'id': id,
        'publish': publish
      }
    })
  },
  deleteAdvert (id) {
    return axios.request({
      method: 'delete',
      url: routes.deleteAdvert,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
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
  getMyAdverts () {
    return axios.request({
      method: 'get',
      url: routes.getMyAdverts,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  getAdvertAnswers (id) {
    return axios.request({
      method: 'get',
      url: routes.getAdvertAnswers + id,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  delPicture (url) {
    return axios.request({
      method: 'delete',
      url: routes.delPicture,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        url: url
      }
    })
  },
  getQuestionsLibrary (language) {
    return axios.request({
      method: 'get',
      url: routes.getQuestionsLibrary,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      params: {
        language: language
      }
    })
  },
  removeOfLibrary (hash) {
    return axios.request({
      method: 'put',
      url: routes.removeOfLibrary,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        hash: hash
      }
    })
  },
  changeQuestionLibraryType (hash, type) {
    return axios.request({
      method: 'put',
      url: routes.changeQuestionLibraryType,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        hash: hash,
        type: type
      }
    })
  }
}

export default Api
