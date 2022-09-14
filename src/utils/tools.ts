// 扁平数据
export function flatData(obj: any) {
  if (!obj) return null
  let result = JSON.parse(JSON.stringify(obj))
  if (obj.properties) {
    result = {
      ...obj,
      ...obj.properties,
    }
  }
  if (obj.asset) {
    result = {
      ...obj,
      ...obj.asset,
    }
  }
  return result
}

export const getLang = () => {
  return localStorage.getItem('i18nLanguage') || 'cn'
}

export function openUrl(url: string, download?: boolean) {
  const a = document.createElement('a')
  a.href = url
  if (!download) a.target = '_blank'
  a.click()
}
