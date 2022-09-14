import ApiClient from '@/utils/api-client'

export default {
  auth(): any {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/auth`, {
      app: 'web',
      sdk: 'netease',
    })
  },
  sayHi: (account: string, hash: string) => {
    return ApiClient.post(`${process.env.VUE_APP_GATEWAY_URL}/web/messaging/greeting/add`, {
      user_hash: hash,
      accid: account,
    })
  },
  getUsersByAccids(accids: string[]): any {
  },
}