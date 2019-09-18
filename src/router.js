import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes:[
    {
      name: 'home-index',
      path: '/home',
      component: ()=>import('@/pages/home/index.vue')
    },
    {
      name: 'login-index',
      path: '/login',
      component: ()=>import('@/pages/login/index.vue')
    },
    {
      name: 'setting-index',
      path: '/setting',
      redirect: '/setting/user',
      component: ()=>import('@/pages/setting/index.vue'),
      children:[
        {
          name: 'setting-account-role-index',
          path: 'role',
          component: ()=>import('@/pages/setting/account/role/index.vue')
        },
        {
          name: 'setting-account-user-index',
          path: 'user',
          component: ()=>import('@/pages/setting/account/user/index.vue')
        },
      ]
    },
    {
      name: 'commodity-index',
      path: '/commodity',
      redirect:'/commodity/commodityManage',
      component: ()=>import('@/pages/commodity/index.vue'),
      children:[
        {
          name: 'commodity-brandManage-index',
          path: 'brandManage',
          component: ()=>import('@/pages/commodity/brandManage/index.vue')
        },
        {
          name: 'commodity-commodityManage-index',
          path: 'commodityManage',
          component: ()=>import('@/pages/commodity/commodityManage/index.vue')
        },
        {
          name: 'commodity-sortManage-index',
          path: 'sortManage',
          component: ()=>import('@/pages/commodity/sortManage/index.vue')
        },
      ]
    },
    {
      path:'/',
      redirect:'/login'
    }
  ]
})

export default router
