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
      name: 'RoleTable',
      component: () => import('@/views/Permission/RoleTable'),
      meta: { title: '角色管理' }
    },
    {
      path: 'route',
      name: 'RouteTable',
      component: () => import('@/views/Permission/RouteTable'),
      meta: { title: '路由管理' }
    }
  ]
}

export default permissionRouter
