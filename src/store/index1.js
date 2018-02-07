import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      count: 0,
      audioPath: ""
    },
    getters: {
      getAudioPath (state) {
        return state.audioPath
      }
    },
    mutations: {
      increment (state,data) {
         state.count +=data
      },
      changeAudioPath (state,path) {

      }
    },
    actions: {
      /* 方法1 */
      // increment(context) {
      //   context.commit("increment",5);
      // }
      /* 方法2（常用） */
      // increment({commit}) {
      //   commit("increment",5);
      // },
      /* 执行异步操作 */
      incrementAsync({commit}) {
        setTimeout(()=>{
          commit("increment",5)
        },1000)
      }
    }
  })