import ShareService from '@/services/share'
import {setStoreState} from '../../utils'
import useConfig from '@/composables/useConfig'
const {getGoodsConfig} = useConfig()
import dayjs from 'dayjs'

const shareActions = {
  // 点击分享按钮后获取的信息（获取当前userid与邀请列表）
  async getSharePageInfos(): Promise<any> {
    try {
      let shareInfo: any = null
      shareInfo = await ShareService.getSharePageInfos()
      shareInfo.rewards = shareInfo.rewards.map((val: any) => {
        val.timeStr = dayjs(val.time * 1000).format('YYYY-MM-DD HH:mm:ss')
        return val
      })
      const goods = getGoodsConfig()
      // shareInfo = {
      //   playerId: 111,
      //   rewards: [
      //     {
      //       recordId: 11,
      //       name: '李安',
      //       time: 1659496724,
      //       timeStr: '2022-07-09',
      //       goodId: '6001',
      //       number: '10',
      //     },
      //     {
      //       recordId: 112,
      //       name: '李安2',
      //       time: 1659496721,
      //       timeStr: '2022-07-09',
      //       goodId: '6001',
      //       number: '10',
      //     },
      //   ],
      // }
      goods.map((value: {id: any; resourcePath: any; resourceName: any}) => {
        shareInfo.rewards.map((val: {goodId: any; img: any}) => {
          if (val.goodId == value.id) {
            val.img = value.resourcePath + value.resourceName
          }
        })
      })
      // shareInfo = {
      //   playerId: 111,
      //   rewards: [],
      // }
      setStoreState('share', 'shareInfo', shareInfo)
      return shareInfo
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },

  // 领取邀请成功奖励（领取五鸭苗）
  async getShareReward(content: any, id: string): Promise<any> {
    try {
      let data: any = null
      // data = {
      //   code: 0,
      //   data: 0,
      //   message: 'success',
      // }
      data = await ShareService.getShareReward(id)
      return data
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },

  // 通知分享成功 （触发任务系统）
  async noticeShareSuccess(): Promise<any> {
    try {
      let data: any = null
      data = await ShareService.noticeShareSuccess()
      return data
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
}

type shareActionsType = typeof shareActions

export {shareActionsType}
export default shareActions
