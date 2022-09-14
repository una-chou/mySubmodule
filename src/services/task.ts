import ApiClient from '@/utils/api-client'
export default {
  // 获取任务列表
  getTaskList(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getTaskList`)
  },
  // 领取任务
  getTaskReward(params: object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/getTaskReward`, params)
  },
}
