import VueRouter from "vue-router"
import index from "../components/index.vue"
import list from "../components/list.vue"
import datastore from "../views/datastore/dataStore.vue"
import media from "../views/audio/Audio.vue"
import slot from "../views/slot/Slot.vue"
import treechart from "../views/charts/treeChart.vue"
import mapchart from "../views/charts/mapChart.vue"
import linechart from "../views/charts/LargeAreaBar.vue"
import progressbar from "../views/progressbar/ProgressBar.vue"
import element from "../views/element/ElementUi.vue"
import paginator from "../views/paginator/Paginator.vue"
import wavesurfer from "../views/audio/waveSurfer.vue"
<<<<<<< HEAD
import fileupload from "../views/fileupload/FileUpload.vue"
=======
import home from "../views/navTab/home.vue"
import fileupload from "../views/fileupload/index.vue"

>>>>>>> e0f431811cb89209db9955cc575261e076c3aa7d
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
            path: "/linechart",
            component: linechart
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
<<<<<<< HEAD
            path: "/fileupload",
            component: fileupload
        },
        // {
        //     path: '/achievement',
        //     name: 'achievement',
        //     component: './components/Achievement.vue',
        //     meta: {
        //       progress: {
        //         func: [
        //           {call: 'color', modifier: 'temp', argument: '#ffb000'},
        //           {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        //           {call: 'location', modifier: 'temp', argument: 'top'},
        //           {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        //         ]
        //       }
        //     }
        //   }
=======
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
>>>>>>> e0f431811cb89209db9955cc575261e076c3aa7d
    ]
})

