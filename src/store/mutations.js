import * as types from './mutation-types'

const mutations = {
  [types.RES_DATA](state, data) {
    state.resdata = data
  },
  [types.AUDIO_PATH](state, data) {
    state.audioPath = data
  },
  [types.AUDIO_PATHLIST](state, data) {
    state.audioPathList = data
  }
}

export default mutations