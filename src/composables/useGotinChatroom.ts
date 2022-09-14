import {computed, ref} from 'vue'
import type {ChatroomType, MineInfoType, MsgsType, StatusType} from '@/types/chatroom'
import NimChatroom from '@/utils/nim-chatroom'
import chatroomApi from '@/services/chatroom'
import dayjs from 'dayjs'
import {Toast} from 'vant'
import _ from 'lodash'
import {regUrl, handleEmoji, randomId, getObjectURL} from '@/utils/common'
import {getImageFullUrl} from '@/utils/image'
import useUser from '@/composables/useUser'
import useGotinNim from '@/composables/useGotinNim'
import {nameFilter} from '@/filters/filters'

export default function useGotinChatroom(mitter?: any) {
  const CHATROOM_MUTE = 'chatroom_mute'
  const CHATROOM_UNMUTE = 'chatroom_unmute'
  const CHATROOM_MEMBER_MUTE = 'chatroom_member_mute'
  const CHATROOM_MEMBER_UNMUTE = 'chatroom_member_unmute'
  const CHATROOM_NEW_MSGS = 'chatroom_new_msgs'
  const CHATROOM_EVENT = 'chatroom_event'

  const {user} = useUser()
  const loading = ref(true)
  const loadingMore = ref(false)
  const hasMore = ref(false)
  const chatroom = ref<ChatroomType>({} as ChatroomType)
  const mineInfo = ref<MineInfoType>({} as MineInfoType)
  const originalMsgs = ref<Array<MsgsType>>([])
  const connectStatus = ref<StatusType>('init')

  const {getServerTime} = useGotinNim()

  const members = ref<any>({})
  const highlightIds = ref<Array<string>>([])
  const unHighlightIds = ref<Array<string>>([])
  let chatroomObj: any = {}
  const handledView = ref(false)
  const msgOrders = ref<Array<string>>([])
  const isUploading = ref(false)
  let lastTimestamp = 0

  const msgs = computed<Array<MsgsType>>(() => {
    if (originalMsgs.value.length === 0) {
      return []
    }
    const ret: any = []
    let preStartTime = 0
    msgOrders.value = []
    _.forEachRight(originalMsgs.value, (originalMsg: any) => {
      const msg = fillMember(originalMsg)

      if (_.includes(['text', 'image', 'custom'], msg.type)) {
        msgOrders.value.push(msg.idClient)
      }

      if (!preStartTime) {
        preStartTime = msg.time
        ret.push({time: msg.t, msgs: [msg]})
        return
      }

      // 在前一个之后的5分钟内
      if (msg.time >= preStartTime && msg.time < preStartTime + 300000) {
        ret[ret.length - 1].msgs.push(msg)
      } else {
        preStartTime = msg.time
        ret.push({time: msg.t, msgs: [msg]})
      }
    })
    return ret
  })

  async function getMembers(accounts: string[] = []) {
    try {
      if (_.isEmpty(accounts)) {
        return {}
      }
      const ret = await chatroomObj.getMembers(accounts)
      _.forEach(ret.members, (member: any) => {
        const existMember = members.value[member.account] || null
        const custom = member.custom ? JSON.parse(member.custom) : null
        const avatar = getImageFullUrl(member.avatar)
        const gaged = member.tempMuted
        // 如果用户不存在 或者 用户信息有更新 则进行更新
        if (
          !existMember ||
          (existMember && existMember.gaged !== gaged) ||
          existMember.avatar !== avatar ||
          existMember.nick !== member.nick ||
          !_.isEqual(existMember.custom, custom)
        ) {
          members.value[member.account] = {
            ...member,
            gaged: member.tempMuted,
            custom,
            avatar,
          }
        }
      })
      return members.value
    } catch (error) {
      console.log(error)
      return {}
    }
  }

  function fillMember(msg: any) {
    let msgExt: any = null
    const from = members.value[msg.from] || null
    if (
      from &&
      (msg.fromNick !== from.nick ||
        msg.fromAvatar !== from.avatar ||
        msg.banned !== from.gaged ||
        !_.isEqual(msg.fromCustom, from.custom))
    ) {
      msgExt = {}
      msgExt.fromCustom = from.custom
      msgExt.fromNick = from.nick
      msgExt.fromAvatar = from.avatar
      msgExt.banned = from.gaged
    }

    if (msgExt) {
      return {...msg, ...msgExt}
    }

    return msg
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
  function handleMsg(msg: any) {
    const msgExt: any = {}
    const from = members.value[msg.from] ? members.value[msg.from] : null
    // 处理member
    if (from) {
      msgExt.fromCustom = from.custom
      msgExt.fromNick = from.nick
      msgExt.fromAvatar = from.avatar
      msgExt.banned = from.gaged
    } else {
      msgExt.banned = false
      msgExt.fromAvatar = getImageFullUrl(msg.fromAvatar)
    }
    // 处理高亮
    if (_.includes(highlightIds.value, msg.idClient)) {
      msgExt.custom = msg.custom ? {...msg.custom, highlight: true, allowed: true} : {highlight: true, allowed: true}
    } else {
      msgExt.custom = msg.custom ? {...msg.custom, highlight: false} : {highlight: false}
    }

    if (msg.type === 'text') {
      msg.display_text = _.escape(msg.text)
      msg.display_text = handleEmoji(msg.display_text)
      msg.display_text = regUrl(msg.display_text)
    }

    return {...msg, ...msgExt}
  }

  function formatMsg(msg: any) {
    const msgExt: any = {}
    msgExt.content = msg.content ? JSON.parse(msg.content) : null
    msgExt.custom = msg.custom ? JSON.parse(msg.custom) : null
    msgExt.fromCustom = msg.fromCustom ? JSON.parse(msg.fromCustom) : null
    return {...msg, t: formatTime(msg.time), ...msgExt}
  }

  function onConnect(ret: any) {
    const {member} = ret
    mineInfo.value.is_admin = ['owner', 'manager'].includes(member.type)
    mineInfo.value.banned = member.tempMuted
    connectStatus.value = 'connected'
  }
  function onDisconnect(error: any) {
    connectStatus.value = 'break'
    console.log('chatroom-disconnect', error)
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
  }
  function onError(error: any) {
    connectStatus.value = 'break'
    console.log('聊天室连接失败', error)
  }
  function onMsgs(msgs: any[]) {
    const newMsgs: any[] = []
    _.forEachRight(msgs, (single: any) => {
      const msg = formatMsg(single)
      if (single.type === 'notification') {
        handleNotificationMsg(msg)
      } else if (msg.type === 'custom') {
        handleCustomMsg(msg)
      }
      newMsgs.push(msg)
    })

    const handledMsgs: any[] = []
    _.forEachRight(newMsgs, (msg: any) => {
      if (msg.type === 'custom') {
        // 设置为高亮取消高亮的消息 过滤掉
        if (_.includes(['highlight', 'unhighlight'], msg.content.sub_type)) {
          return
        }

        if (
          _.includes(['muteMember', 'unmuteMember'], msg.content.sub_type) &&
          msg.content.to !== mineInfo.value.accid
        ) {
          return
        }

        // 设置开启审核和关闭审核的 过滤掉
        if (_.has(msg.content, 'review')) {
          return
        }
      }
      // 通知消息
      if (msg.type === 'notification') {
        return
      }
      // 普通用户开启审核状态并且不是自己发的 看不到未审核的消息
      if (
        !mineInfo.value.is_admin &&
        chatroom.value.review &&
        msg.custom &&
        _.has(msg.custom, 'allowed') &&
        !msg.custom.allowed &&
        msg.from !== mineInfo.value.accid
      ) {
        return
      }
      handledMsgs.push(handleMsg(msg))
    })

    originalMsgs.value = _.concat(handledMsgs, originalMsgs.value)
    mitter && mitter.emit(CHATROOM_EVENT, {type: CHATROOM_NEW_MSGS, data: {msgs: [msgs]}})
  }
  function setMemberBanned(account: string, value: boolean) {
    const newMembers: any = {}
    _.forEach(members.value, (single: any) => {
      if (account === single.account) {
        newMembers[single.account] = {...single, gaged: value}
      } else {
        newMembers[single.account] = single
      }
    })
    members.value = newMembers

    if (account === mineInfo.value.accid) {
      mineInfo.value.banned = value ? 1 : 0
    }
  }
  function deleteMsgById(msgId: string) {
    originalMsgs.value = _.filter(originalMsgs.value, (single: any) => {
      return single.idClient !== msgId
    })
  }
  function handleNotificationMsg(msg: any) {
    switch (msg.attach.type) {
      case 'memberEnter':
      case 'updateMemberInfo':
      case 'addCommon':
      case 'addManager':
      case 'unblackMember':
        getMembers(_.uniq(_.concat(msg.attach.to, msg.attach.from)))
        break
      case 'muteRoom':
        chatroom.value.banned = true
        mitter && mitter.emit(CHATROOM_MUTE)
        break
      case 'unmuteRoom':
        chatroom.value.banned = false
        mitter && mitter.emit(CHATROOM_UNMUTE)
        break
      case 'gagMember':
      case 'addTempMute':
        setMemberBanned(msg.attach.to[0], true)
        mitter && mitter.emit(CHATROOM_MEMBER_MUTE)
        break
      case 'ungagMember':
      case 'removeTempMute':
        setMemberBanned(msg.attach.to[0], false)
        mitter && mitter.emit(CHATROOM_MEMBER_UNMUTE)
        break
      case 'deleteChatroomMsg':
        deleteMsgById(msg.attach.msgId)
        break
    }
  }
  function handleCustomMsg(msg: any) {
    let highlightIndex, unHighlightIndex
    let targetMsgId = ''
    switch (msg.content.sub_type) {
      case 'highlight':
        targetMsgId = msg.content.msg_id
        unHighlightIndex = _.indexOf(unHighlightIds.value, targetMsgId)
        if (unHighlightIndex > -1) {
          unHighlightIds.value.splice(unHighlightIndex, 1)
        }
        highlightIds.value.push(targetMsgId)
        break
      case 'unhighlight':
        targetMsgId = msg.content.msg_id
        highlightIndex = _.indexOf(highlightIds.value, targetMsgId)
        if (highlightIndex > -1) {
          highlightIds.value.splice(highlightIndex, 1)
        }
        unHighlightIds.value.push(targetMsgId)
        break
      default:
        if (_.has(msg.content, 'review')) {
          chatroom.value.review = msg.content.review
        }
    }

    if (targetMsgId !== '') {
      const msgIndex = _.findIndex(originalMsgs.value, {idClient: targetMsgId})
      if (msgIndex > -1) {
        originalMsgs.value.splice(msgIndex, 1, handleMsg(originalMsgs.value[msgIndex]))
      }
    }
  }
  function onWillReconnect() {
    console.log('chatroom-reconnect')
  }

  function formatChatroomInfo(chatroom: any) {
    return {...chatroom.chatroom, ...chatroom.config, addr: chatroom.addr, role: chatroom.role}
  }
  function prepareHighlightIds(msg: any) {
    if (msg.type !== 'custom') {
      return
    }

    if (msg.content.sub_type !== 'highlight' && msg.content.sub_type !== 'unhighlight') {
      return
    }

    if (_.includes(highlightIds.value, msg.content.msg_id) || _.includes(unHighlightIds.value, msg.content.msg_id)) {
      return
    }

    if (msg.content.sub_type === 'highlight') {
      highlightIds.value.push(msg.content.msg_id)
    } else {
      unHighlightIds.value.push(msg.content.msg_id)
    }
  }
  function prepareView(msg: any) {
    if (msg.type !== 'custom') {
      return
    }

    if (!_.has(msg.content, 'review')) {
      return
    }

    if (handledView.value) {
      return
    }
    handledView.value = true
    chatroom.value.review = msg.content.review
  }
  async function destory() {
    loading.value = true
    chatroom.value = {} as ChatroomType
    mineInfo.value = {} as MineInfoType
    originalMsgs.value = []
    connectStatus.value = 'init'
    lastTimestamp = 0

    members.value = {}
    highlightIds.value = []
    unHighlightIds.value = []

    handledView.value = false
    msgOrders.value = []
    try {
      await chatroomObj.destory()
      chatroomObj = {}
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function init(eventHash: string, sessionHash = '') {
    loading.value = true

    try {
      const authInfo = await chatroomApi.auth()
      let chatroomInfo
      if (sessionHash) {
        chatroomInfo = await chatroomApi.join('session', sessionHash)
      } else {
        chatroomInfo = await chatroomApi.join('event', eventHash)
      }

      chatroom.value = formatChatroomInfo(chatroomInfo)
      mineInfo.value = {...authInfo, is_admin: false, banned: 0}

      chatroomObj = new NimChatroom({
        onConnect,
        onDisconnect,
        onWillReconnect,
        onError,
        onMsgs,
      })

      await chatroomObj.init({
        appKey: chatroom.value.appkey,
        account: mineInfo.value.accid,
        token: mineInfo.value.token,
        chatroomId: chatroom.value.third_part_id,
        chatroomAddresses: chatroom.value.addr,
      })

      if (sessionHash) {
        await chatroomApi.role('session', sessionHash, chatroom.value.room_id)
      } else {
        await chatroomApi.role('event', eventHash, chatroom.value.room_id)
      }

      originalMsgs.value = await getHisotryMsgs()

      loading.value = false
      return
    } catch (error: any) {
      loading.value = false
      console.log('初始化聊天室失败', error)
      Toast(`初始化聊天室失败:${error?.message}`)
      throw error
    }
  }

  async function loadMoreMsgs() {
    const moreMsgs: any = await getHisotryMsgs()
    originalMsgs.value = originalMsgs.value.concat(moreMsgs)
    return
  }

  async function getHisotryMsgs() {
    if (loadingMore.value) {
      return []
    }
    const handledMsgs: any = []
    const timestamp = lastTimestamp ? lastTimestamp : dayjs().valueOf()
    try {
      const memberAccounts: string[] = []
      loadingMore.value = true
      const historyRet = await chatroomObj.getHistoryMsgs(timestamp)

      const retLength = historyRet.length
      if (retLength === 100) {
        hasMore.value = true
      } else {
        hasMore.value = false
      }

      const originalMsgs = _.map(historyRet, (single: any, index: number) => {
        if (retLength - 1 === index) {
          lastTimestamp = single.time
        }

        if (!_.includes(memberAccounts, single.from)) {
          memberAccounts.push(single.from)
        }
        const formatedMsg = formatMsg(single)
        prepareHighlightIds(formatedMsg)
        prepareView(formatedMsg)
        return formatedMsg
      })

      await getMembers(memberAccounts)

      _.forEach(originalMsgs, (msg: any) => {
        if (msg.type === 'custom') {
          // 设置为高亮取消高亮的消息 过滤掉
          if (_.includes(['highlight', 'unhighlight'], msg.content.sub_type)) {
            return
          }

          if (
            _.includes(['muteMember', 'unmuteMember'], msg.content.sub_type) &&
            msg.content.to !== mineInfo.value.accid
          ) {
            return
          }

          // 设置开启审核和关闭审核的 过滤掉
          if (_.has(msg.content, 'review')) {
            return
          }
        }
        // 通知消息
        if (msg.type === 'notification') {
          return
        }
        // 普通用户开启审核状态并且不是自己发的 看不到未审核的消息
        if (
          !mineInfo.value.is_admin &&
          chatroom.value.review &&
          msg.custom &&
          _.has(msg.custom, 'allowed') &&
          !msg.custom.allowed &&
          msg.from !== mineInfo.value.accid
        ) {
          return
        }

        const newMsg = handleMsg(msg)
        handledMsgs.push(newMsg)
      })
      loadingMore.value = false
      return handledMsgs
    } catch (error) {
      console.log('获取历史消息失败', error)
      loadingMore.value = false
      return handledMsgs
    }
  }

  async function sendText(content: string) {
    try {
      const custom =
        chatroom.value.review && !mineInfo.value.is_admin
          ? JSON.stringify({allowed: false})
          : JSON.stringify({allowed: true})
      const msg = await chatroomObj.sendText(content, custom)
      originalMsgs.value.unshift(handleMsg(formatMsg(msg)))
      mitter && mitter.emit(CHATROOM_EVENT, {type: CHATROOM_NEW_MSGS, data: {msgs: [msg]}})
    } catch (error) {
      console.log(error)
    }
  }

  function sendImage(fileDom: string, onProgress = _.noop) {
    const domObj: any = document.querySelector(`#${fileDom}`)
    return new Promise((resolve, reject) => {
      if (isUploading.value) {
        reject({code: 12, message: '文件上传中，请上传完毕后重试'})
        return
      }
      const handleChange = async () => {
        const file = domObj.files.length > 0 ? domObj.files[0] : null

        domObj.removeEventListener('change', handleChange)

        if (isUploading.value) {
          domObj.value = ''
          reject({code: 12, message: '文件上传中，请上传完毕后重试'})
          return
        }

        if (!file) {
          domObj.value = ''
          reject({code: 10, message: '还未选择文件'})
          return
        }

        // 大于50MB
        if (file.size / 1024 / 1024 > 15) {
          domObj.value = ''
          reject({code: 11, message: '文件大小需要小于15MB'})
          return
        }

        try {
          isUploading.value = true

          const virtualMsg = await createImageMsg({
            url: getObjectURL(file),
            size: file.size,
            name: file.name,
          })
          originalMsgs.value.unshift(handleMsg(formatMsg(virtualMsg)))
          _.delay(() => {
            mitter && mitter.emit(CHATROOM_EVENT, {type: CHATROOM_NEW_MSGS, data: {msgs: [virtualMsg]}})
          }, 0)

          const custom =
            chatroom.value.review && !mineInfo.value.is_admin
              ? JSON.stringify({allowed: false})
              : JSON.stringify({allowed: true})
          const msg = await chatroomObj.sendFile(fileDom, onProgress, custom)
          const virtualIndex = _.findIndex(originalMsgs.value, {idClient: virtualMsg.idClient})

          originalMsgs.value.splice(
            virtualIndex,
            1,
            handleMsg(formatMsg({...virtualMsg, idClient: msg.idClient, status: 'success'})),
          )
          // originalMsgs.value.unshift(formatMsg(msg))

          // mitter && mitter.emit(CHATROOM_EVENT, {type: CHATROOM_NEW_MSGS, data: {msgs: [msg]}})
          isUploading.value = false
          domObj.value = ''
          domObj.removeEventListener('change', handleChange)
          resolve(virtualMsg)
        } catch (error) {
          console.log(error)
          isUploading.value = false
          domObj.value = ''
          domObj.removeEventListener('change', handleChange)
          reject(error)
        }
      }
      domObj.addEventListener('change', handleChange)
      domObj.click()
    })
  }

  async function createImageMsg(file: any) {
    const time = await getServerTime()
    const ret = {
      chatroomId: chatroom.value.third_part_id,
      file,
      flow: 'out',
      from: mineInfo.value.accid,
      fromAvatar: user.value.properties.avatar,
      fromClientType: 'Web',
      fromCustom: JSON.stringify({identify: 'visitor', user_hash: user.value.properties.hash}),
      fromNick: nameFilter(user.value.properties),
      idClient: randomId(),
      resend: false,
      status: 'sending',
      text: '',
      time,
      type: 'image',
      userUpdateTime: time,
    }

    return ret
  }

  function getRangeNums(msg: any) {
    const index = _.indexOf(msgOrders.value, msg.idClient)
    if (index === -1) {
      return -1
    }

    return msgOrders.value.length - index - 1
  }
  function getLastNormalMsg() {
    let lastMsg: any
    _.forEachRight(msgs.value, (single: any) => {
      _.forEachRight(single.msgs, (msg: any) => {
        if (_.includes(['text', 'image'], msg.type)) {
          lastMsg = msg
          return false
        }
      })
      if (lastMsg) {
        return false
      }
    })
    return lastMsg
  }
  async function setReview(value: boolean) {
    try {
      await chatroomApi.setReview(chatroom.value.room_id, value ? 1 : 0)
      chatroom.value.review = value
      return Promise.resolve('')
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function review(msg: any) {
    const typeMap: any = {
      text: 0,
      image: 1,
    }
    try {
      const params = {
        third_part_id: chatroom.value.third_part_id,
        msg_id: msg.idClient,
        from_accid: msg.from,
        msg_type: typeMap[msg.type],
        attach:
          msg.type === 'text'
            ? msg.text
            : JSON.stringify({
                name: msg.file.name, //图片name
                // "md5: msg.file.,	//图片文件md5
                url: msg.file.url, //生成的url
                ext: msg.file.ext, //图片后缀
                w: msg.file.w, //宽
                h: msg.file.h, //高
                size: msg.file.size, //图片文件大小
              }),
      }
      await chatroomApi.review(params)
      return Promise.resolve('')
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function setMute(value: boolean, userHash = '') {
    try {
      let ret
      if (userHash) {
        if (value) {
          ret = await chatroomObj.setAccountMute(userHash)
        } else {
          ret = await chatroomObj.setAccountUnMute(userHash)
        }
        // ret = await chatroomApi.setAccountMute(chatroom.value.room_id, userHash, value)
      } else {
        ret = await chatroomApi.setMute(chatroom.value.room_id, value)
        if (ret.data.code !== 0) {
          throw new Error(ret.data)
        }
      }

      if (userHash) {
        console.log('设置禁言成功')
        // this.originalMsgs = _.map(this.originalMsgs, msg => {
        //   if (msg.fromCustom.user_hash === userHash) {
        //     return { ...msg, banned: value }
        //   } else {
        //     return msg
        //   }
        // })
      } else {
        chatroom.value.banned = value
      }
      return Promise.resolve('')
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function setHighlight(msg: any, value: boolean) {
    try {
      const params = {
        sub_type: value ? 'highlight' : 'unhighlight',
        msg_id: msg.idClient,
      }
      await chatroomObj.sendCustomMsg(params)

      if (value) {
        const unHighlightIndex = _.indexOf(unHighlightIds.value, msg.idClient)
        if (unHighlightIndex > -1) {
          unHighlightIds.value.splice(unHighlightIndex, 1)
        }

        highlightIds.value.push(msg.idClient)
      } else {
        const highlightIndex = _.indexOf(highlightIds.value, msg.idClient)
        if (highlightIndex > -1) {
          highlightIds.value.splice(highlightIndex, 1)
        }
        unHighlightIds.value.push(msg.idClient)
      }

      // this.originalMsgs = _.map(this.originalMsgs, single => {
      //   if (single.idClient === msg.idClient) {
      //     const custom = single.custom ? { ...single.custom, highlight: value } : { highlight: value }
      //     return { ...single, custom }
      //   } else {
      //     return single
      //   }
      // })
      return Promise.resolve('')
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function deleteMsg(msg: any) {
    try {
      const params = {
        room_id: chatroom.value.room_id,
        msg_time_tag: msg.time,
        msg_id: msg.idClient,
        from_acc: msg.fromCustom.user_hash,
      }
      const ret = await chatroomApi.delMsg(params)
      if (ret.data.code !== 0) {
        throw new Error(ret.data)
      }
      originalMsgs.value = _.filter(originalMsgs.value, (single: any) => {
        return single.idClient !== msg.idClient
      })
      return Promise.resolve('')
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    CHATROOM_MUTE,
    CHATROOM_UNMUTE,
    CHATROOM_MEMBER_MUTE,
    CHATROOM_MEMBER_UNMUTE,
    CHATROOM_NEW_MSGS,
    loading,
    loadingMore,
    hasMore,
    chatroom,
    mineInfo,
    msgs,
    connectStatus,
    init,
    sendText,
    sendImage,
    getRangeNums,
    setReview,
    review,
    setMute,
    setHighlight,
    deleteMsg,
    destory,
    getLastNormalMsg,
    createImageMsg,
    loadMoreMsgs,
  }
}
