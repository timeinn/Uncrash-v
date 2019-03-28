import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setDocumentTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(to.meta.title))
  if (Vue.storage.get(ACCESS_TOKEN)) {
    if (to.path === '/user/login') {
      next({ path: '/dashboard/workplace' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          console.log('GetInfo', res)
        }).catch(() => {
          store.dispatch('Logout').then(() => {

            // next({ path: '/user/login', query: { redirect: to.fullPath } })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
