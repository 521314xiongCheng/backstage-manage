<template>
  <div class="user-page">
    <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini">
      <el-form-item>
        <el-select v-model="searchForm.name" placeholder="请选择" @change="search" style="width:120px">
          <el-option label="登录时间" value=""></el-option>
        </el-select>
        <el-date-picker
          style="width:280px"
          v-model="searchForm.time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" placeholder="请选择" @change="search" style="width:120px">
          <el-option label="用户名" value=""></el-option>
        </el-select>
        <el-input v-model="searchForm.userName" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="mini" type="primary">添加用户</el-button>
      <el-button size="mini" type="text">帮助</el-button>
    </div>
    <el-table 
      :data="tableData"
      size="mini"
      height="430"
      border
      highlight-current-row
      stripe>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" align="center" show-overflow-tooltip min-width="80"> </el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="loginNum" label="登录次数" align="center" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最近登录时间" align="center" show-overflow-tooltip min-width="140"> </el-table-column>
        <el-table-column prop="lastLoginIP" label="最近登录IP" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="role" label="角色" align="center" show-overflow-tooltip min-width="80"> </el-table-column>
        <el-table-column prop="authorShop" label="授权店铺" align="center" show-overflow-tooltip min-width="80"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" show-overflow-tooltip min-width="120">
          <template slot-scope="{row, $index}">
            <el-popover placement="bottom" popper-class="table_popper" trigger="hover">
              <ul>
                <li>
                  <el-button type="text" size="mini" @click="edit(row, $index)">编辑</el-button>
                </li>
              </ul>
              <el-button type="text" slot="reference">操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      pageSize:1,
      pageNo:1,
      totalCount:5,
      searchForm:{
        name:'',
        time:[],
        type:'',
        userName:''
      },
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
    handleCurrentChange(v){
      this.pageNo=v
    }
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