<template>
  <el-select
    v-model="types"
    multiple
    collapse-tags
    popper-class="select-diy"
    :placeholder="placeholder">
    <el-input v-model="searchType" class="input-no-border" @input="handleSearch(searchType)" placeholder="搜索内容"></el-input>
    <div class="el-select-dropdown__item">
      <el-checkbox v-model="allCategories" @change="handleCheckedAll">全选</el-checkbox>
    </div>
    <el-option
      v-show="false"
      v-for="(item,index) in options"
      :key="index"
      :label="item.label"
      :value="item.value">
    </el-option>
    <el-checkbox-group v-model="types" @change="handleCheckedTypesChange">
      <div
      class="el-select-dropdown__item"
        v-for="(item,index) in showOptions"
        :key="index">
        <el-checkbox 
          :label="item.value">{{item.label}}</el-checkbox>
      </div>
    </el-checkbox-group>
  </el-select>
</template>

<script>
import {oneOf, deleteOneofArray} from '@/utils/index.js'
export default {
  props:{
    options:{
      type:Array,
      default:()=>{
        return []
      }
    },
    placeholder:{
      type:String,
      default:''
    }
    
  },
  data (){
    return {
      searchType:'',
      allCategories:false,
      showOptions:[],
      types:[]
    }
  },
  watch:{
    types(val){
      this.$emit('input',val)
    }
  },
  mounted(){
    this.showOptions = this.options
  },
  methods:{
    handleCheckedAll(v){
      if(v){
        this.types = this.types.concat(this.showOptions.map(i=>{return i.value}))
      }else{
        let options = this.showOptions.map(i=>{return i.value})
        options.forEach(o=>{
          if(oneOf(o,this.types)){
            deleteOneofArray(o,this.types)
          }
        })
      }
    },
    handleCheckedTypesChange(v){
      console.log(v)
      let options = this.showOptions.map(i=>{return i.value})
      this.allCategories = true
      options.forEach(o=>{
        if(!oneOf(o,this.types)){
          this.allCategories = false
        }
      })
    },
    handleSearch(queryString){
      if(queryString&&queryString!==''){
        this.showOptions = this.options.filter(this.createFilter(queryString,'label'))
        let list = this.showOptions.map(i=>{return i.value})
        this.allCategories = true
        list.forEach(o=>{
          if(!oneOf(o,this.types)){
            this.allCategories = false
          }
        })
      }else{
        this.showOptions = this.options
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

<style lang="less">
.select-diy{
  padding:0 10px;
  .input-no-border{
    input{
      border:none;
      border-bottom: 1px solid blue;
      border-radius: 0;
    }
  }
  .el-select-dropdown__item{
    padding: 0;
  }
}
</style>