import {computed} from 'vue'
import {useStore} from 'vuex'
import type {StateType} from '@/types'
import useConfig from '@/composables/useConfig'
import type {AvatarConfig} from '@/types/config'
import {find} from 'lodash'

// todo 性能考量
export default function useUser() {
  const store = useStore<StateType>()
  const user = computed(() => store.state.user.user)
  const avatar = computed(() => store.state.user.avatar)
  const {getAvatarConfig, getScattered1Config} = useConfig()
  const editUserName = (name: string) => store.dispatch('user/editName', name)
  const editUserAppear = (params: any) => store.dispatch('user/editUserAppear', params)

  const isCameraActive = computed(() => store.state.home.isCameraActive)

  async function getUserInfo() {
    await store.dispatch('user/getUserInfo')
    getAvatar()
  }
  function getAvatar() {
    const avatarList = getAvatarConfig()
    const scattered = getScattered1Config()
    const res = find(avatarList, (item: AvatarConfig) => {
      return item.id == user.value.headImagId
    })
    const avatarObj: any = {}
    // 是南京银行用户并且有NFT
    if (user.value.bBankUser && user.value.bHaveNFT) {
      // avatarObj.avatarFrame = scattered.profile_nft
      avatarObj.avatarFrame = scattered.profile_nft_bg
      avatarObj.avatarNTF = scattered.profile_nft
    } else {
      // avatarObj.avatarFrame = scattered.profile_default
      avatarObj.avatarFrame = scattered.profile_default_bg
      avatarObj.avatarNTF = scattered.profile_default
    }
    avatarObj.iconPath = res?.iconPath + res?.iconName
    store.dispatch('user/setAvatar', avatarObj)
  }
  function getDiamond() {
    store.dispatch('home/getDiamond')
  }
  async function sendSmsCode(params: object) {
    return await store.dispatch('user/sendSmsCode', params)
  }
  async function checkSmsCode(params: object) {
    return await store.dispatch('user/checkSmsCode', params)
  }
  function setCameraActive(status: boolean) {
    store.dispatch('home/setCameraActive', status)
  }

  return {user, avatar, getUserInfo, editUserName, getAvatar, editUserAppear, getDiamond, sendSmsCode, checkSmsCode, setCameraActive, isCameraActive}
}
