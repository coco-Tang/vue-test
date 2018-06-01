<template>
  <div>
    <el-button-group>
      <el-button type="primary" icon="el-icon-edit" @click="a()">按钮1</el-button>
      <el-button type="primary" icon="el-icon-share" @click="b()">按钮2</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="c()">按钮3</el-button>
    </el-button-group>
    <base-dialog :dialogVisible="dialogShow" @close="close" :dialogData="chartData" :dialogTitle="chartTitle"></base-dialog>
  </div>
</template>
<script>
import BaseDialog from "../../components/BaseDialog.vue"
export default {
  data() {
    return {
      dialogShow: false,
      chartData:[],
      chartTitle: "",
    }
  },
  components: {
    'base-dialog': BaseDialog
  },
  methods: {
    close() {
      this.dialogShow = false;
    },
    float2chart() {
      this.dialogShow = true;
    },
    a() {
      this.float2chart();
      this.chartTitle = "a"
      this.chartData = [1,2,3];
    },
    b() {
      this.float2chart();
      this.chartTitle = "b"
      this.chartData = [4,5,6];
    },
    c() {
      this.float2chart();
      this.chartTitle = "c"
      this.chartData = [7,8,9];
    },
  }
}
</script>

