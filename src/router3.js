import Vue from 'vue'
import Router from 'vue-router'


function CommodityIndex() {
  return import(
    /* webpackChunkName: "commodity-index" */ '@/pages/commodity/index.vue'
  )
}
function HomeIndex() {
  return import(/* webpackChunkName: "home-index" */ '@/pages/home/index.vue')
}
function LoginIndex() {
  return import(/* webpackChunkName: "login-index" */ '@/pages/login/index.vue')
}
function SettingIndex() {
  return import(
    /* webpackChunkName: "setting-index" */ '@/pages/setting/index.vue'
  )
}
function CommodityBrandManageIndex() {
  return import(
    /* webpackChunkName: "commodity-brandManage-index" */ '@/pages/commodity/brandManage/index.vue'
  )
}
function CommodityCommodityManageIndex() {
  return import(
    /* webpackChunkName: "commodity-commodityManage-index" */ '@/pages/commodity/commodityManage/index.vue'
  )
}
function CommoditySortManageIndex() {
  return import(
    /* webpackChunkName: "commodity-sortManage-index" */ '@/pages/commodity/sortManage/index.vue'
  )
}
function SettingAccountRoleIndex() {
  return import(
    /* webpackChunkName: "setting-account-role-index" */ '@/pages/setting/account/role/index.vue'
  )
}
function SettingAccountUserIndex() {
  return import(
    /* webpackChunkName: "setting-account-user-index" */ '@/pages/setting/account/user/index.vue'
  )
}

Vue.use(Router)




export default new Router({
  routes: [
    {
      name: 'commodity-index',
      path: '/commodity',
      component: CommodityIndex
    },
    {
      name: 'home-index',
      path: '/home',
      component: HomeIndex
    },
    {
      name: 'login-index',
      path: '/login',
      component: LoginIndex
    },
    {
      name: 'setting-index',
      path: '/setting',
      component: SettingIndex
    },
    {
      name: 'commodity-brandManage-index',
      path: '/commodity/brandManage',
      component: CommodityBrandManageIndex
    },
    {
      name: 'commodity-commodityManage-index',
      path: '/commodity/commodityManage',
      component: CommodityCommodityManageIndex
    },
    {
      name: 'commodity-sortManage-index',
      path: '/commodity/sortManage',
      component: CommoditySortManageIndex
    },
    {
      name: 'setting-account-role-index',
      path: '/setting/account/role',
      component: SettingAccountRoleIndex
    },
    {
      name: 'setting-account-user-index',
      path: '/setting/account/user',
      component: SettingAccountUserIndex
    }
  ]
})
