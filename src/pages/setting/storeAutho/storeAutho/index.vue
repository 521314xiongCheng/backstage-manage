<template>
  <div class="user-page">
    <div class="btn-box">
      <el-button size="mini" type="primary" @click="addShop">添加店铺</el-button>
      <el-button size="mini" type="text">帮助</el-button>
    </div>
    <el-table 
      :data="tableData"
      size="mini"
      height="460"
      border
      highlight-current-row
      stripe>
        <el-table-column prop="userName" label="店铺" align="center"></el-table-column>
        <el-table-column prop="realName" label="站点" align="center"> </el-table-column>
        <el-table-column prop="telephone" label="店铺邮箱" align="center"></el-table-column>
        <el-table-column prop="loginNum" label="授权时间" align="center"></el-table-column>
        <el-table-column prop="lastLoginTime" label="广告授权验证" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" show-overflow-tooltip min-width="120">
          <template slot-scope="{row, $index}">
            <el-dropdown split-button type="primary" size="mini" @click="handleClick(row)">
              编辑
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="del(row,$index)">删除店铺</el-dropdown-item>
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
    <!-- 编辑、添加店铺 -->
    <el-dialog 
      :visible.sync="shopFormPop" 
      width="680px">
      <template slot="title">
        <span>{{dialogTitle}}</span>
        <a style="font-size:14px;margin-left:10px;color:blue;" href="https://document.asinking.com/?id=44&level1=10&level2=2">如何进行店铺授权？</a>
      </template>
      <div class="tip">
        授权成功后，你可以在任何地方登录AsinKing查看店铺数据。
      </div>
      <el-form 
        :model="shopForm" 
        size="mini"
        status-icon 
        :rules="shopRules" 
        ref="shopForm"
        class="shopForm" 
        label-width="100px">
        <el-form-item label="店铺名称" prop="shopName" required>
          <el-input v-model="shopForm.shopName"></el-input>
        </el-form-item>
        <el-form-item label="站点" prop="site" required>
          <!-- <el-input v-model="shopForm.site"></el-input> -->
          <el-select
            v-model="shopForm.site"
            placeholder="请选择">
            <el-option
              v-for="(item,index) in sites"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Seller ID" prop="sellerId" required>
          <el-input v-model="shopForm.sellerId"></el-input>
          <p v-if="shopForm.realName">请先选择站点，再获取授权链接</p>
          <p v-else>点击复制，获取北美洲站授权链接，请在常用店铺环境打开，以免关联 <el-button type="text" size="mini">复制</el-button></p>
        </el-form-item>
        <el-form-item label="MWS Auth Token" prop="token" required>
          <el-input v-model="shopForm.token"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialogFooter tar" slot="footer">
        <el-button type="primary" plain @click="handleCancel('reviseForm')" size="mini">取消</el-button>
        <el-button type="primary" @click="handleSubmit('reviseForm')" :loading="loading" size="mini" style="margin-right:20px;">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      time:null,
      pageNo:1,
      pageSize:20,
      totalCount:100,
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
      ],
      // 编辑、添加店铺
      dialogTitle:'添加店铺授权',
      shopFormPop:false,
      shopForm:{
        shopName:'',
        site:null,
        sellerId:null,
        token:''
      },
      shopRules:{

      },
      sites:[
        {
          label:'AD 墨西哥',
          value:1,
        },{
          label:'AM-法国',
          value:2,
        },{
          label:'AP-意大利',
          value:3,
        },{
          label:'AsinKing-美国',
          value:4,
        },
      ],
      loading:false
    }
  },
  methods:{
    search(){

    },
    del(row,index){
      this.$confirm('店铺删除后，店铺相关的数据将被彻底删除，且不可恢复', '删除该店铺', {
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
      this.pageNo = v
    },
    handleSizeChange(v){
      this.pageSize = v
    },
    addShop(){
      this.shopFormPop = true
      this.dialogTitle = '添加店铺授权'
      this.$nextTick(()=>{
        this.$refs.shopForm.resetFields()
      })
    },
    handleClick(row){
      this.shopFormPop = true
      this.dialogTitle = '编辑店铺授权'
      this.$nextTick(()=>{
        this.shopForm = row
      })
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
  .tip{
    border:1px solid blue;
    padding: 12px 8px;
    background: #e5f0ff;
    font-size: 12px;
    margin-bottom: 15px;
  }
}
</style>
<style lang="less">
.shopForm{
  input,.searchForm select {width: 540px;}
}
</style>