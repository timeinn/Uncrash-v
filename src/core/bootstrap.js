import Vue from 'vue'
import store from '@/store'
import config from '@/config/default.config'
import '@/core/use.lazy'
import '@/core/router.guards'

import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE
} from '@/store/mutation-types'

export default {
  init () {
    store.commit('SET_SIDEBAR_TYPE', Vue.storage.get(SIDEBAR_TYPE, true))
    store.commit('TOGGLE_THEME', Vue.storage.get(DEFAULT_THEME, config.navTheme))
    store.commit('TOGGLE_LAYOUT_MODE', Vue.storage.get(DEFAULT_LAYOUT_MODE, config.layout))
    store.commit('TOGGLE_FIXED_HEADER', Vue.storage.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
    store.commit('TOGGLE_FIXED_SIDERBAR', Vue.storage.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar))
    store.commit('TOGGLE_CONTENT_WIDTH', Vue.storage.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth))
    store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.storage.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader))
    store.commit('TOGGLE_WEAK', Vue.storage.get(DEFAULT_COLOR_WEAK, config.colorWeak))
    store.commit('TOGGLE_COLOR', Vue.storage.get(DEFAULT_COLOR, config.primaryColor))
    store.commit('SET_TOKEN', Vue.storage.get(ACCESS_TOKEN))

    // set last user data lang
    const cacheLang = Vue.storage.get('lang', config.defaultLang)
    store.dispatch('SetLang', cacheLang)
  }
}
