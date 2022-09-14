import axios from 'axios'
import isArray from 'lodash/isArray'
import has from 'lodash/has'
import {getQueryString} from '@/utils/getQuery'
import {Scheme} from '@/enum/scheme'
import router from '@/router/index'
import loginSDK from '@/utils/base'
import {loginGotin} from '@/utils/login'

// import {isYD} from '@/utils/browser'
// import YDHybrid from '@/utils/yd-hybrid'

const createInstance = () => {
  const instance = axios.create({
    timeout: 30000,
    withCredentials: true,
  })


  // 让使用者拿到数据而非原始响应
  instance.interceptors.response.use(
    response => {
      // 伪协议拦截
      if (response.data.code === 50) {
        const value = response.data.data.scheme

        switch (value) {
          // 必须是在登录的前提下去补充个人信息
          case Scheme.LoginBindPhone:
            break
          // 用户需要登陆
          case Scheme.NeedLogin:
            break
          // 用户退出登录后跳转登录
          case Scheme.FlushLogin:
            break
          // 用户退出登录后刷新
          case Scheme.FlushRefresh:
            break
          // 用户需要前往活动x eid=x
          case Scheme.JumpEvent:
            break
          // 用户需要前往日程x sid=x
          case Scheme.JumpSession:
            break
          // 用户需前往绑定手机号页面
          case Scheme.BindPhone:
            localStorage.getItem('Authorization') ? loginGotin('bindphone') : ''
            break
          // 用户需前往绑定邮箱页面
          case Scheme.BindEmail:
          (localStorage.getItem('Authorization')) ? loginGotin('bindemail') : ''
            break;
          // 用户需跳转到404
          case Scheme.Notfound404:
            router.replace({name: '404'})
            break
          // 用户需要跳转到url
          case Scheme.JumpOther:
            break
          // 用户创建主办方需填写问题
          case Scheme.JumpQuestion:
            break
          // 活动密码
          case Scheme.JumpEventPwd:
            break
          // 场次密码
          case Scheme.JumpSessionPwd:
            break
          default:
            break
        }
      }
      return response
    },
    error => {
      return Promise.reject(error)
    },
  )
  return instance
}

const createApiClient = () => ({
  instance: createInstance(),
  errorMiddleware: null,
  retryUrl: null,
  promiseCache: {},
  get(url: string, options = {}): Promise<any> {
    return this.request('get', url, null, options)
  },
  put(url: string, data?: any, options = {}): Promise<any> {
    return this.request('put', url, data, options)
  },
  post(url: string, data = {}, options = {}): Promise<any> {
    return this.request('post', url, data, options)
  },
  patch(url: string, data: any, options = {}): Promise<any> {
    return this.request('patch', url, data, options)
  },
  delete(url: string, data: any = {}, options = {}): Promise<any> {
    return this.request('delete', url, data, options)
  },
  upload(url: string, data: any, files: any[], options = {}): Promise<any> {
    if (isArray(files)) {
      files = files.map((file: any) => ({name: 'source', data: file}))
    } else {
      files = [{name: 'source', data: files}]
    }

    const formData = new FormData()
    files.forEach(file => formData.append(file.name, file.data))
    data.forEach((value: any, key: string) => formData.append(key, value))

    return this.post(url, formData, {...options, forbidReuse: true, timeout: 60000})
  },
  request(method: string, url: string, data: any, options = {}): Promise<any> {
    const params: any = {method, url, data, ...options}

    // this.instance.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'

    const promise: Promise<any> = this.instance
      .request(params)
      .then(response => {
        console.log('成功', response);
        
        if (has(response.data, 'code') && response.data.code !== 0) {
          return Promise.reject({response: {data: response.data.message, code: response.data.code}})
        } else {
          return this.handleSuccess(url, method, response)
        }
      })
      .catch(error => {
        console.log('失败', error);

        return this.handleError(url, method, data, options, error)
      })

    return promise
  },
  handleError(url: string, method: string, data: any, options: any, error: any): Promise<any> | void {
    const responseError = error && error.response && error.response.status >= 500 ? error.response.data : error.response
    if (
      error.response?.data?.indexOf('user not found') > -1 ||
      error.response?.data?.indexOf('Authentication is possible but has failed') > -1 ||
      (responseError && responseError.code === 10)
    ) {
      // if (isYD()) {
      //   YDHybrid.sendTokenInvalid()
      // } else {
      //   ;(window as any).GameEmitter.emit('wrongNetwork', {id: 20027})
      // }
      ;(window as any).GameEmitter.emit('wrongNetwork', {id: 20027})
      return
    }
    // 超时处理
    if (error.message?.includes('timeout') || !window.navigator.onLine) {
      ;(window as any).GameEmitter.emit('wrongNetwork', {id: 20027})
      return
    }
    return Promise.reject(responseError)
  },
  handleSuccess(url: string, method: string, response: any): Promise<any> {
    return Promise.resolve(response.data.data)
  },
  // 设置参数
  setBaseUrl(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL
  },
  setToken(token: string | null): void {
    // this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    this.instance.defaults.headers.common['Authorization'] = token
  },
  delToken(): void {
    this.instance.defaults.headers.common['Authorization'] = ''
  },
  setI18n(lang?: string): void {
    console.log(lang)
    if (lang) {
      this.instance.defaults.headers.common['X-I18n-Language'] = lang
    } else {
      this.instance.defaults.headers.common['X-I18n-Language'] =
        localStorage.getItem('i18nLanguage') === 'en' ? 'en-US' : 'zh-CN'
    }
  },
})

const ApiClient = createApiClient()
ApiClient.setBaseUrl(process.env.VUE_APP_BASE_URL as string)
if (getQueryString('token')) {
  // 游客模式也需要Authorization字段
  ApiClient.setToken(getQueryString('token'))
  loginSDK.saveAuth({
    token: getQueryString('token'),
    refresh_token: getQueryString('refresh_token'),
    expired_time: getQueryString('expired_time'),
  })
} else if (loginSDK.getCurrentToken()) {
  ApiClient.setToken(loginSDK.getCurrentToken())
}

// 创建一个不需要token的http请求
export const noTokenApiClient = createApiClient()
noTokenApiClient.instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.common['X-I18n-Language'] =localStorage.getItem('i18nLanguage') === 'en' ? 'en-US' : 'zh-CN'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



export default ApiClient
