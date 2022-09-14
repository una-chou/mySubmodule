import ApiClient from '@/utils/api-client'
export default {
  // 获取抽奖列表
  getLuckyList(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getLuckInfo`)
  },
  // 点击抽奖
  getLuckyReward(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getLuckReward`)
  },
}
