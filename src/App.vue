<template>
  <div id="app">
    <div v-if="$route.path === '/login'">
      <router-view></router-view>
    </div> 
    <div v-else>
      <el-container>
        <el-header height="50px">
          <v-header></v-header>
        </el-header>
        <div
          v-if="
            $route.path.includes('setting') ||
              $route.path.includes('commodity') ||
                $route.path.includes('market') ||
                  $route.path.includes('logistics') ||
                  $route.path.includes('tool')
          ">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <el-main id="wxloding" v-else>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
require('@/style/common.css')
require('@/style/font.css')
import vHeader from '@/components/header/header'
export default {
  data(){
    return {
      
    }
  },
  components:{
    vHeader
  }
}
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<style scoped lang="less">
.el-header,.el-footer{
  padding:0;
}
.el-container{
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>

