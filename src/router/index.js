import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入根布局
import Layout from '@/layout'

// 导入路由模块
import toolboxRouter from './modules/toolbox'
import permissionRouter from './modules/permission'

// constantRoutes所有角色都可以访问
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/ErrorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/index'),
      meta: { title: '控制面板', icon: 'dashboard' }
    }]
  }
]

// 动态路由
export const asyncRoutes = [
  {
    path: '/info',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/User/UserInfo'),
        name: 'UserInfo',
        meta: { title: '个人信息', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/User/UserTable'),
        name: 'UserTable',
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Task/TaskTable'),
        name: 'TaskTable',
        meta: { title: '任务管理', icon: 'list' }
      }
    ]
  },
  // 路由分组导入
  toolboxRouter,
  permissionRouter,

  // 必须放到最后，不存在的页面都会跳转到404
  { path: '*', redirect: '/404', hidden: true }
]

// 创建路由器
const createRouter = () => new Router({
  // mode: 'history', // 开启history模式，去掉url中的#号
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 重置路由器
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
