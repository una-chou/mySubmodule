import {computed} from 'vue'
import {useStore} from 'vuex'
import type {StateType} from '@/types'

export default function useShare() {
  const store = useStore<StateType>()
  const shareInfo = computed(() => store.state.share.shareInfo)

  async function getSharePageInfos() {
    const shareInfo = await store.dispatch('share/getSharePageInfos')
    return shareInfo
  }

  async function getShareReward(id: string) {
    const data = await store.dispatch('share/getShareReward', id)
    return data
  }

  async function noticeShareSuccess() {
    console.time()
    const data = await store.dispatch('share/noticeShareSuccess')
    console.timeEnd()
    return data
  }

  return {shareInfo, getSharePageInfos, getShareReward, noticeShareSuccess}
}
