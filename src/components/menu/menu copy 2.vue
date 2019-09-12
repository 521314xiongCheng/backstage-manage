<!--  -->
<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
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
  // .el-menu{
  //   border:none;
  //   // width:140px;
  //   .el-menu-item{
  //     height: 40px;
  //     line-height:40px;
  //   }
  // }
  // .el-menu-item-group__title{
  //   padding:0
  // }
  // .el-submenu__title{
  //   line-height: 40px;
  //   height: 40px;
  // }
  
  // .el-menu--collapse>.el-menu-item .el-submenu__icon-arrow, .el-menu--collapse>.el-submenu>.el-submenu__title .el-submenu__icon-arrow{
  //   display: block;
  // }
}
.el-menu--vertical{
  // .el-menu-item-group__title{
  //   padding:0;
  // }
  // .el-submenu__title{
  //   line-height: 30px;
  //   height: 30px;
  // }
  // .el-menu-item{
  //   height: 30px!important;
  //   line-height:30px!important;
  //   font-size:12px;
  //   box-sizing:border-box;
  //   padding:0;
  // }
  // .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  //   // min-width: 140px;
  // }
}
</style>
