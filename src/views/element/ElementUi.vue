<template>
  <div class="wrapper">
      <!-- v-loading="loading" -->
    <!-- <div id="main" class="table_content" style="overflow: auto;">
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
    </div> -->

    <!-- <datetimepicker></datetimepicker> -->


    <!-- 横向导航栏 -->
    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
    </el-menu> -->
    <!-- <div class="line"></div> -->
    <!-- <el-menu
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
    </el-menu> -->

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
  </div>
  -->



    <!-- 树形结构 -->
    <!-- <el-tree
      :data="data5"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree> -->

    <!-- input复合框 -->
    <!-- <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option v-for="(item,index) in selection" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click.stop="searchHandler"></el-button>
      </el-input>
    </div> -->


    <!-- 分页 -->
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="listId"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="calledNo"
        label="地址">
      </el-table-column>
    </el-table>
    <!--  -->
      <!-- :page-size="100" -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import datetimepicker from "../../components/DateTimePicker.vue"
  let id = 1000;
export default {
  // data() {
  //   return {};
  // },

  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      currentPage: 1,
      selection: ["a","b","v"],
      loading: true,
      tableData: [],
      totalCount: 0,
      paginationData: [],
      page_index: 1,
      page_size: 10,
      // tableData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄"
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄"
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄"
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1516 弄"
      //   }
      // ],
      tabs: ["标题一", "标题二", "标题三"],
      tabContents: ["内容一", "内容二", "内容三"],
      num: 1,
      /* datetimepicker */
      value6: "",
      /* input复合框 */
      input5: '',
      select: ''
    };
  },
  components: {
    datetimepicker
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page_index = val;
      this.loadData();
      // console.log()
    },
    loadData() {
      axios({url: "http://localhost:10001/api/getpaginatorlist"}).then(res=>{
        console.log(res.data.result)
        this.paginationData = res.data.result;
        this.totalCount = res.data.result.length;
        let page_size = this.page_size;
        this.tableData = this.paginationData.splice((this.page_index - 1)*page_size, page_size);
      })
    },
    searchHandler() {
      console.log(this.select)
      console.log(this.input5)
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
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
    this.loadData();
    
    return;
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
      url: "http://localhost:10001/api/geteletestlist"
    }).then(res => {
      console.log(res.data.result);
      this.tableData = res.data.result;
    });
  }
};
</script>
<style lang="less" scoped>
// @import url("//unpkg.com/element-ui@2.4.0/lib/theme-chalk/index.css");
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
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

