<template>
  <div class="user-page">
    <div class="btn-box">
      <el-date-picker
        v-model="time"
        type="month"
        size="mini"
        placeholder="选择月">
      </el-date-picker>
      <el-button size="mini" type="text">帮助</el-button>
    </div>
    <el-table 
      :data="tableData"
      size="mini"
      height="500"
      border
      highlight-current-row
      stripe>
        <el-table-column prop="userName" label="货币代码" align="center"></el-table-column>
        <el-table-column prop="realName" label="符号" align="center"> </el-table-column>
        <el-table-column prop="telephone" label="货币名称" align="center"></el-table-column>
        <el-table-column prop="loginNum" label="官方汇率" align="center"></el-table-column>
        <el-table-column prop="lastLoginTime" label="我的汇率" align="center"></el-table-column>
        <el-table-column prop="lastLoginIP" label="更新时间" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      time:null,
      tableData:[
        {
          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },
        {
          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },
        {
          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },
        {
          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },
        {
          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        }
      ]
    }
  },
  methods:{
    search(){

    },
    edit(){

    },
  }
}
</script>

<style lang="less" scoped>
.user-page{
  .btn-box{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .page-box{
    text-align: right;
    border: 1px solid #ccc;
    background: #fff;
    margin-top: -1px;
  }
}
</style>