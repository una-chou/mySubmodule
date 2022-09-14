import type {StateType} from '@/types'
import {computed, Ref} from 'vue'
import {useStore} from 'vuex'
import {Code, Specie, Scene} from '@/enum/index'
import WS from '@/server/ws/index'
import mitt from 'mitt'

// 1v1的 ws
function use1v1Ws(callback: any): {
  init1v1MatchWs: any
  init1v1Ws: any
  RTCsendMsg: any
  wsOff: any
} {
  let wsSelf: any = null
  let agoraID = ''
  const mitter = mitt()
  const store = useStore<StateType>()
  const event = computed(() => store.state.event.event)
  const singleSession = computed(() => store.state.session.singleSession)
  const user = computed(() => store.state.user.user)

  function init1v1MatchWs(eventId: string, sessionId: string, uid: string) {
    wsSelf = new WS(
      {},
      mitter,
      () => {
        initWsBusOn()
      },
      `${process.env.VUE_APP_WS_URL}/1v1match/${eventId}/${sessionId}/${uid}`,
    )
  }

  //创建ws
  function init1v1Ws(channel: string, aid: string, publishState: Ref<boolean>) {
    agoraID = aid
    wsSelf = new WS(
      {
        channel: channel,
        event: event.value.uuid,
        session: singleSession.value.uuid,
        uid: user.value.userId,
        aid: agoraID,
        scene: Scene.OneToOne,
      },
      mitter,
      () => {
        // 未发布流时才允许初始化
        RTCsendMsg(Code.JoinOneToOne)
        if (!publishState.value) {
          initWsBusOn()
          RTCsendMsg(Code.OneToOneCountdown)
        }
      },
    )
  }
  //发消息的统一函数
  function RTCsendMsg(value: string) {
    const CODE: any = [
      Code.JoinOneToOne,
      Code.EndOneToOne,
      Code.LengthenOneToOne,
      Code.OneToOneTimeLeft,
      Code.LeaveOneToOne,
      Code.OneToOneCountdown,
      Code.OneToOneSendCard,
    ]
    if (!CODE.includes(value)) return
    const json = {
      target: String(agoraID), // agoraID
      activeSending: true, // 表示用户主动发送，用于区别后端自动返回和用户发送后主动返回
      code: value,
      data: {},
    }
    const {firstName, lastName, nickname, avatar} = user.value.properties
    switch (value) {
      case Code.JoinOneToOne:
        json.data = {
          first_name: firstName || nickname,
          last_name: lastName,
          avatar,
        }
        break
      default:
        break
    }
    wsSelf && wsSelf.sendMsg(json)
  }
  // ws服务返回消息监听
  function initWsBusOn() {
    mitter.off('msg')
    mitter.on('msg', (params: any) => {
      callback(params)
    })
  }
  // 关闭ws
  function wsOff() {
    mitter.off('msg')
    wsSelf && wsSelf.close()
    wsSelf = null
  }

  return {
    init1v1MatchWs,
    init1v1Ws,
    RTCsendMsg,
    wsOff,
  }
}

// 三方直播的ws
function useThirdWs(callback: any): {
  initThirdWs: any
  RTCsendMsg: any
  wsOff: any
} {
  let wsSelf: any = null
  const mitter = mitt()
  const store = useStore<StateType>()
  const event = computed(() => store.state.event.event)
  const singleSession = computed(() => store.state.session.singleSession)
  const user = computed(() => store.state.user.user)

  //创建ws
  function initThirdWs(callback2: any) {
    wsSelf = new WS(
      {
        channel: singleSession.value.uuid,
        event: event.value.uuid,
        session: singleSession.value.uuid,
        uid: user.value.userId,
        aid: user.value.properties.intId,
        scene: Scene.LiveStreaming,
      },
      mitter,
      () => {
        initWsBusOn(callback2)
      },
    )
  }
  // ws服务返回消息监听
  function initWsBusOn(callback2: any) {
    mitter.off('msg')
    mitter.on('msg', (params: any) => {
      callback(params)
    })
    callback2 && callback2()
  }
  //发消息的统一函数
  function RTCsendMsg(json: any) {
    wsSelf.sendMsg(json)
  }
  // 关闭ws
  function wsOff() {
    mitter.off('msg')
    wsSelf.close()
    wsSelf = null
  }
  return {
    initThirdWs,
    RTCsendMsg,
    wsOff,
  }
}

