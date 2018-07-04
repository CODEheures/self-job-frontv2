
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'selfjob',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Le recrutement humain sans CV' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { src: 'https://use.fontawesome.com/releases/v5.0.13/js/all.js', integrity: 'sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe', crossorigin: 'anonymous', defer: true, body: true }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/api.js',
    '~/plugins/i18n.js',
    {src: '~/plugins/placesAutocomplete.js', ssr: false},
    {src: '~/plugins/startEcho.js', ssr: false}
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/generics/loading.vue',
  /*
  ** Router
   */
  router: {
    middleware: ['getToken', 'getUser', 'i18n'],
    parseQuery: function (query) {
      if (query.length > 0) {
        try {
          if (process.server) {
            let atob = require('atob')
            return JSON.parse(atob(decodeURI(query)))
          } else {
            return JSON.parse(atob(decodeURI(query)))
          }
        } catch (e) {
          return {}
        }
      }
      return {}
    },
    stringifyQuery: function (query) {
      if (Object.keys(query).length > 0) {
        if (process.server) {
          let btoa = require('btoa')
          return '?' + encodeURI(btoa(JSON.stringify(query)))
        } else {
          return '?' + encodeURI(btoa(JSON.stringify(query)))
        }
      }
      return ''
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/vendors/countriesCode',
      '~/vendors/filters',
      '~/vendors/loaderJs.js',
      '~/vendors/routeI18n.js',
      '~/vendors/echo.js',
      '~/plugins/vuetify.js',
      '~/plugins/api.js',
      '~/plugins/placesAutocomplete.js',
      'vue-i18n',
      'axios',
      'lodash',
      'moment',
      'libphonenumber-js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** ENV
   */
  env: {
    api: {
      href: process.env.isDev === 'true' ? 'http://api.selfjob.test/api' : 'https://api-selfjob.codeheures.fr/api',
      socketIo: process.env.isDev === 'true' ? 'http://api.selfjob.test:6001' : 'https://api-selfjob.codeheures.fr:6001'
    },
    fallbackLocale: 'fr',
    googleMapApiKey: process.env.isDev === 'true' ? '' : 'AIzaSyB6YONdutLGDWC70gK9f3VZp_3_eIE7Alw',
    mapBoxApiKey: 'pk.eyJ1IjoiY29kZWhldXJlcyIsImEiOiJjamlybGFoMTQwdzcyM3ZtczlldXFzb294In0.63pY2nz6jItpe5wyhQ2dUg',
    tokenCookieName: 'sj_t='
  }
}
