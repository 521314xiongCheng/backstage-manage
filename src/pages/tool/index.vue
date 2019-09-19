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
          path: '/tool/ranking',
          icon: 'el-icon-location',
          title: '关键词排名',
        },
        {
          path: '/tool/selling',
          icon: 'el-icon-location',
          title: '跟卖监控',
        },
        {
          path: '/tool/newest',
          icon: 'el-icon-location',
          title: '上新监控',
        },
        {
          path: '/tool/claim',
          icon: 'el-icon-location',
          title: '索赔助手',
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