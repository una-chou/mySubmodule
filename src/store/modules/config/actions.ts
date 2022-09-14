import ConfigService from '@/services/config'
import {setStoreState} from '../../utils'
const configActions = {
  async getGoodsConfig(): Promise<any> {
    try {
      let goodsConfig = await ConfigService.getGoodsConfig()
      setStoreState('config', 'goodsConfig', goodsConfig)
      console.log('goodsConfig', goodsConfig);
      
      return goodsConfig
    } catch (error: any) {
      console.log(error)
      throw error
    }
  },
}

type ConfigActionsType = typeof configActions

export {ConfigActionsType}
export default configActions
