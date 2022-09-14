import loginSDK from '@/utils/base'
import {getLang} from '@/utils/storage'
import ApiClient from './api-client'

function setFrom(backTo?: string, query?: any) {
  let gotinFrom: string = backTo
    ? backTo.indexOf('http') > -1
      ? backTo
      : location.origin + '/newview/home?toLive=&backTo=' + backTo
    : location.href
  gotinFrom = gotinFrom.replace(/token=.*?$/, '')

  let queryString
  if (query) {
    queryString = query.join('&')
  }

  if (queryString) {
    gotinFrom = gotinFrom.indexOf('?') > -1 ? gotinFrom + '&' + queryString : gotinFrom + '?' + queryString
  }
  return gotinFrom
}

function loginGotin(type: string, eventId?: string, ticketId?: string, redirect?: string) {
  let redirectUrl: string
  if (ticketId) {
    redirectUrl = setFrom('', [`ticketId=${ticketId}`])
  } else {
    redirectUrl = setFrom()
  }
  redirectUrl = redirect ? redirect : redirectUrl
  loginSDK.jumpToLoginService({
    type: type,
    lang: getLang(),
    name: 'njcb',
    hide:1,
    redirect_url: encodeURIComponent(redirectUrl),
  })
}
// 静默授权登录拿openid
function silentAuthLogin(backTo?: string) {
  setFrom(backTo)
  loginSDK.jumpToLoginService({
    type: 'login',
    lang: getLang(),
    hide:1,
    name: 'openid',
  })
}

function isLogged() {
  return loginSDK.getCurrentToken() || false
}
const saveAuth = (token: string, refreshToken?: string, expireTime?: string) => {
  loginSDK.saveAuth({token: token, refresh_token: refreshToken, expired_time: expireTime})
  ApiClient.setToken(loginSDK.getCurrentToken())
}


export {loginGotin, silentAuthLogin, isLogged, saveAuth}
