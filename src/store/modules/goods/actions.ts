import GoodsService from '@/services/goods'
import {setStoreState} from '../../utils'
import {ActionContext} from 'vuex'
import { StateType } from '@/types'
type goodsContext = ActionContext<StateType['goods'], StateType>

const goodsActions = {
  async getBackpackList(): Promise<any> {
    try {
      let backpackList: any = null
      backpackList = await GoodsService.getBackpackList()
      setStoreState('goods', 'backpackList', backpackList.list)
      return backpackList.list
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async getHiZuanList(): Promise<any> {
    try {
      let hizuanData: any = null
      hizuanData = await GoodsService.getExchangeList({shopType: 1})
      console.log('hizuanData', hizuanData);
      
      setStoreState('goods', 'hizuanList', hizuanData.goods)
      setStoreState('goods', 'hiZanBuyTimes', hizuanData.buyTime)
      setStoreState('goods', 'hiZanAllTimes', hizuanData.allTimes)
      setStoreState('goods', 'refreshTimeStr', hizuanData.refreshTimeStr)
      return hizuanData.goods
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async getExchangeList(): Promise<any> {
    try {
      let exchangeList: any = null
      exchangeList = await GoodsService.getExchangeList({shopType: 2})
      setStoreState('goods', 'exchangeList', exchangeList.goods)
      return exchangeList.goods
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async buyGoods(context: goodsContext, params: Object): Promise<any> {
    try {
      const res = await GoodsService.buyGoods(params)
      console.log('res', res);
      return res
    } catch(error: any) {
      console.log(error)
      throw error
      
    }
  },
  async queryBuyState(context: StateType, params: Object): Promise<any> {
    try {
      const res = await GoodsService.queryBuyState(params)
      console.log('res-queryBuyState', res);
      
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  },

}

type GoodsActionsType = typeof goodsActions

export {GoodsActionsType}
export default goodsActions
