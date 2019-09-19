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
          path: '/logistics/providers',
          icon: 'el-icon-location',
          title: '物流商',
        },
        {
          path: '/logistics/list',
          icon: 'el-icon-location',
          title: '物流单',
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