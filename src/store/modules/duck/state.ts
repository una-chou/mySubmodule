import {StateType} from '@/types'
// import type {UserType} from '@/types/user'
import {Module} from 'vuex'

const state = {
  duckInfo: {
    ducks: [],
    duckFood: 0,
  },
  ducks: [],
}
type duckStateType = typeof state

const duck: Module<duckStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {duckStateType, state}
export default duck
