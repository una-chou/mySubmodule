import HomeService from '@/services/home'
import {StateType} from '@/types/index'
import type {HomeConfig} from '@/types/config'
import { find, remove } from 'lodash'
import {setStoreState} from '../../utils'

const homeActions = {
  // 修改新手状态
  newcomerEdit(context: StateType): any {
    try {
      HomeService.newcomerEdit()
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // 获取主界面列表
  async getIndexList(context: StateType, homeList: Array<HomeConfig>): Promise<any> {
    try {
      const res = await HomeService.getIndexList()
      const arr: any = []
      res.forEach((resItem: any, resIndex: number) => {
        const res = find(homeList, (item: HomeConfig) => { return item.id == resItem.id })
        if (res.display) {
          arr[res.order] = {
            id: resItem.id,
            icon: res.resourcePath + res.resourceName,
            showPoint: resItem.showPoint
          }
        }
      })
      remove(arr, (item: any) => !item)
      return arr
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // 获取钻石数量
  async getDiamond(context: StateType): Promise<any> {
    try {
      const res = await HomeService.getDiamond()
      if (res?.diamond) {
        setStoreState('home', 'diamond', res.diamond)
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // 广告点击收集
  getAD(context: StateType, npcId: number | string) {
    try {
      HomeService.getAD({id: npcId})
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  setCameraActive(context: StateType, isActive: boolean) {
    setStoreState('home', 'isCameraActive', isActive)
  }
}

type HomeActionsType = typeof homeActions

export {HomeActionsType}
export default homeActions
