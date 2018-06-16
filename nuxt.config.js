
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
    {src: '~/plugins/placesAutocomplete.js', ssr: false}
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Router
   */
  router: {
    middleware: 'i18n'
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      '~/plugins/api.js',
      '~/plugins/loaderJs.js',
      '~/plugins/placesAutocomplete.js',
      'vue-i18n',
      'axios',
      'lodash'
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
      href: 'http://api.selfjob.test/api'
    },
    fallbackLocale: 'fr'
  }
}
