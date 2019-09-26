<template>
  <el-select
    v-model="selectDate"
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
</template>

<script>
export default {
  props:{
    selectDate:{
      type:Array,
      default:()=>{
        return []
      }
    },
    options:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data (){
    return {
      searchType:'',
      showOptions:[]
    }
  },
  methods:{
    handleCheckedAll(v){
      if(v){
        this.searchForm.types = this.options.map(i=>{return i.value})
      }else{
        this.searchForm.types = []
      }
    },
    handleCheckedTypesChange(v){
      console.log(v)
    },
    handleSearch(queryString){
      if(queryString&&queryString!==''){
        this.showOptions = this.options.filter(this.createFilter(queryString,'label'))
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

<style>

</style>