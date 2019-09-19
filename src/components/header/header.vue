<template>
  <div class="headerTop">
    <el-row class="nav-row" style="width:100%;">
      <el-col :span="20">
        <el-menu 
          :default-active="
            $route.path.includes($route.path.split('/')[0])?`/${$route.path.split('/')[0]}`:$route.path
          " 
          router 
          text-color="#bababb" 
          background-color="#262626" 
          active-text-color="#fff" 
          mode="horizontal"
          >
          <el-menu-item :index="item.path" v-for="item in historyList" :key="item.path">{{item.name}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="user-info">
        <el-dropdown trigger="hover" @visible-change="getMsg">
          <el-badge :is-dot="this.msgCheck">
            <i class="iconfont icontongzhi"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown" class="user-dropdown-detail notice-dropdown-detail">
            <div class="user-detail notice-detail">
              <div class="notice-current-task current-task">
                <div class="box-card">
                  <div slot="header" class="card-head">系统消息（{{msgList.length}}）</div>
                  <div class="card-item-warp">
                    <el-card shadow="hover" style="margin:10px 0;" v-for="(item,index) in msgList" :key="index">
                      <div class="card-item" style="padding-bottom:0;" @click="showMsg(item)">
                        <i class="iconfont iconStone-mail"></i>
                        <div class="notice-content">
                          <el-badge :is-dot="!item.hasRead" class="item-title">
                            <span>{{item.msgName}}：{{item.title}}</span>
                          </el-badge>
                          <div class="basic-info">
                            <span class="item-label">{{item.gmtCreate}}</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div>
              <div class="handle">
                <span class="handle-more">查看全部</span>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover" @command="handleCommand">
          <div>
            <i class="iconfont iconchengren" style="font-size:30px;"></i>
            <span>演示用户</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown-detail notice-dropdown-detail">
            <el-dropdown-item command="set">账户设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import storage from "good-storage"
import { delCookie } from '@/utils/index'
export default {
  data() {
    return {
      historyList:[
        {
          name:'我的店铺',
          path:null
        },{
          name:'首页',
          path:'/home'
        },{
          name:'商品',
          path:'/commodity'
        },{
          name:'销售',
          path:'/market'
        },{
          name:'物流',
          path:'/logistics'
        },{
          name:'工具',
          path:'/tool'
        },{
          name:'设置',
          path:'/setting'
        }
      ],
      msgCheck:false,
      msgList:[]
    }
  },
  directives: {
    Clickoutside,
  },
  created() {
  },
  mounted() {
  },
  destroyed () {
  },
  methods: {
    toPath(item){
      this.$router.push(item.path)
    },
    quit(){
      this.$confirm('您确定要退出吗？', '确认退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCookie('token')
        storage.set('historyList',[])
        this.$router.replace('/login')
      }).catch(() => {});
    },
    getMsg(){

    },
    handleCommand(v){
      if(v==='logout'){
        this.$router.push('/login')
      }
    }
  } 
}
</script>
<style lang='less' scoped>
.headerTop{
  background: #262626;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  .nav-row{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .user-info{
    min-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .iconfont{
      font-size: 20px;
      margin:0 8px;
      display: inline-block;
      color: #fff;
    }
    .el-dropdown{
      .el-dropdown-selfdefine {
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.user-detail{
  display:block;
  width:375px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.25);
  .detail-box{
    padding: 30px;
    .detail-head{
      display:flex;
      justify-content: flex-end;
      margin-bottom: 24px;
      .iconfont{
        font-size: 20px;
      }
    }
    .detail-img{
      display:flex;
      justify-content: center;
      align-items: center;
      .iconfont{
        font-size: 44px;
      }
      .iconchengren{
        font-size: 86px;
      }
    }
    .detail-name{
      text-align: center;
      .name-warp{
        display: flex;
        justify-content: center;
        align-items: center;
        .name{
          font-size: 22px;
        }
        .iconfont{
          margin-left: 10px;
          color: #2F93FF;
          cursor: pointer;
        }
      }
      .role{
        font-size: 12px;
        color: #222;
        margin: 5px 0 15px 0;
      }
      .department{
        font-size: 12px;
        color: #fff;
        padding: 0 15px;
        line-height: 30px;
        background: #2F93FF;
        border-radius: 15px;
        display: inline-block;
      }
    }
  }
  .current-task{
    background: linear-gradient(rgba(231, 240, 254, 1), rgba(34, 34, 34, 0),rgba(34, 34, 34, 0.05));
    .box-card{
      .card-head{
        padding: 0 30px;
        line-height: 60px;

      }
      .card-item{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        padding: 0 30px;
        cursor: pointer;
        .iconfont{
          font-size: 50px;
          margin-right: 10px;
        }
        .item-content{
          display: flex;
          justify-content: space-between;
          flex-grow: 1;
          align-items: center;
          padding: 10px 0;
          flex-grow: 1;
          .item-title{
            display: flex;
            flex-direction: column;
            span{
              color: #222;
              font-size: 16px;
            }
            .num{
              color: #2F93FF;
              font-size: 14px;
            }
          }
          .item-label{
            min-width: 70px;
            text-align: center;
            line-height: 30px;
            border-radius: 15px;
            color: #fff;
            font-size: 14px;
          }
          .visit{
            background: #E7F0FE;
          }
          .sign{
            background: #05D7B3;
          }
          .order{
            background: #2F93FF;
          }
        }
        .item-line{
          border-bottom: 5px solid #ddd;
        }
      }
    }
  }
}
.notice-detail{
  .notice-current-task{
    background: #fff;
    .card-item-warp{
      padding: 10px;
      max-height: 280px;
      overflow-y:scroll; 
      .card-item{
        padding: 0;
        margin-bottom: 20px;
        .notice-content{
          flex-grow: 1;
          .item-title{
            display: flex;
            flex-direction: column;
            color: #222;
            font-size: 14px;
          }
          .basic-info{
            display: flex;
            justify-content: flex-end;
            padding:5px 0;
            span{
              color: #222;
              font-size: 16px;
            }
            .num{
              color: #2F93FF;
              font-size: 14px;
            }
            .item-label{
              font-size: 14px;
              color: #98A9BC;
            }
          }
        }
        .item-line{
          border-bottom: 5px solid #ddd;
        }
      }
    }
  }
  .handle{
    display: flex;
    justify-content: center;
    line-height: 52px;
    left: 1361px;
    box-shadow: 0px -1px 7px 0px rgba(47, 147, 255, 0.14);
    span{
      display: inline-block;
      width:110px;
      text-align: center;
      color: #98A9BC;
      font-size: 14px;
    }
  }
}
.msg-box{
  .msg-top{
    display: flex;
    justify-content: space-between;
  }
}
.edit-password{
  .code-warp{
    display: flex;
    justify-content: space-between;
    width: 260px;
  }
}
</style>
<style lang="less">
.user-dropdown-detail{
  padding:0;
  border-radius:8px;
  // overflow: hidden;
}
.card-item-warp{
  .el-card__body{
    padding:0 20px;
  }
}
.edit-password{
  input,.searchForm select {width: 260px;}
  .code{
    width:160px;
    input,.searchForm select {width: 160px;}
  }
}
.nav-row{
  .el-menu.el-menu--horizontal{
    border:none;
    .el-menu-item{
      height: 50px;
      line-height:50px;
    }
  }
}
</style>
