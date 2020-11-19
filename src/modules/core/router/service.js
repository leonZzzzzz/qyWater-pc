export default [
  {
    path: 'service/setting/my',
    component: () => import('../views/service/platform/Index')
  },
  {
    path: 'service/setting/pay',
    component: () => import('../views/service/pay/List')
  },
  {
    path: 'service/setting/pay/agreement',
    component: () => import('../views/service/pay/Agreement')
  },
  {
    path: 'service/setting/pay/agreement/form',
    component: () => import('../views/service/pay/AgreementForm')
  }
]
