import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setDocumentTitle } from '@/utils/domUtil'

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(to.meta.title))
  next()
})

router.afterEach(() => {
  NProgress.done()
})
