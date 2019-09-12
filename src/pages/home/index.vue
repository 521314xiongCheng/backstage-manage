<template>
  <div class="home-page">
    <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini">
      <el-form-item prop="name">
        <el-select v-model.trim="searchForm.name" placeholder="请选择" @change="search">
          <el-option label="AsinKing美国站" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model.trim="searchForm.type" placeholder="请选择" @change="search">
          <el-option label="CNY" value=""></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="14">
        <el-card>
          <div slot="header" class="card-header">
            <span>店铺统计</span>
            <el-button size="mini" type="text">更多</el-button>
          </div>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content">
                <span class="label">销量（近30天）</span>
                <span>9898</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span class="label">订单量（近30天）</span>
                <span>9898</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span class="label">销售额（近30天）</span>
                <span>9898</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span class="label">广告费（近30天）</span>
                <span>9898</span>
              </div>
            </el-col>
          </el-row>
          <div id="shopCount" style="width:100%;height:347px;"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <div slot="header" class="card-header">
            <span>七日畅销排名</span>
            <el-button size="mini" type="text">更多</el-button>
          </div>
          <el-table 
            :data="tableData"
            size="mini"
            height="400"
            highlight-current-row
            stripe>
              <el-table-column align="center" show-overflow-tooltip width="35">
                <template slot-scope="{$index}">
                  {{$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="商品" align="center" show-overflow-tooltip min-width="120">
                <template slot-scope="{row}">
                  <div class="good-info">
                    <img :src="row.img" width="30" height="30" alt="">
                    {{row.name}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="salesVolume" label="销量" align="center" show-overflow-tooltip min-width="80"> </el-table-column>
              <el-table-column prop="sales" label="销售额" align="center" show-overflow-tooltip min-width="80"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data(){
    return {
      searchForm:{
        name:'',
        type:''
      },
      charts: '',
      opinion:['销量','订单量','销售额','广告费'],
      colors:['#ffde69','#9ec4ff','#9fe6b8','#ffa181'],
      tableData:[
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
        {
          img:'https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_300x300.jpg',
          name:'夏日么么茶',
          salesVolume:83,
          sales:2000
        },
      ]
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.drawPie('shopCount')
    })
  },
  methods:{
    search(){

    },
    drawPie(id){
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        color:this.colors,
        legend: {
          data:this.opinion,
          icon:'rect',
          itemHeight:2,
          top:20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          backgroundColor:'#242d39'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: this.colors[1]
              }
            },
            axisPointer: {
                
            },
            data: ['08-07', '08-12', '08-17', '08-22', '08-27', '09-01']
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            name:'销量',
            type: 'line',
            smooth: true
          },
          {
            data: [1820, 1932, 1901, 1934, 11290, 11330, 11320],
            name:'订单量',
            type: 'line',
            smooth: true
          },
          {
            data: [11820, 11932, 11901, 11934, 111290, 111330, 111320],
            name:'销售额',
            type: 'line',
            smooth: true
          },
          {
            data: [21820, 21932, 21901, 21934, 211290, 211330, 211320],
            name:'广告费',
            type: 'line',
            smooth: true
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card-header{
  display: flex;
  justify-content: space-between;
}
.grid-content{
  text-align: center;
  background: #f2f2f2;
  border-radius: 5px;
  padding: 0 20px;
  font-size: 22px;
  .label{
    font-size: 12px;
  }
}
.good-info{
  display: flex;
  align-items: center;
  img{
    display: block;
    margin: 0 10px;
  }
}
</style>