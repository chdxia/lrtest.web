import Layout from '@/layout'

const toolboxRouter = {
  path: '/toolbox',
  component: Layout,
  redirect: '/toolbox/qiniu',
  name: 'ToolBox',
  meta: {
    title: '工具箱',
    icon: 'tool-box'
  },
  children: [
    {
      path: 'qiniu',
      name: 'Qiniu',
      component: () => import('@/views/ToolBox/Qiniu'),
      meta: { title: '七牛图床' }
    },
    {
      path: 'tool2',
      name: 'Tool2',
      component: () => import('@/views/ToolBox/Tool2'),
      meta: { title: '工具2' }
    }
  ]
}

export default toolboxRouter
