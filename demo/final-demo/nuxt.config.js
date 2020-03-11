import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['codemirror/lib/codemirror.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/i18n.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxt/typescript-build', 'nuxt-typed-vuex'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  /**
   *  Axios configuration
   */
  axios: [],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: false,
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/typed-vuex/]
  },
  typescript: {
    typeCheck: {
      eslint: true
    }
  },
  router: {
    middleware: 'i18n'
  }
}
