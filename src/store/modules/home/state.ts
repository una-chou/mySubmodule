/**
 * @Author: Ali (Ali@gotin.online)
 * @Date:   2022-08-09 10:34:33
 */
import {StateType} from '@/types'
import {Module} from 'vuex'

const state = {
  diamond: 0,
  isCameraActive: false
}
type HomeStateType = typeof state

const home: Module<HomeStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {HomeStateType, state}
export default home