// forum的ws
function useForumWs(callback: any): any {
  let wsSelf: any = null
  let agoraID = ''
  const mitter = mitt()
  const store = useStore<StateType>()
  const singleSession = computed(() => store.state.session.singleSession)
  const user = computed(() => store.state.user.user)
  const event = computed(() => store.state.event.event)

  //创建ws
  function initForumWs(channel: string, aid: string, publishState: Ref<boolean>) {
    agoraID = aid
    wsSelf = new WS(
      {
        channel,
        event: event.value.uuid,
        session: singleSession.value.uuid,
        uid: user.value.userId,
        aid: agoraID,
        scene: Scene.Forum,
      },
      mitter,
      () => {
        initWsBusOn()
        RTCsendMsg(Code.userRole)
      },
    )
  }
  //发消息的统一函数
  function RTCsendMsg(value: string, jsonObj = {}) {
    // 如果是不存在的业务玛则阻止发送
    if (!Object.values(Code).includes(value)) return
    type JsonType = {
      code: string
      specie: any
      target: string
      data: any
      target_uid: string
    }

    let json: JsonType = {
      code: value,
      specie: Specie.Default,
      target: '',
      data: {},
      target_uid: '',
      ...jsonObj,
    }

    const userProperties = user.value.properties
    switch (value) {
      // 主持人隐身
      case Code.SetHostStealth:
        json.target = String(agoraID)
        json.specie = Specie.Presenter
        break
      // 默认获取一次表情数据
      case Code.EmojiNum:
        json.target = String(agoraID)
        break
      // 获取上麦嘉宾列表(包含上麦嘉宾列表，举手嘉宾和观众列表)
      case Code.GetGuestList:
        json.specie = Specie.Presenter
        break
      // 用户举手
      case Code.Raise:
        json = {
          ...json,
          specie: Specie.Audience,
          data: {
            first_name: userProperties.firstName,
            last_name: userProperties.lastName,
            avatar: userProperties.avatar,
            company: userProperties.company,
            position: userProperties.position || userProperties.jobTitle,
          },
        }
        break
      // 轮询获取直播的开播状态，主持人是否在线
      case Code.CheckChannel:
        json.target = String(agoraID)
        break
      // 发送表情计数
      case Code.SendEmoji:
        json = jsonObj as JsonType
        break
      // 获取当前用户的身份
      case Code.userRole:
        break
      // 用户下麦（嘉宾、观众操作）
      case Code.CodeOffLived:
        json.specie = Specie.Lived
        json.target_uid = user.value.userId
        // json.target = this.agoraId;
        break
      // 观众/嘉宾请求上麦取消
      case Code.RaiseCancel:
        json.specie = Specie.Audience
        break
      // 点击开始直播（主持人操作）
      case Code.GoToLive:
        json.specie = Specie.Presenter
        break
      // 结束直播会议（主持人操作）
      case Code.EndLive:
        json.specie = Specie.Presenter
        break
      // 全员静音(主持人权限)
      case Code.PresenterAllMute:
        json.specie = Specie.Presenter
        break
      // 全员发声(主持人权限)
      case Code.PresenterAllPhonic:
        json.specie = Specie.Presenter
        break
      // 同意上麦(主持人权限)
      case Code.ChangeRaiseConsent:
        json.specie = Specie.Presenter
        break
      //  切换摄像头状态
      case Code.PresenterVideoOff:
        break
      // 切换麦克风状态
      case Code.PresenterMute:
        break
      // 移除麦上嘉宾(主持人权限)
      case Code.ChangeRaiseOffline:
        console.log('移除麦上嘉宾(主持人权限)', json, jsonObj, Code.ChangeRaiseOffline)
        json.specie = Specie.Presenter
        break
      // 拒绝举手嘉宾/观众上麦(主持人权限)
      case Code.ChangeRaiseReject:
        json.specie = Specie.Presenter
        break
      // 用户共享屏幕
      case Code.CodeShareScreen:
        json.specie = Specie.Lived
        break
      default:
        break
    }
    wsSelf && wsSelf.sendMsg(json)
  }
  // ws服务返回消息监听
  function initWsBusOn() {
    mitter.off('msg')
    mitter.on('msg', (params: any) => {
      callback(params)
    })
  }
  // 关闭ws
  function wsOff() {
    wsSelf && wsSelf.close()
    wsSelf = null
    mitter.off('msg')
  }

  return {
    initForumWs,
    RTCsendMsg,
    wsOff,
  }
}

// waitroom ws
function useWaitroomWs(callback: any): any {
  let wsSelf: any = null
  const mitter = mitt()
  const store = useStore<StateType>()
  const singleSession = computed(() => store.state.session.singleSession)
  const user = computed(() => store.state.user.user)
  // const event = computed(() => store.state.event.event)

  //创建ws
  function initWaitroomWs() {
    wsSelf = new WS(
      {},
      mitter,
      () => {
        initWsBusOn()
      },
      `${process.env.VUE_APP_WS_URL}/waitingroom/forum/${singleSession.value.uuid}/${user.value.userId}/${user.value.properties?.intId}`,
    )
  }

  // ws服务返回消息监听
  function initWsBusOn() {
    mitter.off('msg')
    mitter.on('msg', (params: any) => {
      callback(params)
    })
  }
  // 关闭ws
  function wsOff() {
    console.log('====== ws off ======')
    wsSelf && wsSelf.close()
    wsSelf = null
    mitter.off('msg')
  }

  return {
    initWaitroomWs,
    wsOff,
  }
}

export {use1v1Ws, useForumWs, useThirdWs, useWaitroomWs}
