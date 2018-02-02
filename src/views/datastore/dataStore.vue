<template>
  <div class="container">
      <div>{{count}}</div>
      <!-- 实现映射时使用 -->
      <!-- <button @click="increment1">按钮</button> -->
      <button @click="increment">按钮</button>
  </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    // /* 方法1 */
    // /* 1.引入store中的方法increment */
    // ...mapMutations(["increment"]),
    //   increment1(){
    //       // this.$store.commit("increment",5)
    //       console.log(this.$store)
    //       /* 2.通过this来调用引入的方法 */
    //      this.increment(5)
    //   }
    // /* 方法2 */
    //   // increment(){
    //   //      this.$store.commit("increment",5)
    //   // }


      increment() {
        /* dispatch中触发的方法与store中actions的方法一致 */
        this.$store.dispatch("incrementAsync");
      }
  }
}
</script>
<style>

</style>
