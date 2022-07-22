import Layout from '@/layout'

const permissionRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/role',
  name: 'Permission',
  meta: {
    title: '权限管理',
    icon: 'lock'
  },
  children: [
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/Permission/Role/index'),
      meta: { title: '角色管理' }
    },
    {
      path: 'page',
      name: 'Page',
      component: () => import('@/views/Permission/Page/index'),
      meta: { title: '页面管理' }
    }
  ]
}

export default permissionRouter
