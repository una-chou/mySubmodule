import ConfigService from '@/services/config'
// todo 性能考量
export default function useGoods() {
  function getAllConfig() {
    return ConfigService.getAllConfig()
  }
  function getDialogueConfig() {
    return ConfigService.getDialogueConfig()
  }
  // 兑换表：兑换中心
  function getExchangeConfig() {
    return ConfigService.getExchangeConfig()
  }
  // 物品表：背包，以及所有道具的id
  function getGoodsConfig() {
    return ConfigService.getGoodsConfig()
  }
  // NPC表：NPC详情和交互相关
  function getNPCConfig() {
    return ConfigService.getNPCConfig()
  }
  // 弹窗表：确认性弹窗相关
  function getPopupConfig() {
    return ConfigService.getPopupConfig()
  }
  // 提示表：toast提示相关
  function getTipConfig() {
    return ConfigService.getTipConfig()
  }
  // 商店表：Hi钻中心
  function getShopConfig() {
    return ConfigService.getShopConfig()
  }
  // 主界面表：主界面
  function getHomeConfig() {
    return ConfigService.getHomeConfig()
  }
  // 外观表：个人中心-定制外观
  function getAvatarConfig() {
    return ConfigService.getAvatarConfig()
  }
  // 签到表：签到
  function getDiaryConfig() {
    return ConfigService.getDiaryConfig()
  }
  // 任务表：任务
  function getTaskConfig() {
    return ConfigService.getTaskConfig()
  }
  // 零散表1：其他独立的零散配置点
  function getScattered1Config() {
    return ConfigService.getScattered1Config()
  }
  return {
    getDialogueConfig,
    getExchangeConfig,
    getGoodsConfig,
    getNPCConfig,
    getPopupConfig,
    getTipConfig,
    getShopConfig,
    getHomeConfig,
    getAvatarConfig,
    getDiaryConfig,
    getTaskConfig,
    getScattered1Config,
    getAllConfig
  }
}
