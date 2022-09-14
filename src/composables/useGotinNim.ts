import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {setStoreState} from '@/store/utils'
import type {StateType} from '@/types'
// import nimService from '@/services/nim'
import Nim from '@/utils/nim'
import {Toast} from 'vant'
import {handleEmoji, randomId, regUrl, getObjectURL} from '@/utils/common'
import dayjs from 'dayjs'
import _ from 'lodash'
import mitt from 'mitt'
import {nameFilter, avatarFilter} from '@/filters/filters'
import {getImageFullUrl} from '@/utils/image'
// import {useRoute} from 'vue-router'
import useUser from '@/composables/useUser'

let nimObj: any = null
const mitter = mitt()

export default function useGotinChatroom() {
  const NIM_EVENT = 'nim_event'
  const NIM_NEW_MSGS = 'nim_new_msgs'
  const store = useStore<StateType>()

  // const route = useRoute()

  const {user} = useUser()

  const isUploading = ref(false)
  const currentTo = computed<string>(() => store.state.nim.currentTo)
  const loading = computed<boolean>(() => store.state.nim.loading)
  const chatLoading = computed<boolean>(() => store.state.nim.chatLoading)
  const connectStatus = computed<string>(() => store.state.nim.connectStatus)
  const mineInfo = computed<any>(() => store.state.nim.mineInfo)
  const chatSessions = computed<any[]>(() => store.state.nim.chatSessions)
  const unreadNum = computed<number>(() => _.sumBy(chatSessions.value, 'unread'))
  const users = computed<any>(() => store.state.nim.users)
  const originalMsgs = computed<any>(() => store.state.nim.originalMsgs)

  const mergeOriginalMsgs = (value: any) => {
    const {sessionId, msgs} = value
    setStoreState('nim', 'originalMsgs', {...originalMsgs.value, [sessionId]: msgs})
  }
  const setChatSessions = (value: any) => setStoreState('nim', 'chatSessions', value)
  const setConnectStatus = (value: any) => setStoreState('nim', 'connectStatus', value)
  const setChatLoading = (value: any) => setStoreState('nim', 'chatLoading', value)
  const setLoading = (value: any) => setStoreState('nim', 'loading', value)
  const setCurrentTo = (value: any) => setStoreState('nim', 'currentTo', value)
  const getUsers = (accids: string[]) => {
    return store.dispatch('nim/getUsers', accids)
  }
  const auth = () => {
    return store.dispatch('nim/auth')
  }

  const sessions = computed<any>(() => {
    if (_.isEmpty(chatSessions.value)) {
      return []
    }

    return _.map(chatSessions.value, (session: any) => {
      const newLastMsg = handleMsg(session.lastMsg, true)
      return {...session, lastMsg: newLastMsg, ..._.pick(newLastMsg, ['fromCustom', 'fromNick', 'fromAvatar'])}
    })
  })

  const msgs = computed<any>(() => {
    if (_.isEmpty(originalMsgs.value)) {
      return {}
    }
    const ret: any = {}
    _.forEach(originalMsgs.value, (msgs: any, key: any) => {
      const retSingle: any = []
      let preStartTime = 0
      _.forEach(msgs, (msg: any) => {
        const newMsg = handleMsg(msg)
        if (!preStartTime) {
          preStartTime = msg.time
          retSingle.push({time: msg.t, msgs: [newMsg]})
          return
        }

        // 在前一个之后的5分钟内
        if (msg.time >= preStartTime && msg.time < preStartTime + 300000) {
          retSingle[retSingle.length - 1].msgs.push(newMsg)
        } else {
          preStartTime = msg.time
          retSingle.push({time: msg.t, msgs: [newMsg]})
        }
      })

      ret[key] = retSingle
    })
    console.log('msgs', ret)

    return ret[`p2p-${currentTo.value}`] || []
    // return ret
  })

  function onConnect() {
    // 首次的话 同步完信息之后再改变连接状态
    // 之后断线重连之后的回调 再设置此状态的变更
    if (connectStatus.value !== 'init') {
      setConnectStatus('connected')
    }
  }
  function onDisconnect(error: any) {
    console.log('nim-disconnect', error)
    if (error) {
      switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
          console.log('账号或者密码错误')
          break
        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
        case 417:
          console.log('重复登录, 已经在其它端登录了')
          break
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
          console.log('被踢了')
          break
        default:
          console.log('其他原因被踢下线')
          break
      }
    }
    setConnectStatus('break')
  }
  function onError(error: any) {
    setConnectStatus('break')
    console.log('云信连接失败', error)
  }
  function onWillReconnect() {
    console.log('chatroom-reconnect')
  }
  function init() {
    return new Promise(async (resolve, reject) => {
      setLoading(true)
      setConnectStatus('init')
      try {
        await auth()

        nimObj = new Nim({
          onConnect,
          onDisconnect,
          onWillReconnect,
          onError,
          onSyncDone,

          onSessions,
          onUpdateSession,

          onRoamingMsgs,
          onOfflineMsgs,
          onMsg,

          onUpdateUser,
        })
        console.log(mineInfo.value)
        await nimObj.init({
          appKey: mineInfo.value.appkey,
          account: mineInfo.value.accid,
          token: mineInfo.value.token,
        })

        setLoading(false)
        resolve('')
      } catch (error: any) {
        console.log('初始化nim失败', error)
        setLoading(false)
        Toast(`初始化nim失败:${error?.message}`)
        reject(error)
      }
    })
  }
  function initChat(to: string) {
    return new Promise(async (resolve, reject) => {
      setChatLoading(true)
      try {
        const historyRet = await nimObj.getHistoryMsgs(to, dayjs().valueOf())
        nimObj.setCurrSession(`p2p-${to}`)
        console.log('historyRet', historyRet)
        setUsers(_.concat(_.map(historyRet, 'to'), _.map(historyRet, 'from')))
        pushMsg(historyRet, true)
        setCurrentTo(to)
        setChatLoading(false)
        resolve('')
      } catch (error) {
        console.log('初始化某个聊天失败', error)
        setChatLoading(false)
        reject(error)
      }
    })
  }
  function destoryChat(to: string) {
    console.log('destoryChat', to)
    nimObj.setCurrSession('')
    nimObj.resetSessionUnread(`p2p-${to}`)
  }
  function handleMsg(msg: any, isSession = false) {
    const msgExt: any = {}
    const fromId = isSession && msg.from === mineInfo.value.accid ? msg.to : msg.from

    const from = _.isEmpty(users.value[fromId]) ? null : users.value[fromId]
    // 处理member
    if (from) {
      // msgExt.fromCustom = from.custom
      msgExt.fromNick = nameFilter(from.properties)
      msgExt.fromAvatar = avatarFilter(from.properties.avatar)
    } else {
      msgExt.fromAvatar = getImageFullUrl(msg.fromAvatar)
    }

    if (msg.type === 'text') {
      msgExt.display_text = _.escape(msg.text)
      msgExt.display_text = handleEmoji(msgExt.display_text)
      msgExt.display_text = regUrl(msgExt.display_text)
    }

    return {...msg, ...msgExt}
  }
  function formatTime(time: number) {
    const todayStart = dayjs().startOf('date').valueOf()
    const yestoday = dayjs().subtract(1, 'days')
    const yestodayStart = yestoday.startOf('date').valueOf()
    const yestodayEnd = yestoday.endOf('date').valueOf()
    if (time >= todayStart) {
      return dayjs(time).format('HH:mm')
    } else if (time >= yestodayStart && time <= yestodayEnd) {
      return dayjs(time).format('昨天 HH:mm')
    } else {
      return dayjs(time).format('YYYY年M月D日HH:mm')
    }
  }
  function formatMsg(msg: any) {
    const msgExt: any = {}
    msgExt.content = msg.content ? JSON.parse(msg.content) : null
    msgExt.custom = msg.custom ? JSON.parse(msg.custom) : null
    msgExt.fromCustom = msg.fromCustom ? JSON.parse(msg.fromCustom) : null
    return {...msg, t: formatTime(msg.time), ...msgExt}
  }
  async function onSessions(sessions: any) {
    console.log('onSessions', sessions)
    let accids: any[] = []
    _.forEach(sessions, (session: any) => {
      accids = _.concat(accids, [session.lastMsg.from, session.lastMsg.to])
    })
    setUsers(accids)
    pushSession(sessions)
  }
  function onUpdateSession(session: any) {
    console.log('onUpdateSession', session)
    setUsers([session.lastMsg.from, session.lastMsg.to])
    pushSession(session)
  }
  async function onRoamingMsgs(obj: any) {
    console.log('onRoamingMsgs', obj)
    const {msgs} = obj
    setUsers(_.concat(_.map(msgs, 'to'), _.map(msgs, 'from')))
    pushMsg(msgs)
  }
  async function onOfflineMsgs(obj: any) {
    console.log('onOfflineMsgs', obj)
    const {msgs} = obj
    setUsers(_.concat(_.map(msgs, 'to'), _.map(msgs, 'from')))
    pushMsg(msgs)
  }
  async function onSyncDone() {
    console.log('onSyncDone')
    setConnectStatus('connected')

    let msgsTo: string[] = []
    let msgsFrom: string[] = []
    _.forEach(originalMsgs.value, (msgs: any[]) => {
      msgsTo = _.concat(msgsTo, _.map(msgs, 'to'))
      msgsFrom = _.concat(msgsFrom, _.map(msgs, 'from'))
    })
    msgsTo = _.concat(msgsTo, _.map(chatSessions.value, 'to'))
    const userIds = _.concat(msgsFrom, msgsTo)

    setUsers(userIds)
  }
  function onMsg(msg: any) {
    console.log('onMsg', msg)
    setUsers([msg.to, msg.from])
    pushMsg(msg)
  }
  function setUsers(userIds: any[]) {
    if (connectStatus.value === 'init' || _.isEmpty(userIds)) {
      return
    }

    getUsers(_.uniq(userIds))
  }

  function onUpdateUser(user: any) {
    console.log('onUpdateUser', user)
  }
  async function sendText(to: string, content: string) {
    try {
      const msg = await nimObj.sendText(to, content)
      pushMsg(msg)
      // this.$bus.$emit(CHATROOM_EVENT, { type: CHATROOM_NEW_MSGS, data: { msgs: [msg] } })
    } catch (error) {
      console.log(error)
    }
  }

  function sendImage(to: string, fileDom: string, onProgress = _.noop) {
    const domObj: any = document.querySelector(`#${fileDom}`)
    return new Promise((resolve, reject) => {
      if (isUploading.value) {
        reject({code: 12, message: '文件上传中，请上传完毕后重试'})
        return
      }
      const handleChange = async () => {
        const file = domObj.files.length > 0 ? domObj.files[0] : null
        domObj.removeEventListener('change', handleChange)
        if (!file) {
          reject({code: 10, message: '还未选择文件'})
        }
        // 大于50MB
        else if (file.size / 1024 / 1024 > 15) {
          reject({code: 11, message: '文件大小需要小于15MB'})
        }
        // 条件满足
        else {
          try {
            isUploading.value = true

            const virtualMsg = await createImageMsg(to, {
              url: getObjectURL(file),
              size: file.size,
              name: file.name,
            })
            pushMsg(virtualMsg)
            _.delay(() => {
              mitter && mitter.emit(NIM_EVENT, {type: NIM_NEW_MSGS, data: {msgs: [virtualMsg]}})
            }, 0)
            const msg = await nimObj.sendFile(to, fileDom, onProgress)
            const sessionId = msg.sessionId
            const mergedMsgs = nimObj.mergeMsgs(originalMsgs.value[sessionId], [{...virtualMsg, status: 'success'}])
            mergeOriginalMsgs({sessionId, msgs: mergedMsgs})

            // this.$bus.$emit(CHATROOM_EVENT, { type: CHATROOM_NEW_MSGS, data: { msgs: [msg] } })
            isUploading.value = false
            resolve(virtualMsg)
          } catch (error) {
            console.log(error)
            isUploading.value = false
            reject(error)
          }
        }
        domObj.value = ''
      }
      domObj.addEventListener('change', handleChange)
      domObj.click()
    })
  }

  async function createImageMsg(to: string, file: any) {
    const time = await getServerTime()
    const ret = {
      cc: true,
      content: null,
      custom: null,
      file,
      flow: 'out',
      from: mineInfo.value.accid,
      fromAvatar: user.value.properties.avatar,
      fromClientType: 'Web',
      fromCustom: null,
      fromDeviceId: '',
      fromNick: nameFilter(user.value.properties),
      idClient: randomId(),
      idServer: '',
      isHistoryable: true,
      isLocal: false,
      isOfflinable: true,
      isPushable: true,
      isReplyMsg: true,
      isRoamingable: true,
      isSyncable: true,
      isUnreadable: true,
      needMsgReceipt: false,
      needPushNick: true,
      resend: false,
      scene: 'p2p',
      sessionId: `p2p-${to}`,
      status: 'sending',
      target: to,
      text: '',
      time,
      to,
      type: 'image',
      userUpdateTime: time,
    }

    return ret
  }

  // async function sayHi(to: string, hash: string) {
  //   try {
  //     const ret = await nimService.sayHi(to, hash)
  //     to = ret.im.accid

  //     getAllAttendees(route.params.sessionId as string)

  //     const msg = await nimObj.sendCustom(to, {type: 'say_hi'})
  //     pushMsg(msg)
  //     return to
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // function updateMyInfo() {
  //   nimObj.updateMyInfo('http://www.baidu.com')
  // }
  function pushSession(sessions: any) {
    if (!_.isArray(sessions)) {
      sessions = [sessions]
    }

    const newSessions = _.map(sessions, (session: any) => {
      return {...session, lastMsg: formatMsg(session.lastMsg)}
    })

    const mergedSessions = nimObj.mergeSessions(chatSessions.value, newSessions)
    setChatSessions(mergedSessions)
  }
  function pushMsg(msgs: any, isNew = false) {
    if (!_.isArray(msgs)) {
      msgs = [msgs]
    }

    if (_.isEmpty(msgs)) {
      return
    }

    let needPush = false
    const newMsgs = _.map(msgs, (msg: any) => {
      if (msg.sessionId === `p2p-${currentTo.value}`) {
        needPush = true
      }
      return formatMsg(msg)
    })

    if (needPush) {
      mitter && mitter.emit(NIM_EVENT, {type: NIM_NEW_MSGS, data: {msgs: newMsgs}})
    }

    const sessionId = newMsgs[0].sessionId ? newMsgs[0].sessionId : newMsgs[0].scene + '-' + newMsgs[0].from

    const mergedMsgs = isNew ? nimObj.mergeMsgs([], newMsgs) : nimObj.mergeMsgs(originalMsgs.value[sessionId], newMsgs)
    mergeOriginalMsgs({sessionId, msgs: mergedMsgs})
  }

  async function getServerTime() {
    try {
      const time = await nimObj.getServerTime()
      return time
    } catch (error) {
      console.log(error)
    }
  }

  return {
    NIM_EVENT,
    NIM_NEW_MSGS,
    loading,
    chatLoading,
    connectStatus,
    mineInfo,
    chatSessions,
    sessions,
    users,
    originalMsgs,
    msgs,
    unreadNum,
    init,
    initChat,
    destoryChat,
    sendText,
    sendImage,
    // sayHi,
    getServerTime,
    mitter,
  }
}
