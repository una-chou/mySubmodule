import {computed} from 'vue'
import {useStore} from 'vuex'
import dayjs from 'dayjs'
import type {StateType} from '@/types'
import type {UserType} from '@/types/user'
const uuid = require('node-uuid')
const utc = require('dayjs/plugin/utc')

type ParamType = {
  topic?: string
  data_type: 'pv' | 'click' | 'pageshare' | '1v1match'
  data?: any
  session_id?: string | string[]
  element?: any
  coordinate?: string
}

export default function useTrack() {
  const store = useStore<StateType>()
  const user = computed<UserType>(() => store.state.user.user)

  function tracking(param = {} as ParamType) {
    try {
      // data_type: 三种 PV CLICK pageshare
      // __source__: 对应data_type三种值 pv-data click-data page-share-data
      /**
       * click事件时需要传的参数
       * data_type: 不为PV时
       * session_id: sessionId 路由没有sessionId但是需要sessionId时
       * data为动态传递的数据，字段名不定，具体传参可根据数据端要求
       * data内的某些参数含义：type-事件名(如标签筛选) labels_value-标签名  node_id-物料id  target_url-外链 element-点击的元素dom
       */
      // 如有需要获取的固定字段，dom元素可添加name属性，数据层获取name值记录
      const params = {...param}
      const source = {
        pv: 'pv-data',
        click: 'click-data',
        pageshare: 'page-share-data',
        '1v1match': '1v1match',
      }
      const Trackering = new (window as any).Tracker(
        process.env.VUE_APP_LOGHUB_HOST,
        process.env.VUE_APP_LOGHUB_PROJECT,
        process.env.VUE_APP_LOGHUB_LOGSTORE,
        {
          __topic__: params.topic || 'event-frontend',
          __source__: source[params.data_type] || 'pv-data',
        },
      )
      let data = {
        from_url: document.referrer, // 前置路由
        url: window.location.href, // 当前页面url的域名
        path: window.location.pathname, // 当前url的子路径
        param: window.location.search, // 当前url的参数
        type: 'default', // 类型：默认default
        pixels: `${document.body.clientWidth}x${document.body.scrollHeight}`, // 屏幕尺寸 屏幕宽度x总高度
        ...params.data,
      }
      data = JSON.stringify(data)

      // 平台 platform
      const ua = navigator.userAgent.toLowerCase()
      let platform = ''
      if (ua.indexOf('microMessenger') > -1) platform = 'weixin'
      else if (ua.indexOf('weibo') > -1) platform = 'weibo'
      else if (ua.indexOf('android') > -1 || ua.indexOf('adr') > -1) platform = 'android'
      else if (ua.indexOf('iphone') > -1) platform = 'iphone'
      else platform = 'pc'

      Trackering.push('data', data) // 动态数据信息 类型需要是json字符串

      Trackering.push('data_type', params.data_type || 'pv') // 上一个页面的跳转url
      Trackering.push('data_id', uuid.v4()) // 数据id全局唯一
      Trackering.push('event_id', 'event.value.eventId')
      Trackering.push('session_id', 'singleSession.value.uuid' || '')
      Trackering.push('user_id', user.value?.userId || '') // 用户id

      dayjs.extend(utc)
      Trackering.push('event_time', (dayjs() as any).utc().format('YYYY-MM-DD HH:mm:ss')) // 数据采集时间 前端传的 0时区时间
      Trackering.push('user_type', user.value?.userId ? 1 : 2) // 是否是游客 2游客 1注册用户
      Trackering.push('platform', platform) // 平台(访问来源)
      Trackering.push('devices', window.navigator.userAgent) // 设备
      Trackering.push('version_num', 'v11') // 固定字段

      Trackering.logger()
    } catch (e) {
      console.log('上报出错', e)
    }
  }

  return {tracking}
}
