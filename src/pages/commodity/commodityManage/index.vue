<template>
  <div class="user-page">
    <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini">
      <el-form-item>
        <el-radio-group v-model="searchForm.type">
          <el-radio-button label="top">全部</el-radio-button>
          <el-radio-button label="right">普通商品</el-radio-button>
          <el-radio-button label="bottom">组合商品</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.types"
          multiple
          collapse-tags
          placeholder="全部分类">
          <el-input v-model="searchType" @input="handleSearch(searchType)" placeholder="搜索内容"></el-input>
          <div>
            <el-checkbox v-model="allCategories" @change="handleCheckedAll">全选</el-checkbox>
          </div>
          <el-option
            v-show="false"
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
          <el-checkbox-group v-model="searchForm.types" @change="handleCheckedTypesChange">
            <div
              v-for="(item,index) in showOptions"
              :key="index">
              <el-checkbox 
                :label="item.value">{{item.label}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.types2"
          multiple
          collapse-tags
          placeholder="全部品牌">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" placeholder="全部状态" @change="search" style="width:120px">
          <el-option label="在售" value="inStock"></el-option>
          <el-option label="停售" value="Discontinued"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" placeholder="请选择" @change="search" style="width:100px">
          <el-option label="品名" value=""></el-option>
        </el-select>
        <el-input v-model="searchForm.userName" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <div>
        <el-button size="mini" type="primary">添加商品</el-button>
        <el-button size="mini" type="primary">添加组合商品</el-button>
        <el-button size="mini" type="primary">导入商品</el-button>
        <el-button size="mini" type="primary">导入组合商品</el-button>
        <el-button size="mini" type="primary">导入更新商品</el-button>
        <el-button size="mini" type="primary">批量编辑</el-button>
        <el-button size="mini" type="primary">批量删除</el-button>
        <el-button size="mini" type="primary">打印标签</el-button>
      </div>
      <div class="btn-box-right">
        <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-setting"></i></el-button>
        <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-download"></i></el-button>
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
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
                <el-dropdown-item @click="edit(row,$index)">编辑</el-dropdown-item>
                <el-dropdown-item @click="edit(row,$index)">打印标签</el-dropdown-item>
                <el-dropdown-item @click="edit(row,$index)">删除</el-dropdown-item>
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
import {oneOf, deleteOneofArray} from '@/utils/index.js'
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
        types:[],
        types2:[12,11],
        userName:''
      },
      searchType:'',
      allCategories:false,
      options:[
        {
          label:'家用电器-12',
          value:12,
          checked:false
        },{
          label:'厨具-11',
          value:11,
          checked:false
        },{
          label:'生活用品-10',
          value:10,
          checked:false
        },{
          label:'电子器材-16',
          value:16,
          checked:false
        },
      ],
      showOptions:[],
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
  mounted(){
    this.showOptions = this.options
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
    handleCheckedAll(v){
      if(v){
        this.searchForm.types = this.searchForm.types.concat(this.showOptions.map(i=>{return i.value}))
      }else{
        let options = this.searchForm.types.concat(this.showOptions.map(i=>{return i.value}))
        options.forEach(o=>{
          if(oneOf(o,this.searchForm.types)){
            deleteOneofArray(o,this.searchForm.types)
          }
        })
      }
    },
    handleCheckedTypesChange(v){
      console.log(v)
    },
    handleSearch(queryString){
      if(queryString&&queryString!==''){
        this.showOptions = this.options.filter(this.createFilter(queryString,'label'))
        // if()
      }
    },
    createFilter(queryString,key) {
      return (state) => {
        return (state[key].toLowerCase().indexOf(queryString.toLowerCase()) > -1);
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