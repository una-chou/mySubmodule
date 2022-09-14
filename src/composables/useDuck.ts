import {computed} from 'vue'
import {useStore} from 'vuex'
import type {StateType} from '@/types'

export default function useShare() {
  const store = useStore<StateType>()
  const duckInfo = computed(() => store.state.duck.duckInfo)
  const ducks = computed(() => store.state.duck.ducks)

  async function getDuckPageInfos() {
    const duckInfo = await store.dispatch('duck/getDuckPageInfos')
    return duckInfo
  }

  async function riseDuck(params: any) {
    const data = await store.dispatch('duck/riseDuck', params)
    return data
  }

  async function getDucklings() {
    return await store.dispatch('duck/getDucklings')
  }

  return {ducks, duckInfo, getDuckPageInfos, riseDuck, getDucklings}
}
