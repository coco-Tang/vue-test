<template>
  <div class="wrapper">
      这是分页的测试页面
      <el-button class="myBtn" @click="handlePush">推送</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column type="index" label="序号" width="50" prop="listId">
          <template slot-scope="scope">{{ scope.row.index }}</template>
        </el-table-column>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column prop="selectedVoice" label="中标声纹" show-overflow-tooltip></el-table-column>
        <el-table-column prop="transferStatus" label="全文转写"></el-table-column>
        <el-table-column prop="semanticsStaus" label="语义理解"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="lang" label="语种"></el-table-column>
        <el-table-column prop="callNo" label="主叫号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="calledNo" label="被叫号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="pushStatus" label="推送状态"></el-table-column>
        <el-table-column prop="auditionStatus" label="调听状态"></el-table-column>
        <el-table-column prop="operation" label="操作" width="160">
          <template slot-scope="scope">
            <i class="el-icon-download" @click="handleDownLoad(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
        tableData: [],
        currentPage:1,
        pagesize:10,
    }
  },
  methods: {
    handleSizeChange (size) {
        this.pagesize = size;
    },
    handleCurrentChange (currentPage){
        this.currentPage = currentPage;
    },
    loadData() {
      axios({
        url: "http://localhost:9000/api/getpaginatorlist"
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data.result;
      });
    },
    handleSelectionChange(val) {
      
      this.handlePush(val);
    },
    handlePush(selection) {
      console.log(selection)
    },
  },
  created() {
    this.loadData();
  }
}
</script>
<style>

</style>

