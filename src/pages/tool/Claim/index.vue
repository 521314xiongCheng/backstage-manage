<template>
  <div class="user-page">
    <div class="btn-box">
      <div>
        <p>将亚马逊《盘存》和《赔偿》报表进行对比，统计未赔偿数据生成索赔case；每个月1号更新。</p>
      </div>
      <div class="btn-box-right">
        <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-setting"></i></el-button>
        <el-button size="mini" type="text" style="color:#ccc;">|</el-button>
        <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-question"></i>帮助</el-button>
      </div>
    </div>
    <el-table 
      :data="tableData"
      size="mini"
      height="430"
      border
      highlight-current-row
      stripe>
        <el-table-column prop="realName" label="店铺名称" align="center" show-overflow-tooltip min-width="80"> </el-table-column>
        <el-table-column prop="telephone" label="报告开始时间" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="loginNum" label="报告结束时间" align="center" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="lastLoginTime" label="预计索赔数量" align="center" show-overflow-tooltip min-width="140"> </el-table-column>
        <el-table-column prop="lastLoginIP" label="预估索赔金额" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="更新时间" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" show-overflow-tooltip min-width="120">
          <template slot-scope="{row, $index}">
            <el-button size="mini" @click="detail(row,$index)">详情</el-button>
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
        userName:'',
        names:''
      },
      options:[],
      tableData:[
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },{
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },{
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },{
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },{
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },{
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },{
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },{
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',          userName:'demo-andy',
          realName:'演示用户',
          telephone:13367249488,
          loginNum:1111,
          lastLoginTime:'2019-09-10 16:51:30',
          lastLoginIP:'10.10.1.148',
          createTime:'2019-09-10',
          role:'管理员',
          authorShop:'AsinKing'
        },
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
    },
    handleSizeChange(v){
      this.pageSize = v
    },
  }
}
</script>

<style lang="less" scoped>
.user-page{
  .btn-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .page-box{
    text-align: right;
    border: 1px solid #ccc;
    background: #fff;
    margin-top: -1px;
  }
}
</style>