import {StateType} from '@/types'
import {Module} from 'vuex'

const state = {
  luckyList: [],
  luckyMaxNum: 0,
  luckyTicket: 0,
}
type LotteryStateType = typeof state

const lottery: Module<LotteryStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {LotteryStateType, state}
export default lottery
