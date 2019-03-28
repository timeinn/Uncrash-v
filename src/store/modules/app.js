import { loadLanguageAsync } from '@/locales'

const app = {
  state: {
    device: 'desktop',
    lang: 'en-US'
  },
  mutations: {
    SET_LANG: (state, lang) => {
      state.lang = lang
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    // 设置界面语言
    SetLang ({ commit }, lang) {
      return new Promise(resolve => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
