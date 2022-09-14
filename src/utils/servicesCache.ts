// 对 server 增加缓存功能。
/**
 * 考虑问题：
 * 1. 强制更新。
 * 2. 数据根据唯一key缓存
 */
interface cacheItem {
  [key: string]: any
}
interface cacheType {
  [propName: string]: cacheItem
}

const cache: cacheType = {} // 所有缓存。
const requests: any = {} // 所有已发出的请求。
// 增加数据调试
if (process.env.NODE_ENV === 'development') {
  ;(<any>window).servicesCache = {
    cache, //  window.servicesCache.cache
    requests, //  window.servicesCache.requests
  }
} 
// 深拷贝
const copy = (value: any) => JSON.parse(JSON.stringify(value))
/**
 * request：请求
 * args: 请求的参数
 */
export default async (request: Function, args: any[]) => {
  let result: any = null
  const url = args[0]
  // 判断缓存中是否存在。
  if (cache[url]) {
    return cache[url]
  }
  const k = url  // 没有直接使用 sort 为了防止返回数据与传入key顺序不匹配
  // 对请求进行一个缓存，防止并发
  if (k in requests) {
    return requests[k]
  }
  // 没有缓存数据 && 没有在请求的同请求 || 强制刷新
  requests[k] = Promise.race([request(...args)]) // 使用 race 并发时之请求一个 request
  const res = await requests[k]
  delete requests[k] // 用完就扔。
  // 数据进行缓存。
  cache[url] = res
  result = copy(res)
  return result
}
