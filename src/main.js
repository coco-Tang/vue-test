import Vue from "vue"

import App from "./App.vue"

import VueRouter from "vue-router"

//使用Vue.use安装 VueRouter插件
Vue.use(VueRouter);

import router from "./routes/router.js"
import store from "./store"
import VueProgressBar from 'vue-progressbar'

/* -------引入element-ui并使用-------- */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/message-box.css'
Vue.use(ElementUI)

import VCharts from 'v-charts';
Vue.use(VCharts)

import VueWorker from 'vue-worker';
Vue.use(VueWorker);

import {http}  from './utils/api.js'
window.$http = Vue.prototype.$http = http

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
// vm.$mount("#app")