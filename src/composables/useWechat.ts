import Cookies from 'js-cookie'
import {silentAuthLogin} from '@/utils/login'
import {isWechat} from '@/utils/browser'
export default function useWechat() {
  function getOpenid() {
    return Cookies.get('openid')
  }

  function setOpenid(openid: string) {
    Cookies.set('openid', openid, {expires: 1000, domain: process.env.VUE_APP_LOGIN_DOMAIN})
  }

  async function silentAuth() {
    if (!isWechat()) {
      return
    }

    return new Promise(resolve => {
      if (getOpenid()) {
        resolve(getOpenid())
        return
      }

      silentAuthLogin()
    })
  }

  return {getOpenid, setOpenid, silentAuth}
}
