<template>
<div>
  <ve-histogram :data="chartData"></ve-histogram>
  <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
</div>
  
</template>
<script>
import {getRowArr} from "./main.js"


export default {
  data() {
    this.chartSettings = {
      showLine: ['访问用户']
    }
    let arr = getRowArr
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        // rows: getRowArr()
      }
    }
  },
  created () {
    // console.log(getRowArr())
  },
  mounted() {
    this.$worker.run((arg) => {
      return `Hello, ${arg}!`
    }, ['World1'])
    .then(result => {
      console.log(result)
    })
    .catch(e => {
      console.error(e)
    })
  }
}
</script>

