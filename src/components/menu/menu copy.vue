<!--  -->
<template>
    <div class="contentLeft">
      <el-row>
        <el-col :span="24">
          <el-menu 
            :default-active="$route.path" 
            router 
            text-color="#bababb" 
            background-color="#333" 
            active-text-color="#fff" 
            :unique-opened="true" 
            :collapse="isCollapse">
            <el-submenu index="0">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">账号管理</span>
              </template>
              <el-menu-item index="setting/account/user">用户管理</el-menu-item>
              <el-menu-item index="/structure/department">角色管理</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">参数设置</span>
              </template>
              <el-menu-item index="/account/role">汇率管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">店铺授权</span>
              </template>
              <el-menu-item index="/product/productType">店铺授权</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">客户端</span>
              </template>
              <el-menu-item index="/order/perform">报表记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
      <i class="el-icon-menu is-collapse" @click="isCollapse = !isCollapse"></i>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse:false
    };
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    toPages(url){
      this.$router.push(url)
    }
  }
}
</script>
<style lang='less' scoped>
.contentLeft{
  background: #333;
  min-height: 100vh;
  position: relative;
  .logo{
    padding:14px 28px;
    img{
      display: block;
      width: 100%;
    }
  }
  .is-collapse{
    position: absolute;
    left: 20px;
    bottom: 80px;
    color: #bababb;
    cursor: pointer;
  }
}
</style>
<style lang='less'>
.contentLeft{
  ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color:#2d3b46;
  }
  ::-webkit-scrollbar {//滚动条的宽度
    width:2px;
    height:9px;
  }
  ::-webkit-scrollbar-thumb {//滚动条的设置
    background-color:#2d3b46;
    background-clip:padding-box;
    min-height:28px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color:#2d3b46;
  }
  .el-menu{
    border:none;
    width:140px;
    .el-menu-item{
      height: 40px;
      line-height:40px;
    }
  }
  .el-menu-item-group__title{
    padding:0
  }
  .el-submenu__title{
    line-height: 40px;
    height: 40px;
  }
  
  .el-menu--collapse>.el-menu-item .el-submenu__icon-arrow, .el-menu--collapse>.el-submenu>.el-submenu__title .el-submenu__icon-arrow{
    display: block;
  }
}
.el-menu--vertical{
  .el-menu-item-group__title{
    padding:0;
  }
  .el-submenu__title{
    line-height: 30px;
    height: 30px;
  }
  .el-menu-item{
    height: 30px!important;
    line-height:30px!important;
    font-size:12px;
    box-sizing:border-box;
    padding:0;
  }
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
    min-width: 140px;
  }
}
</style>
