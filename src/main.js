import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './locales'
import bootstrap from './core/bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  beforeCreate () {
    bootstrap.init()
  },
  render: h => h(App)
}).$mount('#app')
