import ApiClient from '@/utils/api-client'
export default {
  create(data: any): any {
    return ApiClient.post('/auth', data)
  },
  // 获取微信授权
  getAuthSns(param: any): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/user/auth/sns/get_wechat_config`, param)
  },
}
