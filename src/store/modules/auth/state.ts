/**
 * @Author: yang_han (yang_han@gotin.online)
 * @Date:   2021-06-09 07:50:20
 */
import {StateType} from '@/types'
import {Module} from 'vuex'

const state = {
  token: null,
  ifUrl: '',
  isShowLogin: false,
}
type AuthStateType = typeof state

const auth: Module<AuthStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {AuthStateType, state}
export default auth
