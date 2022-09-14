import {StateType} from '@/types'
// import type {UserType} from '@/types/user'
import {Module} from 'vuex'

const state = {
  backpackList: [],
  hizuanList: [],
  exchangeList: [],
  backpackConfig: [],
  hiZuanConfig: [],
  isLoading: false,
  hiZanBuyTimes: 0, // hi钻已兑换次数
  hiZanAllTimes: 0, // hi钻总共的兑换次数
  refreshTimeStr: '', // 批次更新文案
}
type GoodsStateType = typeof state

const goods: Module<GoodsStateType, StateType> = {
  namespaced: true,
  ...state,
}

export {GoodsStateType, state}
export default goods
