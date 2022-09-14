import {computed} from 'vue'
import {useStore} from 'vuex'
import useConfig from '@/composables/useConfig'

import type {StateType} from '@/types'
const {getDiaryConfig, getGoodsConfig} = useConfig()

export default function useSign() {
  const store = useStore<StateType>()
  const signInfo = computed(() => store.state.sign.signInfo)
  async function getSignInfo() {
    const signInfo = await store.dispatch('sign/getSignPageInfos')
    return signInfo
  }

  function getSignList() {
    const list = getDiaryConfig()
    const list2 = getGoodsConfig()
    const assignList = list.map((value: any) => {
      value.goodId = value.reward1.split(',')[0]
      value.goodNumber = value.reward1.split(',')[1]
      list2.map((val: any) => {
        if (value.goodId == val.id) {
          value.name = val.name

          value.img = val.resourcePath + val.resourceName
        }
      })
      return value
    })
    console.log('assignList', assignList)

    return assignList
  }
  return {signInfo, getSignInfo, getSignList}
}
