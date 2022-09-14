import {isYD, mobileOS} from '@/utils/browser'
import _ from 'lodash'
class YouDaHybrid {
  constructor() {
    if (!window.yd) {
      window.yd = {}
    }
  }

  _register(funcName, callback) {
    if (!isYD()) {
      console.log('当前不是youda-app环境')
      return
    }
    console.log('_register begin', funcName, callback)
    try {
      if (mobileOS() === 'iOS') {
        window.yd[funcName] = callback
      } else {
        window.yd[funcName] = callback
        // window.WebViewJavascriptBridge.registerHandler(`yd.${funcName}`, callback)
      }
    } catch (error) {
      console.log('_register error', funcName, callback)
    }
  }

  _send(funcName, params) {
    if (!isYD()) {
      console.log('当前不是youda-app环境')
      return
    }
    console.log('_send begin', funcName, params)
    try {
      if (mobileOS() === 'iOS') {
        window.webkit.messageHandlers[funcName].postMessage(params)
      } else {
        const requestParams = _.isObject(params) || _.isArray(params) ? JSON.stringify(params) : params
        window.WebViewJavascriptBridge[funcName](requestParams)
        // window.WebViewJavascriptBridge.callHandler(funcName, params)
      }
    } catch (error) {
      console.log('_send error', funcName, params)
    }
  }

  sendJoinSession(sessionHash) {
    this._send('joinSession', {hash: sessionHash})
  }

  sendJoinEvent(eventHash) {
    this._send('joinEvent', {hash: eventHash})
  }

  sendTokenInvalid() {
    this._send('tokenInvalid')
  }

  registerChangeLocale(callback) {
    this._register('changeLocale', callback)
  }
}

const YDHybrid = new YouDaHybrid()
export default YDHybrid
