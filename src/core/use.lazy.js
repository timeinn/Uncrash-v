import Vue from 'vue'
import VueStorage from 'vue-ls'
import { VueAxios } from '@/utils/request'
import config from '@/config/default.config'
import '@/core/use.lib.ant' // antd library
import '@/styles/app.less'

Vue.use(VueStorage, config.storage)

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
