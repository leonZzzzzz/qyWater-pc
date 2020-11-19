import base from './base'
import systemManager from './system-manager'
import service from './service'

export default [
  ...base,
  ...systemManager,
  ...service,
  {
    path: 'article/list',
    component: () => import('../views/article/list')
  },
  {
    path: 'article/form',
    component: () => import('../views/article/form')
  },

  {
    path: 'comment/list',
    component: () => import('../views/comment/list')
  },
  {
    path: 'comment/form',
    component: () => import('../views/comment/form')
  },
  {
    path: 'batch/list',
    component: () => import('../views/batch/list')
  },
  {
    path: 'batch/form',
    component: () => import('../views/batch/form')
  },
  {
    path: 'batch/map',
    component: () => import('../views/batch/map')
  },


]
