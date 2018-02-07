import VueRouter from "vue-router"
import index from "../components/index.vue"
import list from "../components/list.vue"
import datastore from "../views/datastore/dataStore.vue"
import media from "../views/audio/Audio.vue"
import slot from "../views/slot/Slot.vue"
import treechart from "../views/charts/treeChart.vue"
import progressbar from "../views/progressbar/ProgressBar.vue"
import element from "../views/element/ElementUi.vue"
import paginator from "../views/paginator/Paginator.vue"
import wavesurfer from "../views/audio/waveSurfer.vue"
export default new VueRouter({
    routes: [
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
    ]
})

