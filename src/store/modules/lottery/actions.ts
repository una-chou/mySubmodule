import LotteryService from '@/services/lottery'
import {setStoreState} from '../../utils'
const lotteryActions = {
  async getLuckyList(): Promise<any> {
    try {
      let luckData = await LotteryService.getLuckyList()
      setStoreState('lottery', 'luckyList', luckData.itemlist)
      setStoreState('lottery', 'luckyMaxNum', luckData.maxNum)
      setStoreState('lottery', 'luckyTicket', luckData.tick)
      return luckData
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async getLuckyReward(): Promise<any> {
    try {
      const res = await LotteryService.getLuckyReward()
      return res
    } catch(error: any) {
      console.log(error)
      throw error
    }
  }
}

type LotteryActionsType = typeof lotteryActions

export {LotteryActionsType}
export default lotteryActions
