import {StateType} from '@/types'
import type {UserType, AvatarType} from '@/types/user'
import {Module} from 'vuex'

const state = {
  user: {} as UserType,
  avatar: {} as AvatarType
}
type UserStateType = typeof state

const user: Module<UserStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {UserStateType, state}
export default user
