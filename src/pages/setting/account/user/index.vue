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
        <el-input v-model="searchForm.userName" placeholder="请输入搜索内容" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="mini" type="primary" @click="addUser">添加用户</el-button>
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
            <el-dropdown split-button type="primary" size="mini" @click="handleClick(row)">
              编辑
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  @click.native="del(row,$index)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :page-sizes="[20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <!-- 编辑、添加用户 -->
    <el-dialog 
      :title="dialogTitle" 
      :visible.sync="userFormPop" 
      width="780px">
      <el-form 
        :model="userForm" 
        :inline="true" 
        size="mini"
        status-icon 
        :rules="userRules" 
        ref="userForm"
        class="userForm" 
        label-width="100px">
        <el-form-item label="用户名" prop="userName" required>
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName" required>
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone" required>
          <el-input v-model="userForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" required>
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <div class="long-input">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password"></el-input>
          </el-form-item>
        </div>
        <div class="long-input">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="userForm.confirmPassword"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部角色</el-checkbox>
          <div class="checkbox-group">
            <el-form-item prop="checkedRoles">
              <el-checkbox-group v-model="userForm.checkedRoles" @change="handleCheckedRolesChange">
                <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="checkbox-header">
            <el-checkbox :indeterminate="shopIsIndeterminate" v-model="checkAllShops" @change="handleCheckAllShopsChange">全部店铺</el-checkbox>
            <el-input size="mini" placeholder="搜索店铺" @input="searchShop" style="width:260px;"></el-input>
          </div>
          <div class="checkbox-group">
            <el-form-item prop="checkedShops">
              <el-checkbox-group v-model="userForm.checkedShops" @change="handleCheckedShopsChange">
                <el-checkbox v-for="shop in shops" :label="shop" :key="shop">{{shop}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="dialogFooter tar" slot="footer">
        <el-button type="primary" plain @click="handleCancel('reviseForm')" size="mini">取消</el-button>
        <el-button type="primary" @click="handleSubmit('reviseForm')" :loading="loading" size="mini" style="margin-right:20px;">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const allShops = ['AD-墨西哥', 'AM-法国','AP-意大利','AsinKing-美国']
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
          authorShop:'AsinKing',
          checkedRoles:[],
          checkedShops:[]
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
          authorShop:'AsinKing',
          checkedRoles:[],
          checkedShops:[]
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
          authorShop:'AsinKing',
          checkedRoles:[],
          checkedShops:[]
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
          authorShop:'AsinKing',
          checkedRoles:[],
          checkedShops:[]
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
          authorShop:'AsinKing',
          checkedRoles:[],
          checkedShops:[]
        }
      ],
      // 编辑、添加用户
      dialogTitle:'添加用户',
      userFormPop:false,
      userForm:{
        userName:'',
        realName:'',
        telephone:null,
        email:'',
        password:'',
        confirmPassword:'',
        checkedRoles: [],
        checkedShops: [],
      },
      userRules:{},
      loading:false,
      checkAll: false,
      roles: ['物流', '仓管','运营','管理员'],
      isIndeterminate: false,
      checkAllShops: false,
      checkedShops: [],
      shops: [],
      shopIsIndeterminate: false,
    }
  },
  mounted(){
    this.shops = allShops
  },
  methods:{
    search(){

    },
    del(row,index){
      this.$confirm('用户删除后，不可恢复', '删除该用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index,1)
        })
        .catch(() => {})
    },
    handleCurrentChange(v){
      this.pageNo=v
    },
    handleSizeChange(v){
      this.pageSize = v
    },
    addUser(){
      this.userFormPop = true
      this.dialogTitle = '添加用户'
      this.$nextTick(()=>{
        this.$refs.userForm.resetFields()
      })
    },
    handleClick(row){
      this.userFormPop = true
      this.dialogTitle = '编辑用户'
      this.$nextTick(()=>{
        this.userForm = row
      })
    },
    handleCheckAllChange(val) {
      this.userForm.checkedRoles = val ? this.roles : [];
      this.isIndeterminate = false;
    },
    handleCheckedRolesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
    },
    handleCheckAllShopsChange(val) {
      this.userForm.checkedShops = val ? this.shops : [];
      this.shopIsIndeterminate = false;
    },
    handleCheckedShopsChange(value) {
      let checkedCount = value.length;
      this.checkAllShops = checkedCount === this.shops.length;
      this.shopIsIndeterminate = checkedCount > 0 && checkedCount < this.shops.length;
    },
    searchShop(queryString){
      if(queryString&&queryString!==''){
        this.shops = allShops.filter(this.createFilter(queryString))
      }
    },
    createFilter(queryString) {
      return (state) => {
        return (state.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
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
  .checkbox-header{
    display: flex;
    justify-content: space-between;
  }
  .checkbox-group{
    margin: 15px 0;
    padding:10px 15px;
    background: #f2f2f2;
    max-height: 200px;
  }
}
</style>
<style lang="less">
.userForm{
  input,.searchForm select {width: 260px;}
  .long-input{
    input,.searchForm select {width: 630px;}
  }
}
</style>