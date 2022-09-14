import SignService from '@/services/sign'
import {setStoreState} from '../../utils'

const shareActions = {
  // 获取签到按钮数据, 获取签到信息
  async getSignPageInfos(): Promise<any> {
    try {
      const signInfo = await SignService.getDailySignInfo()
      setStoreState('sign', 'signInfo', signInfo)
      return signInfo
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
}

type SignStateType = typeof shareActions

export {SignStateType}
export default shareActions
