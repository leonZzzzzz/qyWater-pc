import Vue from 'vue'
import Router from 'vue-router'
import core from '@/modules/core/router'
import sms from '@/modules/sms/router'
import lesson from '@/modules/lesson/router'
import examples from '@/examples'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "main" */ '@/modules/core/views/login/Login.vue'),
      name: 'login'
    },
    {
      path: '/register',
      component: () =>
        import(/* webpackChunkName: "main" */ '@/modules/core/views/register/Index.vue')
    },
    {
      path: '/service',
      component: () =>
        import(/* webpackChunkName: "main" */ '@/modules/core/views/register/Service.vue')
    },
    {
      path: '/main',
      component: () =>
        import(/* webpackChunkName: "main" */ '@/modules/core/views/layout/Main.vue'),
      children: [
        {
          path: 'index',
          component: () => import(/* webpackChunkName: "main" */ '@/modules/core/views/index/Index')
        },
        ...core,
        ...sms,
        ...lesson,
        
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
    ...examples
  ]
})
