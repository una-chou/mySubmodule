import ApiClient from '@/utils/api-client'
export default {
  // 点击主界面分享按钮后获取的信息（获取当前playerid与邀请列表）
  getSharePageInfos(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getSharePageInfos`)
  },

  // 领取邀请成功奖励（领取250砖石）
  getShareReward(id: string): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/getShareReward`, {rewardId: id})
  },

  // 通知分享成功 （触发任务系统）
  noticeShareSuccess(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/noticeShareSuccess`)
  },
}
