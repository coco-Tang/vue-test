<template>
  <div>
    这是首页
    <a href="javascript:;" @click="logout">退出</a>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
  methods: {
    logout() {
      this.$confirm("此操作将注销用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
}
</script>

<style>

</style>

