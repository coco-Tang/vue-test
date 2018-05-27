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
  </div>
</template>
<script>
import axios from "axios";
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
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data)),
      tableData: [],
      tabs: ["标题一", "标题二", "标题三"],
      tabContents: ["内容一", "内容二", "内容三"],
      num: 1
    };
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

