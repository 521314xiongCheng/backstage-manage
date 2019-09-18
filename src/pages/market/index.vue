<template>
  <div>
    <el-container>
      <v-menu :menuList="menuList"></v-menu>
      <el-main id="wxloding">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import vMenu from '@/components/menu/menu'
export default {
  data(){
    return{
      menuList:[
        {
          path: '/market/listing',
          icon: 'el-icon-location',
          title: 'Listing',
        },
        {
          path: '/market/evaluation',
          icon: 'el-icon-location',
          title: '售后评价',
        },
        {
          path: '/market/orderList',
          icon: 'el-icon-location',
          title: '订单列表',
        },
        {
          path: '/market/orderShip',
          icon: 'el-icon-location',
          title: '订单发货',
        },
        {
          path: '/market/returnOrder',
          icon: 'el-icon-location',
          title: '退货订单',
        },
        {
          path: '/market/delOrder',
          icon: 'el-icon-location',
          title: '移除订单',
        },
        {
          path: '/market/clientList',
          icon: 'el-icon-location',
          title: '客户列表',
        },
      ]
    }
  },
  components:{
    vMenu
  }

}
</script>

<style scoped>
.el-container{
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>