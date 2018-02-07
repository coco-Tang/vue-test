import * as types from './mutation-types'

export const RES_DATA = function ({commit}, data) {
  commit(types.RES_DATA, data)
}
export const AUDIO_PATH = function ({commit}, data) {
  commit(types.AUDIO_PATH, data)
}
export const AUDIO_PATHLIST = function ({commit}, data) {
  commit(types.AUDIO_PATHLIST, data)
}