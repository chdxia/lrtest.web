import Layout from '@/layout'

const toolboxRouter = {
  path: '/toolbox',
  component: Layout,
  redirect: '/toolbox/qiniu',
  name: 'ToolBox',
  meta: {
    title: '工具箱',
    icon: 'lock'
  },
  children: [
    {
      path: 'qiniu',
      name: 'Qiniu',
      component: () => import('@/views/ToolBox/Qiniu/index'),
      meta: { title: '七牛图床' }
    }
  ]
}

export default toolboxRouter
