<template>
  <!-- <div id="app"> -->
      <div class="box">
      <!-- {{msg}} -->
      <!-- <button @click="export2Excel">导出</button> -->
      <router-view></router-view>
      <vue-progress-bar></vue-progress-bar>
      </div>
  <!-- </div> -->
  
</template>

<script>
export default {
	data(){
	return{
			list:[
					{
					name:'韩版设计时尚风衣大',
					number:'MPM00112',
					salePrice:'￥999.00',
					stocknums:3423,
					salesnums:3423,
					sharenums:3423,
			},
			{
					name:'韩版设计时尚风衣大',
					number:'MPM00112',
					salePrice:'￥999.00',
					stocknums:3423,
					salesnums:3423,
					sharenums:3423,
			},
			]
	}
	},
	methods:{

	},
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }
}
</script>

<style>
    .box{
        width: 100%;
        height: 100%;
        background-color: skyblue;
    }
</style>


