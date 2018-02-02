import VueRouter from "vue-router"
import index from "../components/index.vue"
import list from "../components/list.vue"
import datastore from "../views/datastore/dataStore.vue"
import media from "../views/audio/Audio.vue"
import slot from "../views/slot/Slot.vue"
import treechart from "../views/charts/treeChart.vue"
import progressbar from "../views/progressbar/ProgressBar.vue"
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
        }
    ]
})

