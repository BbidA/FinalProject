import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Plugin } from '@nuxt/types'

// Data
import zh from '~/lang/zh-CN'
import en from '~/lang/en'

Vue.use(VueI18n)
const i18nPlugin: Plugin = ({ app }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  const fallbackLocale = 'zh-CN'

  app.i18n = new VueI18n({
    locale: fallbackLocale,
    fallbackLocale,
    messages: { 'zh-CN': zh, en },
    silentFallbackWarn: false
  })
}

export default i18nPlugin
