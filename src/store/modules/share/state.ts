import {StateType} from '@/types'
// import type {UserType} from '@/types/user'
import {Module} from 'vuex'

const state = {
  shareInfo: {}
}
type ShareStateType = typeof state

const goods: Module<ShareStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {ShareStateType, state}
export default goods
