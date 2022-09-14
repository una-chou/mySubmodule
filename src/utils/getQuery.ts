//截取参数值,传入参数名就行了
export function getQueryString(name: string, str?: string, symbol?: string) {
  const search = window.location.search == '' ? window.location.hash : window.location.search
  str = str == null ? search : str
  symbol = symbol == null ? '&' : symbol
  const reg = new RegExp('(\\?|&)' + name + '=([^' + symbol + ']*)(' + symbol + '|$)', 'i')
  const r = str.match(reg)
  if (r != null) return unescape(r[2])
  return ''
}
