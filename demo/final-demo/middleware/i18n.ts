import { Middleware } from '@nuxt/types'
import VueI18n from 'vue-i18n'

type LangType = typeof import('~/lang/zh-CN')

const i18nMiddleware: Middleware = ({
  isHMR,
  app: { $accessor, i18n },
  params,
  redirect
}) => {
  if (isHMR) {
    return
  }

  const vI18n = i18n as VueI18n
  const defaultLocale = vI18n.fallbackLocale
  const lang = params.lang

  if (!lang || !$accessor.locales.includes(lang)) {
    setLocale(defaultLocale)
    return redirect(`/${defaultLocale}`)
  }

  // Set locale
  setLocale(lang)

  function setLocale(locale: string) {
    $accessor.setLang(locale)
    vI18n.locale = locale
  }
}

export default i18nMiddleware
