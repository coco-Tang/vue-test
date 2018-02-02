import Vue from "vue"

import App from "./App.vue"

import VueRouter from "vue-router"

//使用Vue.use安装 VueRouter插件
Vue.use(VueRouter);

import router from "./routes/router.js"
import store from "./store"
import VueProgressBar from 'vue-progressbar'

const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false
  }
  
  Vue.use(VueProgressBar, options)



var vm = new Vue({
    el: "#app",
    render(createElement){
        return createElement(App);
    },
    router,
    store
})
vm.$mount("#app")