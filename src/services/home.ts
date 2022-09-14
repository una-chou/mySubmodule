import ApiClient from '@/utils/api-client'
export default {
  // 获取home功能列表
  getIndexList(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getFunctionList`)
  },
  // 获取Hi钻
  getDiamond(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/getDiamond`)
  },
  // 广告点击
  getAD(param: any): any {
    return ApiClient.post(`${(window as any).NANJING_URL}/nj/ad`, param)
  },
  // 编辑是否是新人
  newcomerEdit(): any {
    return ApiClient.get(`${(window as any).NANJING_URL}/nj/setNewPlayer`)
  },
}
