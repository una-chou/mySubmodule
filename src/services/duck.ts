import ApiClient from '@/utils/api-client'
export default {
  // 获取鸭子详情
  getDuckPageInfos(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getAllDucks`)
  },

  // 喂养鸭子
  feedDuck(params: {id: any; value: any}): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/feedDuck`, params)
  },
  // 获取鸭子
  getDucklings(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getMiniDuck`)
  },
}
