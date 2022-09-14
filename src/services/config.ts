import ApiClient from '@/utils/api-client'
import servicesCache from '@/utils/servicesCache'
const host = `${process.env.VUE_APP_SOURCE_URL}/njyh/config/Client`
const res: any = {}

export default {
  // 从3d的内存中获取到所有表
  getAllConfig(): any {
    ;(window as any).GameEmitter.emit('getConfig', res)
  },
  // 对话表：NPC所有对话内容
  getDialogueConfig(): any {
    return res.config?.dialogue
  },
  // 兑换表：兑换中心
  getExchangeConfig(): any {
    return res.config?.exchange
  },
  // 物品表：背包，以及所有道具的id
  getGoodsConfig(): any {
    return res.config?.goods
  },
  // NPC表：NPC详情和交互相关
  getNPCConfig(): any {
    return res.config?.npc
  },
  // 弹窗表：确认性弹窗相关
  getPopupConfig(): any {
    return res.config?.popUp || servicesCache(ApiClient.get.bind(ApiClient), [`${host}/popUp.json`, {withCredentials: false}])
  },
  // 提示表：toast提示相关
  getTipConfig(): any {
    return res.config?.tips || servicesCache(ApiClient.get.bind(ApiClient), [`${host}/tips.json`, {withCredentials: false}])
  },
  // 商店表：Hi钻中心
  getShopConfig(): any {
    return res.config?.shop
  },
  // 主界面表：主界面
  getHomeConfig(): any {
    return res.config?.home
  },
  // 外观表：个人中心-定制外观
  getAvatarConfig(): any {
    return res.config?.avatar
  },
  // 签到表：签到
  getDiaryConfig(): any {
    return res.config?.diary
  },
  // 任务表：任务
  getTaskConfig(): any {
    return res.config?.task
  },
  // 零散表1：其他独立的零散配置点
  getScattered1Config(): any {
    return res.config?.scattered1
  }
}
