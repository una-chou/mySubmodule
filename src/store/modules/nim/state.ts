/**
 * @Author: yang_han (yang_han@gotin.online)
 * @Date:   2022-02-16 02:48:51
 */
import {StateType} from '@/types'
import {Module} from 'vuex'

const state = {
  loading: true,
  chatLoading: true,
  currentTo: '',
  connectStatus: 'init', // init connected break
  mineInfo: {},
  chatSessions: [],
  originalMsgs: {},
  users: {},
}
type NimStateType = typeof state

const nim: Module<NimStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {NimStateType, state}
export default nim
