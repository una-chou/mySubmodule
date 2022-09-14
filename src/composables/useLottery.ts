import useConfig from '@/composables/useConfig'
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import type {StateType} from '@/types'
import _ from 'lodash'

export default function useLottery() {
  const store = useStore<StateType>()
  const luckyMaxNum = computed(() => store.state.lottery.luckyMaxNum)
  const luckyTicket = computed(() => store.state.lottery.luckyTicket)
  let loading = ref(true)

  const {getGoodsConfig} = useConfig()

  async function getCurrentLuckyList() {
    let result: any = []

    const goods = getGoodsConfig()
    const listData = await store.dispatch('lottery/getLuckyList')
    let list = listData.itemlist

    list = list.map(async (item: any) => {
      const filter = goods.find((v: any) => v.id.toString() === item.id.toString())
      let url: any = ''
      try {
        url = await getBase64Image(filter.luckPath + filter.luckName)
      } catch(error) {
        console.log(error);
      }
      item['imgUrl'] = url
      return item
    })
    list = await Promise.all(list);
    
    const position = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 1, y: 2}, {x: 0, y: 2}, {x: 0, y: 1}]
    const commonObj = {borderRadius:'8px', width: '50%',height: '50%'}
    const commonFont = {fontSize:'10px',fontColor:'#A32A3B',fontWeight:'600',lineHeight:'12px',wordWrap: false}
    const cellImg = {
      src: require('@/assets/images/lottery/bg.png'),
      width: '95%',
      height: '95%',
      activeSrc: require('@/assets/images/lottery/bg-active.png'),
    }

    list.forEach(async (item: any, index: number) => {
      const filter = goods.find((v: any) => v.id.toString() === item.id.toString())
      const awardsNum = item.rewardNum
      const endSpace = '                  '
      const frontSpace = awardsNum < 10 ? '   ' : awardsNum < 100 ? '  ' : awardsNum < 1000 ? ' ' : ''
      const numText = awardsNum > 1 ? frontSpace + 'x'+awardsNum+endSpace: ''
      const val = {
        ...commonObj,
        ...position[index],
        imgs: [cellImg, {
          src:  item.imgUrl,
          width: '50%',
          top: filter.id.toString() === '6024' ? '10px' : filter.id.toString() === '6001' ? '12px' : '14px',
        }, {
          src: awardsNum > 1 ? require('@/assets/images/lottery/nums.png') : require('@/assets/images/lottery/no-nums.png'),
          width: '95%',
          top: '0px'
        }],
        fonts: [{
          ...commonFont,
          text: filter.name.length > 7 ? filter.name.replace(filter.name.substring(0,7), filter.name.substring(0,7)+'\n') : filter.name,
          top: (filter.id.toString() !== '6024' && filter.id.toString() !== '6001') ? '45px' : '50px'
        }, {
          fontSize:'10px',fontColor:'#ffffff',fontWeight:'600', lineHeight:'12px',
          text: numText,
          top: '-2px',
        }]
      }
      result.push({...val})
    })
    loading.value = false
    return result
  }
  async function getLuckyReward() {
    try {
      return await store.dispatch('lottery/getLuckyReward')
    } catch(error) {
      console.log(error);
      throw error
    }
  }
  function getAwardIndex(data: any) {
    const luckyList = computed(() => store.state.lottery.luckyList)
    const awardIndex = luckyList.value.findIndex((v: any) => v.id.toString() === data?.rewardId.toString() && v.rewardNum.toString() === data?.rewardNum.toString())
    return awardIndex
  }

  async function getBase64Image (url: string) {
    const img = new Image()
    img.crossOrigin = 'Anonymous';
    img.src = url;
    return new Promise((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx: any = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL())
        }
        img.onerror = (e) => {
            reject({ success: e })
        }
    })
  }

  return {getCurrentLuckyList, luckyMaxNum, luckyTicket, getLuckyReward, getAwardIndex, loading}
}
