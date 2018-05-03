import VueRouter from "vue-router"
import index from "../components/index.vue"
import list from "../components/list.vue"
import datastore from "../views/datastore/dataStore.vue"
import media from "../views/audio/Audio.vue"
import slot from "../views/slot/Slot.vue"
import treechart from "../views/charts/treeChart.vue"
import mapchart from "../views/charts/mapChart.vue"
import progressbar from "../views/progressbar/ProgressBar.vue"
import element from "../views/element/ElementUi.vue"
import paginator from "../views/paginator/Paginator.vue"
import wavesurfer from "../views/audio/waveSurfer.vue"
import home from "../views/navTab/home.vue"
import fileupload from "../views/fileupload/index.vue"

export default new VueRouter({
    routes: [
        {
            path: "/fileupload",
            component: fileupload
        },
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/index",
            component: index
        },
        {
            path: "/list",
            component: list
        },
        {
            path: "/datastore",
            component: datastore
        },
        {
            path: "/audio",
            component: media
        },
        {
            path: "/wavesurfer",
            component: wavesurfer
        },
        {
            path: "/slot",
            component: slot
        },
        {
            path: "/treechart",
            component: treechart
        },
        {
            path: "/mapchart",
            component: mapchart
        },
        {
            path: "/progress",
            component: progressbar
        },
        {
            path: "/element",
            component: element
        },
        {
            path: "/paginator",
            component: paginator
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
               is_nav_root: true,
               nav: {
                  'home': {
                    //   icon: 'side_nav_base',
                      name: '主页',
                      path: '/home/index'
                  }
               } 
            }
        }
    ]
})

