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
<<<<<<< HEAD
  </div>

  <!-- 树形结构 -->
  <el-tree
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
    </el-tree>
=======
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
>>>>>>> e0f431811cb89209db9955cc575261e076c3aa7d
  </div>
</template>
<script>
import axios from "axios";
<<<<<<< HEAD
  let id = 1000;
=======
import { Loading } from "element-ui";
import datetimepicker from '../../components/DateTimePicker.vue'
>>>>>>> e0f431811cb89209db9955cc575261e076c3aa7d
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
<<<<<<< HEAD
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data)),
      tableData: [],
      tabs: ["标题一", "标题二", "标题三"],
      tabContents: ["内容一", "内容二", "内容三"],
      num: 1
=======
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
      value6: ""
>>>>>>> e0f431811cb89209db9955cc575261e076c3aa7d
    };
  },
  components: {
    datetimepicker
  },
  methods: {
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
<<<<<<< HEAD
    }
=======
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
>>>>>>> e0f431811cb89209db9955cc575261e076c3aa7d
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

