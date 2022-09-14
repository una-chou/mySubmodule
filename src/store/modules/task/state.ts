import {StateType} from '@/types'
import {Module} from 'vuex'

const state = {
  data: [],
}
type TaskStateType = typeof state

const task: Module<TaskStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {TaskStateType, state}
export default task
