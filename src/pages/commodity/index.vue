<template>
  <div>
    <el-container>
      <!-- <el-aside width="140px">
      </el-aside> -->
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
          path: '/commodity/commodityManage',
          icon: 'el-icon-location',
          title: '商品管理',
        },
        {
          path: '/commodity/brandManage',
          icon: 'el-icon-location',
          title: '品牌管理',
        },
        {
          path: '/commodity/sortManage',
          icon: 'el-icon-location',
          title: '分类管理',
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