<template>
  <div class="wrapper">
      <!-- v-loading="loading" -->
    <div id="main" class="table_content" style="overflow: auto;">
      <el-table 
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData" 
      border 
      :row-class-name="tableRowClassName"
      style="width: 100%">
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
    </div>

    <datetimepicker></datetimepicker>


    <!-- 横向导航栏 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>
<div class="line"></div>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>

  <!-- tab栏实现 -->
  <!-- <ul>
      <li v-for="(item,index) in tabs" :key="index"
      :class="{active:index == num}"
        @click="tab(index)">{{item}}</li>
  </ul>
  <div class="tabCon">
      <div 
      v-for='(itemCon,index) in tabContents' :key="index"
      v-show=" index == num">{{itemCon}}</div>
  </div> -->


      <!-- 栅格布局 -->
      <!-- <el-row :gutter="36"> -->

        <!-- <el-col :span="6" class="main__left"> -->
          <!-- 123 -->
          <!-- <sidenav></sidenav> -->
        <!-- </el-col> -->

        <!-- <el-col ref="main__right" :span="18" class="main__right"> -->
          <!-- 345 -->
          <!--<transition name="el-zoom-in-center">-->
            <!-- <router-view class="page_view"></router-view> -->
          <!--</transition>-->
        <!-- </el-col> -->

      <!-- </el-row> -->
  </div>
</template>
<script>
import axios from "axios";
import { Loading } from "element-ui";
import datetimepicker from '../../components/DateTimePicker.vue'
export default {
  data() {
    return {
      loading: true,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tabs: ["标题一", "标题二", "标题三"],
      tabContents: ["内容一", "内容二", "内容三"],
      num: 1,
      /* datetimepicker */
      value6: "",
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  components: {
    datetimepicker
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
    },
    tableRowClassName({row, rowIndex}) {
      console.log(row,rowIndex)
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    axios.interceptors.request.use(config => {
      // config.headers["X-Requested-With"] = "XMLHttpRequest";
      // let loadingInstance = Loading.service({});
      // Loading.service({ fullscreen: false });
      // this.loading = true;
      return config;
    });
    axios.interceptors.response.use(response => {
      // let loadingInstance = Loading.service({});
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        // loadingInstance.close();
      });
      // Loading.close();
      return response;
    });
    axios({
      url: "http://localhost:9000/api/geteletestlist"
    }).then(res => {
      console.log(res.data.result);
      this.tableData = res.data.result;
    });
  }
};
</script>
<style lang="less">
.active {
  color: blue;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.wrapper {
  // height: calc(100vh - 100px);
  height: 90vh;
  // background-color: #000;
  .table_content {
    // height: 10%;
    height: 50%;
    // background-color: red;
  }
}
</style>

