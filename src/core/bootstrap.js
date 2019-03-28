import Vue from 'vue'
import store from '@/store'
import config from '@/config/default.config'
import '@/core/router.guards'

export default {
  init () {
    // set last user data lang
    const cacheLang = Vue.storage.get('lang', config.defaultLang)
    store.dispatch('SetLang', cacheLang)
  }
}
