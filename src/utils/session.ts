import type {SessionDataType, NewListType} from '@/types/session'
import type {SingleSpeakerKindType} from '@/types'
import dayjs from 'dayjs'
import _ from 'lodash'

// 初始化 session 的 date 相关数据
function initSessionDate(session: SessionDataType): SessionDataType {
  const startDate: string | number = session.start_date
  const endDate: string | number = session.end_date
  session.id = session.hash || session.uuid
  session.sort = new Date(startDate).getTime()
  // isLiving: 这里只对比是否开始，没有转换成本地时间
  session.isLiving = dayjs(Number(startDate)) < dayjs() && dayjs() < dayjs(Number(endDate))

  let startTime = ''
  let endTime = ''
  const timezone: number = 0 - new Date().getTimezoneOffset() / 60

  startTime = dayjs(startDate).format('h:mm a')
  endTime = dayjs(endDate).format('h:mm a')
  const gmt: string = timezone >= 0 ? 'GMT+' + timezone : 'GMT' + timezone
  session.en = {
    startDate: dayjs(startDate).format('MMM D'),
    endDate: dayjs(endDate).format('MMM D'),
    time: `${startTime} - ${endTime}`,
    add: '(+1)',
    gmt: `(${gmt})`,
  }
  session.cn = {
    startDate: dayjs(startDate).format('M月D日'),
    endDate: dayjs(endDate).format('M月D日'),
    time: `${startTime} - ${endTime}`,
    add: '(+1)',
    gmt: `(${gmt})`,
  }

  return session
}

//获取全部session
function getSessionListWithGuest(
  withoutGuestSessionList: Array<SessionDataType>,
  guestList: Array<SingleSpeakerKindType>,
  needOrder = false,
) {
  const liveDataList: Array<SessionDataType> = []
  const sessionIdLists: Array<string> = []
  //过滤有效的session
  withoutGuestSessionList.forEach(sessionItem => {
    let newItem = JSON.parse(JSON.stringify(sessionItem))
    newItem = initSessionDate(newItem)
    if (!sessionIdLists.includes(newItem.sessionId)) {
      sessionIdLists.push(newItem.sessionId)
    }
    if (newItem.properties.isDraft === 'false') {
      liveDataList.push(newItem)
    }
  })
  // sessionItem.speakers = compact(speakers)
  return needOrder ? getSessionsInOrder(liveDataList) : liveDataList
}

// 每条session都添加上时间格式
function addDateFormat(session: SessionDataType) {
  if (session.start_date.toString().length < 13) {
    session.start_date = session.start_date * 1000
    session.end_date = session.end_date * 1000
  }
  const startDate = session.start_date
  const endDate = session.end_date
  const startTime = dayjs(startDate).format('h:mma')
  const endTime = dayjs(endDate).format('h:mma')
  // isLiving: 这里只对比是否开始，没有转换成本地时间
  const now = Date.now()
  session.isLiving = startDate < now && endDate > now
  session.en = {
    startDate: dayjs(startDate).format('MMM D'),
    endDate: dayjs(endDate).format('MMM D'),
    time: `${startTime}-${endTime}`,
    add: '(+1)',
  }
  session.cn = {
    startDate: dayjs(startDate).format('M月D日'),
    endDate: dayjs(endDate).format('M月D日'),
    time: `${startTime}-${endTime}`,
    add: '(+1)',
  }
}

/**
 * 获取排过序的场次列表
 * @param list
 * @param sort 是否排序
 */
function setTimeSessionList(list: Array<SessionDataType>, sort?: boolean) {
  const data: Array<SessionDataType> = JSON.parse(JSON.stringify(list))
  data.forEach(session => {
    addDateFormat(session)
  })
  if (sort) {
    data.sort((a, b) => {
      if (a.start_date === b.start_date) {
        return a.end_date - b.end_date
      } else {
        return a.start_date - b.start_date
      }
    })
  }
  return data
}

function getSessionsInOrder(data: Array<SessionDataType>, guestHash = '') {
  const list = JSON.parse(JSON.stringify(data))
  const newList: NewListType = {}
  let tabValue = ''
  let isToday = false
  for (let i = 0; i < list.length; i++) {
    const element = list[i]
    if (guestHash && !_.find(element.guest_list, {hash: guestHash})) {
      continue
    }

    let cn = ''
    let en = ''
    const start: number = element.start_date
    cn = dayjs(start).format('M月D日')
    en = dayjs(start).format('MMM D')
    const showDate = {en, cn}

    const sts = new Date(element.start_date)
    let date: number | string = sts.getDate()
    date = date < 10 ? '0' + date : date
    const month = sts.getMonth() + 1
    const year = sts.getFullYear()
    const ts = new Date(month + '/' + date + '/' + year).getTime()
    if (i == 0) {
      tabValue = ts.toString()
    }
    if (!isToday && (sts.toDateString() === new Date().toDateString() || sts.getTime() >= Date.now())) {
      isToday = true
      tabValue = ts.toString()
    }
    if (newList[ts]) {
      newList[ts].lives.push(element)
    } else {
      const obj = {
        name: ts.toString(),
        label: showDate,
        lives: [element],
      }
      newList[ts] = obj
    }
  }
  return {newList, tabValue}
}

// 记录每个进入到session里面的用户
// async function fetchNewSessionData(sectionId) {
//   const eventId = store.getters.currentEventId
//   let result = null
//   await axios
//     .post('/api/node', {
//       nodeId: sectionId,
//       eventId: eventId,
//     })
//     .then(({data}) => {
//       result = data
//     })
//   return result
// }

// export {getSessionListWithGuest, getSingleSession, getSessionsInOrder, fetchNewSessionData}
export {getSessionListWithGuest, getSessionsInOrder, initSessionDate, addDateFormat, setTimeSessionList}
