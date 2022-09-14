import {StateType} from '@/types'
// import type {UserType} from '@/types/user'
import {Module} from 'vuex'

const state = {
  signInfo: {
    signCount: 0, //签到次数
    state: 0, //奖励状态，默认0，不弹框，1：弹框
  },

  // signIndex: 0,
  // state: 0,
}
type SignStateType = typeof state

const sign: Module<SignStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {SignStateType, state}
export default sign
