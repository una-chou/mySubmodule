import {Kind, Specie, Code} from '@/enum/index'

export default class WS {
  ws: any
  callback: any
  wsUrl: string
  lockReconnect: boolean
  tt: any
  repeat: any
  mitter: any
  retryTimes: number
  constructor(params: any, mitter: any, callback: any, wsUrl: string) {
    this.callback = callback
    if (wsUrl) {
      this.wsUrl = wsUrl
    } else {
      this.wsUrl = this.initUrl(params)
    }
    this.lockReconnect = false
    this.retryTimes = 0
    this.mitter = mitter
    this.createWebSocket()
  }

  initUrl(param: any) {
    const url = `${process.env.VUE_APP_WS_URL}/live/${Kind.Rtc}/${param.scene}/${encodeURI(param.channel)}/${
      param.event
    }/${param.session}/${encodeURI(param.uid)}/${param.aid}`
    return url
  }

  createWebSocket() {
    try {
      console.log('ws - 创建', this.wsUrl)
      this.ws = new WebSocket(this.wsUrl)
      this.init()
    } catch (e) {
      console.log('ws - catch')
      this.reconnect()
    }
  }
  init() {
    this.ws.onclose = (e: any) => {
      console.log('ws - 链接关闭', this.wsUrl, JSON.stringify(e))
      this.repeat && clearInterval(this.repeat)
      if (e.code === 1006) {
        console.log('重新连接', this.wsUrl)
        this.reconnect()
      }
    }
    this.ws.onerror = (e: any) => {
      console.log('ws - 发生异常了', this.wsUrl, JSON.stringify(e))
      this.reconnect()
    }
    this.ws.onopen = (e: any) => {
      console.log('ws - 链接打开', this.wsUrl, JSON.stringify(e))
      this.retryTimes = 0
      this.callback && this.callback()
      // 保持心跳
      this.repeat = setInterval(() => {
        const heartCheck = {
          specie: Specie.Default,
          code: Code.CodeUserCheckLived,
        }
        this.sendMsg(heartCheck)
      }, 3000)
    }
    this.ws.onmessage = (event: any) => {
      const msg = JSON.parse(event.data)
      this.mitter.emit('msg', msg)
    }
  }

  // 重连
  reconnect() {
    if (this.lockReconnect) {
      return
    }
    this.close()
    this.lockReconnect = true
    this.retryTimes++
    let timeout = 0
    if (this.retryTimes === 1) {
      timeout = 1000
    } else if (this.retryTimes === 2) {
      timeout = 3000
    } else if (this.retryTimes >= 3) {
      timeout = 5000
    }
    //没连接上会一直重连，设置延迟避免请求过多
    this.tt && clearTimeout(this.tt)
    this.tt = setTimeout(() => {
      this.createWebSocket()
      this.lockReconnect = false
    }, timeout)
  }

  // 后端通信
  sendMsg(param: any) {
    const json = JSON.stringify({
      hash: new Date().getTime().toString(),
      specie: param.specie || Specie.Audience,
      code: param.code,
      target: param.target,
      data: param.data ? param.data : '',
      target_uid: param.target_uid,
    })
    this.ws.send(json)
  }

  // 关闭链接
  close() {
    this.lockReconnect = true
    clearInterval(this.repeat)
    this.ws.close()
  }
}
