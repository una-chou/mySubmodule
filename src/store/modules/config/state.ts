import {StateType} from '@/types'
import {Module} from 'vuex'

const state = {
  popupConfig: [],
  tipsConfig: [],
  scattered1Config: {},
}
type ConfigStateType = typeof state

const config: Module<ConfigStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {ConfigStateType, state}
export default config
