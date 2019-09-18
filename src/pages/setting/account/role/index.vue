<template>
  <div class="user-page">
    <div class="btn-box">
      <el-button size="mini" type="primary">添加角色</el-button>
      <el-button size="mini" type="text">帮助</el-button>
    </div>
    <el-row class="role-content">
      <el-col :span="4" class="content-left">
        <div style="padding:10px;">
          <el-input size="mini"></el-input>
        </div>
        <el-table
          :data="leftTableData"
          size="mini"
          height="430"
          :show-header="false"
          highlight-current-row>
          <el-table-column>
            <template slot-scope="{row}">
              <i class="el-icon-user"></i>
              <span>{{row.name}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="20" class="content-right">
        <div class="content-right-head">
          <div>
            <span>物流</span>
            <p class="update-time">更新时间 2019-07-11 11:36:06</p>
          </div>
          <el-dropdown split-button type="primary" size="mini">
            编辑
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色用户" name="first">    
            <div class="first-table-head">
              <!-- <span class="">共 2 名用户</span> -->
              <el-button type="text" size="mini"><i class="el-icon-plus"></i>添加用户</el-button>
              <el-button type="text" size="mini">|</el-button>
              <el-button type="text" size="mini">批量移除</el-button>
            </div>
            <el-input placeholder="搜索用户名或真实姓名" style="border-radius:0;" prefix-icon="el-icon-search">
            </el-input>
            <el-table 
              :data="tableData"
              size="mini"
              height="275"
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
                <el-table-column label="操作" fixed="right" align="center" show-overflow-tooltip min-width="120">
                  <template slot-scope="{row, $index}">
                    <el-button size="mini" @click="del(row,$index)">移除</el-button>
                  </template>
                </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="功能权限" name="second">
            <p style="font-size:12px;">勾选控制将决定页面和按钮的显示与隐藏</p>
            <el-table 
              :data="funcWrapTable"
              height="320"
              size="mini"
              border
              stripe>
                <el-table-column label="板块" width="120">
                  <template>
                    <div>首页</div>
                    <div>商品</div>
                    <div>销售</div>
                    <div>物流</div>
                    <div>工具</div>
                    <div>设置</div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot="header">
                    <el-checkbox v-model="checked">全选</el-checkbox>
                  </template>
                  <template>
                    <el-table 
                      :data="funcPermissionTable"
                      size="mini"
                      border
                      :show-header="false"
                      stripe>
                        <el-table-column width="120">
                          <template slot-scope="{row}">
                            <el-checkbox :indeterminate="row.isIndeterminate" v-model="row.checkAll" @change="handleCheckAllChange($event,row)">全选</el-checkbox>
                          </template>
                        </el-table-column>
                        <el-table-column>
                          <template slot-scope="{row}">
                            <el-checkbox-group v-model="row.checkedCities" @change="handleCheckedCitiesChange($event,row)">
                              <el-checkbox v-for="city in row.cities" :label="city" :key="city">{{city}}</el-checkbox>
                            </el-checkbox-group>
                          </template>
                        </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="数据权限" name="third">
            <el-table 
              :data="datapermissionTable"
              size="mini"
              height="290"
              border
              highlight-current-row
              stripe>
                <el-table-column label="字段" align="center">
                  <template slot-scope="{row}">
                    {{row.name}}
                    <el-tooltip class="item" effect="dark" :content="row.title" placement="top">
                      <span class="el-icon-question"></span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="可见" align="center">
                  <template slot-scope="{row}">
                    <el-radio v-model="row.visible" :label="true"><span></span></el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="不可见" align="center">
                  <template slot-scope="{row}">
                    <el-radio v-model="row.visible" :label="false"><span></span></el-radio>
                  </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
              <el-button size="mini" type="primary">保存</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳', '北京', '广州', '深圳', '北京', '广州', '深圳'];
export default {
  data(){
    return {
      activeName:'second',
      pageSize:1,
      pageNo:1,
      totalCount:5,
      leftTableData:[
        {
          name:'物流'
        },{
          name:'仓管'
        },{
          name:'运营'
        },{
          name:'管理员'
        },
      ],
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
      datapermissionTable:[
        {
          name:'采购成本',
          title:'dsjdhsjkd',
          visible:true,
        },
        {
          name:'库存单价、库存货值',
          title:'dsdhkshdks',
          visible:true,
        },
      ],
      checked:false,
      funcWrapTable:[
        {}
      ],
      funcPermissionTable:[
        {
          checkAll: false,
          checkedCities: ['上海', '北京'],
          cities: cityOptions,
          isIndeterminate: true
        },
        {
          checkAll: false,
          checkedCities: ['上海', '北京'],
          cities: cityOptions,
          isIndeterminate: true
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
    handleClick(){
      
    },
    handleCheckAllChange(val,row) {
      row.checkedCities = val ? cityOptions : [];
      row.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value,row) {
      let checkedCount = value.length;
      row.checkAll = checkedCount === row.cities.length;
      row.isIndeterminate = checkedCount > 0 && checkedCount < row.cities.length;
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
    // border: 1px solid #ccc;
    background: #fff;
    margin-top: -1px;
    padding: 10px;
  }
  .role-content{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);
    .content-left{
      border-right: 1px solid #ccc;
    }
    .content-right{
      padding: 20px;
      .content-right-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .update-time{
          font-size: 12px;
        }
      }
      .first-table-head{
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>