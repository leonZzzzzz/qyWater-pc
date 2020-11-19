
export default [
  //#region 用户管理
  {
    path: 'base/member',
    component: () => import('../views/base/member/List')
  },
  //#endregion

  //#region 操作日志
  {
    path: 'base/logs/list',
    component: () => import('../views/base/logs/List')
  },
  //#endregion

  //#region 图文管理
  {
    path: 'base/news/list',
    component: () => import('../views/base/news/list/List')
  },
  {
    path: 'base/news/detail',
    component: () => import('../views/base/news/list/Detail')
  },
  {
    path: 'base/news/category/list',
    component: () => import('../views/base/news/category/List')
  },
  //#endregion

  //#region 消息模板
  {
    path: 'base/template/list',
    component: () => import('../views/base/template/List')
  },
  {
    path: 'base/template/form',
    component: () => import('../views/base/template/Form')
  },
  {
    path: 'base/template/detail',
    component: () => import('../views/base/template/Detail')
  },
  //#endregion

  //#region 广告图
  {
    path: 'base/config/banner/list',
    component: () => import('../views/base/banner/List')
  },
  //#endregion

  //#region 全局配置
  {
    path: 'base/config/about',
    component: () => import('../views/base/config/About')
  },
  //#endregion
]
