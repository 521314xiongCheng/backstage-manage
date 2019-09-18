<template>
  <div>
    <el-container>
      <!-- <el-aside width="140px">
      </el-aside> -->
      <v-menu></v-menu>
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