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
        {
          name: 'setting-parameterSetting-exchangeRate-index',
          path: 'exchangeRate',
          component: ()=>import('@/pages/setting/parameterSetting/exchangeRate/index.vue')
        },
        {
          name: 'setting-storeAutho-storeAutho-index',
          path: 'storeAutho',
          component: ()=>import('@/pages/setting/storeAutho/storeAutho/index.vue')
        },
        {
          name: 'setting-clent-report-index',
          path: 'report',
          component: ()=>import('@/pages/setting/clent/report/index.vue')
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
      name: 'market-index',
      path: '/market',
      redirect:'/market/listing',
      component: ()=>import('@/pages/market/index.vue'),
      children:[
        {
          name: 'market-listing-index',
          path: 'listing',
          component: ()=>import('@/pages/market/listing/index.vue')
        },
        {
          name: 'market-evaluation-index',
          path: 'evaluation',
          component: ()=>import('@/pages/market/evaluation/index.vue')
        },
        {
          name: 'market-orderList-index',
          path: 'orderList',
          component: ()=>import('@/pages/market/orderList/index.vue')
        },
        {
          name: 'market-orderShip-index',
          path: 'orderShip',
          component: ()=>import('@/pages/market/orderShip/index.vue')
        },
        {
          name: 'market-returnOrder-index',
          path: 'returnOrder',
          component: ()=>import('@/pages/market/returnOrder/index.vue')
        },
        {
          name: 'market-delOrder-index',
          path: 'delOrder',
          component: ()=>import('@/pages/market/delOrder/index.vue')
        },
        {
          name: 'market-clientList-index',
          path: 'clientList',
          component: ()=>import('@/pages/market/clientList/index.vue')
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
