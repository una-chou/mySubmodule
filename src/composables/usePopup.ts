import type {TipConfig, PopupConfig, GoodsConfigType} from '@/types/config'
import {find, forEach} from 'lodash'
import useConfig from '@/composables/useConfig'

// 3D端跟触发npc对话，会回传一个对话id，拿id去查对话文案
export default function useNPC() {
  const { getTipConfig, getPopupConfig, getGoodsConfig } = useConfig()
  // popId弹窗文案对应的id，replace文案中需要替换为自定义字符串的部分（没有就传[]），goodsId弹窗要显示物品时传的物品id，goodsNum获取了多个物品时传的数量
  async function getPopupDetail(popId: number | string, replace?: Array<string>, goodsId?: number | string, goodsNum?: number) {
    // tip类型的弹窗，就一行文字
    if (popId.toString().startsWith('1')) {
      const tipList = await getTipConfig()
      const res = find(tipList, (item: TipConfig) => { return item.id == popId })
      const arr = res.content.split('$$')
      if (arr.length > 1) {
        replace?.forEach((item, index) => {
          return arr.splice(1 * (index + 1) + index, 0, item);
        })
      }
      return {
        type: 'tips',
        content: arr.join('')
      }
    // 复杂类型的弹窗，标题、图片、描述、按钮
    } else {
      const popList = await getPopupConfig()
      const popRes = find(popList, (item: PopupConfig) => { return item.id == popId })
      const arr = popRes.content.split('$$')
      if (arr.length > 1) {
        replace?.forEach((item, index) => {
          return arr.splice(1 * (index + 1) + index, 0, item);
        })
      }
      const goods: any = {}
      const moreGoods: any = []
      // 卡点的定制弹窗
      if (popRes.type === 4) {
        const goodsList = getGoodsConfig()
        const imageArr = popRes.image.split(',')
        forEach(imageArr, (val: number | string) => {
          const goodsRes = find(goodsList, (item: GoodsConfigType) => {
            return item.id == val
          })
          moreGoods.push(goodsRes.resourcePath + goodsRes.resourceName)
        })
      // 普通的带goods信息的弹窗
      } else if (goodsId) {
        const goodsList = getGoodsConfig()
        const goodsRes = find(goodsList, (item: GoodsConfigType) => {
          return item.id == goodsId
        })
        goods.goodsName = goodsNum ? `${goodsRes.name} x${goodsNum}` : goodsRes.name
        goods.goodsResourcePath = goodsRes.resourcePath + goodsRes.resourceName
      }
      return {
        id: popId,
        type: 'popup',
        title: popRes.title,
        titlePath: popRes.titlePath,
        content: arr.join(''),
        button1: popRes.button1,
        button2: popRes.button2,
        uiType: popRes.type,
        moreGoods: moreGoods,
        ...goods
      }
    }
  }

  return {
    getPopupDetail,
  }
}
