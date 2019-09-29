<template>
  <div class="user-page">
    <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini">
      <el-form-item style="width:100px;">
        <v-select :options="principals" v-model="searchForm.principals" placeholder="搜索负责人"></v-select>
      </el-form-item>
      <el-form-item style="width:100px;">
        <v-select :options="sites" v-model="searchForm.sites" placeholder="全部站点"></v-select>
      </el-form-item>
      <el-form-item style="width:100px;">
        <v-select :options="shops" v-model="searchForm.shops" placeholder="全部店铺"></v-select>
      </el-form-item>
      <el-form-item style="width:100px;">
        <v-select :options="sorts" v-model="searchForm.sorts" placeholder="全部分类"></v-select>
      </el-form-item>
      <el-form-item style="width:100px;">
        <v-select :options="brands" v-model="searchForm.brands" placeholder="全部品牌"></v-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" placeholder="请选择" @change="search" style="width:70px">
          <el-option label="退款时间" value="MSKU"></el-option>
          <el-option label="订购时间" value="MSKU"></el-option>
        </el-select>
        <el-date-picker
          style="width:200px"
          v-model="searchForm.time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" placeholder="请选择" @change="search" style="width:70px">
          <el-option label="订单号" value="MSKU"></el-option>
        </el-select>
        <el-input placeholder="请输入内容" style="width:120px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <div>
        
      </div>
      <div class="btn-box-right">
        <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-info"></i></el-button>
        <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-setting"></i></el-button>
        <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-download"></i></el-button>
      </div>
    </div>
    <el-table 
      :data="tableData"
      size="mini"
      height="430"
      border
      highlight-current-row
      stripe>
        <el-table-column prop="userName" label="图片" align="center">
          <template slot-scope="{row}">
            <div class="good-info">
              <img :src="row.img" width="30" height="30" alt="">
              {{row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="品名/SKU" align="center" show-overflow-tooltip min-width="80"> </el-table-column>
        <el-table-column prop="telephone" label="分类" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="loginNum" label="品牌" align="center" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="lastLoginTime" label="采购员" align="center" show-overflow-tooltip min-width="140"> </el-table-column>
        <el-table-column prop="lastLoginIP" label="采购成本" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="role" label="状态" align="center" show-overflow-tooltip min-width="80"> </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" show-overflow-tooltip min-width="120">
          <template slot-scope="{row, $index}">
            <el-dropdown split-button type="primary" size="mini">
              详情
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="del(row,$index)">创建多渠道订单</el-dropdown-item>
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
  </div>
</template>

<script>
import vSelect from '@/components/select/index'
export default {
  components:{vSelect},
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
        names:'',
        principals:[],
        shops:[],
        sites:[],
        sorts:[],
        brands:[]
      },
      principals:[
        {
          label:'张三',
          value:1,
        },{
          label:'李四',
          value:2,
        },{
          label:'王五',
          value:3,
        },{
          label:'赵六',
          value:4,
        },
      ],
      shops:[
        {
          label:'美国',
          value:1,
        },{
          label:'加拿大',
          value:2,
        },{
          label:'墨西哥',
          value:3,
        },{
          label:'英国',
          value:4,
        },
      ],
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
      sorts:[
        {
          label:'家用电器-12',
          value:1,
        },{
          label:'厨具-11',
          value:2,
        },{
          label:'生活用品-10',
          value:3,
        },{
          label:'电子器材-16',
          value:4,
        },
      ],
      brands:[
        {
          label:'UU',
          value:5,
        },{
          label:'YM',
          value:6,
        },{
          label:'ZL',
          value:7,
        },{
          label:'AKO',
          value:8,
        },
      ],
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
    margin-bottom: 20px;
    .btn-box-right{
      i{
        font-size: 20px;
      }
    }
  }
  .page-box{
    text-align: right;
    border: 1px solid #ccc;
    background: #fff;
    margin-top: -1px;
  }
}
</style>