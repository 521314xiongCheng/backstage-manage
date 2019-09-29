<template>
  <div class="user-page">
    <div class="btn-box">
      <el-button size="mini" type="primary">添加物流商</el-button>
      <el-button size="mini" type="text" style="color:#ccc;"><i class="el-icon-question"></i>帮助</el-button>
    </div>
    <el-row class="page-row">
      <el-col :span="8">
        <el-card :body-style="bodyStyle">
          <div class="left-title">物流商</div>
          <el-collapse v-model="activeNames" @change="handleChange" class="left-content">
            <el-collapse-item title="第三方物流" name="1">
            </el-collapse-item>
            <el-collapse-item title="自定义物流商" name="2">
              <el-table        
                :data="tableData"
                highlight-current-row	
                :show-header="false"
                size="mini">
                <el-table-column prop="name"></el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :span="16" class="content-right">
        <div v-if="true" class="providers-type">
          <header class="header">物流商类型介绍</header>
          <div class="providers-item">
            <span>第三方物流</span>
            <div class="item-content">
              <p>1、请在左侧物流商列表启用第三方物流商</p>
              <p>2、启用后，点击对应物流商管理的物流方式</p>
              <p>3、缺少物流商，物流方式，请联系我们添加</p>
            </div>
          </div>
          <div class="providers-item">
            <span>自定义物流</span>
            <div class="item-content">
              <p>如果第三方物流中没有查询到您所使用的物流商，且该物流商无API对接，您可以自定义物流商，通过excel导入的方式记录物流信息</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="content-right-head">
            <div>
              <div>
                <span class="providers-name">中国邮政</span>
                <el-button type="text" size="mini">编辑</el-button>
              </div>
              <p class="update-time">代码 001</p>
            </div>
            <el-button size="mini">停用此物流商</el-button>
          </div>
          <div class="first-table-head">
            <el-button type="text" disabled size="mini">物流方式</el-button>
            <el-button type="text" size="mini">添加物流</el-button>
          </div>
          <el-input placeholder="搜索用户名或真实姓名" style="border-radius:0;" prefix-icon="el-icon-search">
          </el-input>
          <el-table 
            :data="providers"
            size="mini"
            height="330"
            border
            highlight-current-row
            stripe>
              <el-table-column label="启用" align="center">
                <template slot-scope="{row}">
                  <el-switch
                    v-model="row.enable"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="code" label="代码" align="center"> </el-table-column>
              <el-table-column prop="name" label="名称" align="center"></el-table-column>
              <el-table-column label="操作" fixed="right" align="center">
                <template slot-scope="{row, $index}">
                  <el-dropdown split-button type="primary" size="mini">
                    详情
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="edit(row,$index)">编辑</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activeNames:[],
      bodyStyle:{
        padding:0,
      },
      tableData:[
        {
          name:'中国邮政'
        },
        {
          name:'顺丰速递'
        },
        {
          name:'东方速递'
        }
      ],
      providers:[
        {
          enable:true,
          code:'002',
          name:'快速包裹'
        },
        {
          enable:true,
          code:'003',
          name:'包裹平邮'
        },
      ]
    }
  },
  methods:{
    handleChange(){
      
    }
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
  }
  .page-row{
    border:1px solid #ddd;
    .left-title{
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  
    .content-right{
      height: 500px;
      border-left: 1px solid #ddd;
      padding: 20px;
      .providers-type{
        .header{
          font-weight: bold;
        }
        .providers-item{
          font-size: 12px;
          margin-top: 20px;
          span{
            line-height: 26px;
          }
          .item-content{
            background: #fafafa;
            padding: 10px;
          }
        }
      }
      .content-right-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .providers-name{
          margin-right: 10px;
        }
        .update-time{
          font-size: 12px;
          color: orange;
        }
      }
      .first-table-head{
        display: flex;
        align-items: center;
        .title{
          font-size: 12px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.left-content{
  .el-collapse-item{
    .el-collapse-item__header{
      padding:0 10px;
    }
  }
}
</style>