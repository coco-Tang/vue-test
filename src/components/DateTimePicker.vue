<template>
  <div class="datetimerpicker">
      <div class="block">
        <span class="demonstration">起始日期时刻为 12:00:00</span>
        <el-date-picker
          v-model="value6"
          @change="getTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>
    </div>  
</template>
<script>
export default {
  data() {
    return {
      value6: ''
    }
  },
  methods: {
    getTime(date) {
      // this.time = date;
      console.log(date);
    }
  }
}
</script>

