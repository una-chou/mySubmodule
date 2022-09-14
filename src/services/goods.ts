import ApiClient from '@/utils/api-client'
export default {
  // 获取背包列表
  getBackpackList(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getBackpackList`)
  },
  // 获取可兑换列表 (shopType 商店类型，1：Hi钻商店，2：兑换商店)
  getExchangeList(params: object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/queryShopGoods`, params)
  },
  // 兑换 (type 商店类型，1：Hi钻商店，2：兑换商店 / goodId 商品id)
  buyGoods(params: Object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/buyGoods`, params)
  },
  // 请求是否可以购买
  queryBuyState(params: Object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/queryBuyState`, params)
  },
}
