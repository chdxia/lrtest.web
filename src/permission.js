import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress进度条

const whiteList = ['/login'] // 白名单

// 路由守卫，路由跳转前都会经过这里
router.beforeEach(async(to, from, next) => {
  NProgress.start() // NProgress进度条开始

  document.title = getPageTitle(to.meta.title) // 页面标题

  const hasToken = getToken()

  if (hasToken) { // 如果有token，表示用户已登录
    if (to.path === '/login') {
      next({ path: '/' }) // 登录页重定向到主页
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo') // 尝试获取当前用户的roles

          const accessRoutes = await store.dispatch('permission/generateRoutes', roles) // 根据当前用户的roles初始化路由表

          router.addRoutes(accessRoutes) // 动态添加路由表

          next({ ...to, replace: true })
        } catch (error) { // 无法获取当前用户的roles，移除token并跳转到登录页
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 没有token
    if (whiteList.indexOf(to.path) !== -1) { // 在白名单
      next()
    } else { // 不在白名单，而且没有token，跳转到登录页
      next(`/login?redirect=${to.path}`)
      console.log('permission不通过')
      NProgress.done()
    }
  }
})

// 路由守卫，路由跳转后会经过这里
router.afterEach(() => {
  NProgress.done() // NProgress进度条结束
})
