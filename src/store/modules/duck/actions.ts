import DuckService from '@/services/duck'
import {setStoreState} from '../../utils'
import useConfig from '@/composables/useConfig'

const {getGoodsConfig} = useConfig()

const duckAcation = {
  // 获取鸭子列表与鸭粮
  async getDuckPageInfos(): Promise<any> {
    try {
      let duckInfo: any = null
      duckInfo = await DuckService.getDuckPageInfos()
      const goodsConfig = getGoodsConfig()
      // duckInfo = {
      //   duckFood: 600,
      //   ducks: [
      //     {
      //       age: 30,
      //       cfgid: 6003,
      //       id: '3c90001_62f257fb_6_1',
      //       time: 1659962951,
      //     },

      //     {
      //       age: 0,
      //       cfgid: 6003,
      //       id: '3c90001_62f257fb_6_2',
      //       time: 1659962951,
      //     },
      //   ],
      // }
      // duckInfo = {
      //   duckFood: 600,
      //   ducks: []
      // }
      const arr = []
      duckInfo.ducks.map((value: any) => {
        goodsConfig.map((val: any) => {
          if (val.id == value.cfgid) {
            const obj = Object.assign({}, value, {img: val.path})
            arr.push(obj)
            value.img = val.resourcePath + val.resourceName
          }
        })
      })
      setStoreState('duck', 'duckInfo', duckInfo)
      setStoreState('duck', 'ducks', duckInfo.ducks)
      return duckInfo
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },

  // 更新鸭粮
  async riseDuck(context: any, params: any): Promise<any> {
    try {
      let data: any = null

      data = await DuckService.feedDuck(params)

      // 成功处理逻辑 替换当前鸭子
      if (data.code == 0 || data.code == 20004) {
        const ducks = [...context.state.duckInfo.ducks]
        const goodsConfig = getGoodsConfig()

        // 设置对应img图片
        goodsConfig.map((val: any) => {
          if (val.id == data.duck.cfgid) {
            data.duck = Object.assign({}, data.duck, {img: val.resourcePath + val.resourceName})
          }
        })

        ducks[params.index] = data.duck

        const duckInfo = Object.assign({}, context.state.duckInfo, {ducks})
        duckInfo.duckFood = data.duckFood
        setStoreState('duck', 'duckInfo', duckInfo)
        setStoreState('duck', 'ducks', ducks)
      }
      return data
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
  async getDucklings(context: any, params: any): Promise<any> {
    try {
      const res = await DuckService.getDucklings()
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

type duckActionsType = typeof duckAcation

export {duckActionsType}
export default duckAcation
