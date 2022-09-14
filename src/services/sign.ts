import ApiClient from '@/utils/api-client'
export default {
  // 获取签到状态信息
  getDailySignInfo(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getDailySignInfo`)
  },
}
