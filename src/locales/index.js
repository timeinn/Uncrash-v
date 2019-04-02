import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from '@/config/default.config'
import enUS from './lang/en-US'

Vue.use(VueI18n)

const messages = {
  'en-US': {
    ...enUS
  }
}

const i18n = new VueI18n({
  locale: config.defaultLang,
  fallbackLocale: config.defaultLang,
  messages
})

export default i18n

const loadedLanguages = [config.defaultLang]

/*
if (defaultLanguage !== Vue.storage.get('lang')) {
  loadLanguageAsync(localStorage.lang)
}
*/

function setI18nLanguage (lang) {
  i18n.locale = lang
  // axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  console.log('lang', lang)
  return lang
}

export function loadLanguageAsync (lang = config.defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    Vue.storage.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}
