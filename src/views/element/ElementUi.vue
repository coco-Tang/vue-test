<template>
  <div class="wrapper">
      <el-table :data="tableData" border style="width: 100%">
    <el-table-column label="日期" width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template scope="scope">
            <span v-bind:class="{active: (scope.row.name === '王小虎')}">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>



  <!-- tab栏实现 -->
  <ul>
      <li v-for="(item,index) in tabs" :key="index"
      :class="{active:index == num}"
        @click="tab(index)">{{item}}</li>
  </ul>
  <div class="tabCon">
      <div 
      v-for='(itemCon,index) in tabContents' :key="index"
      v-show=" index == num">{{itemCon}}</div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      tabs: ["标题一", "标题二","标题三"],
      tabContents: ["内容一", "内容二","内容三"],
      num: 1
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    tab(index) {
        this.num = index;
    }
  },
  created() {
    axios({
      url: "http://localhost:9000/api/geteletestlist"
    }).then(res => {
      console.log(res.data.result);
      this.tableData = res.data.result;
    });
  }
};
</script>
<style>
.active {
  color: blue;
}
</style>

