import {computed} from 'vue'
import {useStore} from 'vuex'
import type {StateType} from '@/types'
import useConfig from '@/composables/useConfig'
import type {GoodsType} from '@/types/goods'
import type {GoodsConfigType, ExchangeConfig, ShopConfig} from '@/types/config'
import _ from 'lodash'
import dayjs from 'dayjs';

export default function useGoods() {
  const store = useStore<StateType>()
  const isLoading = computed(() => store.state.goods.isLoading)
  const hiZanBuyTimes = computed(() => store.state.goods.hiZanBuyTimes)
  const hiZanAllTimes = computed(() => store.state.goods.hiZanAllTimes)
  const refreshTimeStr = computed(() => store.state.goods.refreshTimeStr)

  const isLimitTimes = computed(() => hiZanAllTimes.value && hiZanBuyTimes.value && (hiZanBuyTimes.value === hiZanAllTimes.value))
  
  const {getGoodsConfig, getExchangeConfig, getShopConfig} = useConfig()
  function formatTime(time: number) {
    return dayjs(time*1000).format('YYYY-MM-DD HH:mm:ss')
  }
  async function getCurrentBackpackList() {
    let result = []

    const config = getGoodsConfig()
    const list = await store.dispatch('goods/getBackpackList')
    const backpackKey = [
      'id', 
      'describe', 
      'templateId', 
      'extraData', // 剩余时间
      'name', 
      'resourceName', 
      'resourcePath', 
      'showBag', 
      'expiredTime', 
      'story', 
      'count',
      'picture',
    ]

    result = list.map((item: GoodsType) => {
      const filter = config.find((v: GoodsConfigType) => v.id.toString() === item.templateId?.toString())
      const describe = item.expiredTime ? '有效期至：' + formatTime(item.expiredTime) : filter.describe
      const picture = filter.resourcePath + filter.resourceName
      const val = {...filter, ...item, describe, picture}
      return  _.pick(val, backpackKey)
    }).filter((item: GoodsType) => item.showBag)
    console.log('result', result);
    
    return result
  }
  async function getCurrentExchangeList() {
    let result: any = []
    
    const exchangeConfig = getExchangeConfig()
    const goodsConfig = getGoodsConfig()
    const exchangeList = await store.dispatch('goods/getExchangeList')
    
    result = exchangeConfig.map((item: ExchangeConfig) => {
      const award = goodsConfig.find((v: any) => item.award.toString() === v.id.toString())
      const rest = exchangeList.find((v: any) => item.id.toString() === v.goodId.toString())
      const own = goodsConfig.find((v: any) => item.own.toString() === v.id.toString())
      
      const picture = award.resourcePath + award.resourceName
      const limitText = rest?.limitNum === -1 ? '不限' : rest?.limitNum
      const ownObjKey = ['id', 'name', 'resourceName', 'resourcePath']
      const exchangeKey = [
        'id', 
        'describe',
        'name', 
        'resourceName', 
        'resourcePath', 
        'limitNum', // 剩余数量：后台数据返回的字段，-1表示不限
        'award', // 兑换后获得的物品ID
        'numAward', 
        'numLimit', // 剩余数量：-1表示不限
        'own', // 用于兑换的物品ID
        'numOwn', 
        'ownObj', // 用于兑换的物品的详情，根据own的ID去goods表里搜索
        'surplus', // 是否展示剩余数量
        'endTime', // 后台返回的结束时间 时间戳
        'endDate', // 自定义转化的文案
        'picture', // 商品图片
        'limitText', // 剩余 显示的文案
        'goods', // 兑换商品的id
        'exchangeTimes', // 限购的次数
        'useTimes', // 用户的使用次数
        'story', //描述
        'order', // 排序
      ]
      const ownObj = _.pick(own, ownObjKey)
      ownObj['numOwn'] = item.numOwn
      ownObj['picture'] = ownObj.resourcePath+ownObj.resourceName
      ownObj['name'] = ownObj.id.toString() === '6001' ? 'x'+ownObj.numOwn : ownObj.name
      
      const val = {
        ...award,
        ...rest,
        ...item,
        name: `${award.name}${item.numAward > 1 ? ' x'+item.numAward : ''}`,
        ownObj: {...ownObj},
        endDate: rest?.endTime ? `有效期至：${rest.endTime}` : award.describe,
        picture,
        limitText,
        goods: item.award,
        useTimes: 0,
      }
      
      return _.pick(val, exchangeKey)
    }).sort((a: ExchangeConfig, b: ExchangeConfig)=> a.order-b.order)
    console.log('result', result);
    
    return result
  }
  async function getCurrentHiZuanList() {
    let result: any = []
    const shopConfig = getShopConfig()
    console.log('shopConfig', shopConfig);
    
    const goodsConfig = getGoodsConfig()
    console.log('goodsConfig', goodsConfig);
    
    const hiZuanList = await store.dispatch('goods/getHiZuanList')
    console.log('hiZuanList', hiZuanList);
    
    const HiZuanKey = [
      'id', 
      'describe',
      'name', 
      'resourceName', 
      'resourcePath', 
      'count',
      'needValue',
      'sort',
      'limitNum', // 剩余数量：后台数据返回的字段，-1表示不限
      'surplus', // 是否展示剩余数量
      'endTime', // 后台返回的结束时间 时间戳
      'endDate', // 自定义转化的文案
      'picture', // 商品图片
      'limitText', // 剩余 显示的文案
      'goods', // 兑换商品的id
      'exchangeTimes', // 限购的次数
      'useTimes', // 用户的使用次数
      'story', //描述
      'order', // 排序
    ]
    
    result = shopConfig.map((item: ShopConfig) => {
      const filter = goodsConfig.find((v: any) => item.goods.toString() === v.id.toString())
      console.log('filter', filter);
      
      const rest = hiZuanList.find((v: any) => item.id.toString() === v.goodId.toString())
      console.log('rest', rest);
      
      const picture = filter.resourcePath + filter.resourceName
      console.log('picture', picture);
      
      const limitText = rest.limitNum === -1 ? '不限' : rest.limitNum
      console.log('limitText', limitText);
      
      
      const val = {
        ...filter,
        ...rest,
        ...item,
        endDate: rest?.endTime ? `有效期至：${rest.endTime}` : filter.describe,
        picture,
        limitText,
        useTimes: 0,
      }
      console.log(11111, _.pick(val, HiZuanKey));
      
      return _.pick(val, HiZuanKey)
    }).sort((a: ShopConfig, b: ShopConfig)=> a.order-b.order)
    console.log('result', result);
    
    return result
  }
  async function buyGoods(params: Object) {
    return await store.dispatch('goods/buyGoods', params)
  }
  async function queryBuyState(params: Object) {
    return await store.dispatch('goods/queryBuyState', params)
  }
  return {isLoading, getCurrentBackpackList, getCurrentHiZuanList, getCurrentExchangeList, buyGoods, queryBuyState, hiZanBuyTimes, hiZanAllTimes, isLimitTimes, refreshTimeStr}
}
