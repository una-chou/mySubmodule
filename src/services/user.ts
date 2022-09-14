import ApiClient from '@/utils/api-client'
export default {
  getUserInfo(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/userInfo`)
  },
  editName(params: object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/reName`, params)
  },
  modifyUserInfo(params: object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/modifyUserInfo`, params)
  },
  // 发送验证码
  sendSmsCode(params: object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/sendSmsCode`, params)
  },
  // 验证手机号和验证码
  checkSmsCode(params: object): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/checkSmsCode`, params)
  },
}
