export function getEventAlias(): string {
  const hostname: string = window.location.hostname
  const arr: Array<string> = hostname.split('.')
  return arr[0]
}

export function mobileOS(): string {
  const userAgent = navigator.userAgent || navigator.vendor
  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    return 'iOS'
  } else if (userAgent.match(/Android/i)) {
    return 'Android'
  } else {
    return 'unknown'
  }
}

export function isYD(): boolean {
  return /youdaappnative/i.test(navigator.userAgent)
}

export function isWechat(): boolean {
  return /micromessenger/i.test(navigator.userAgent)
}

export function isFeishu(): boolean {
  return /lark/i.test(navigator.userAgent)
}

export function browserType(): string {
  const userAgent = navigator.userAgent
  const isMsie = userAgent.indexOf('MSIE ') > 0
  const isTrident = userAgent.indexOf('Trident/') > 0
  const isEdge = userAgent.indexOf('Edge/') > 0
  const isOpera = userAgent.indexOf('Opera') > 0
  const isFF = userAgent.indexOf('Firefox') > 0
  const isSafari = userAgent.indexOf('Safari') > 0 && userAgent.indexOf('Chrome') === -1
  const isChrome = userAgent.indexOf('Chrome') > 0 && userAgent.indexOf('Safari') > 0 && !isEdge
  if (isMsie || isTrident) {
    return 'IE'
  }
  if (isFF) {
    return 'FF'
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
  if (isEdge) {
    return 'Edge'
  }
  return ''
}

export function checkRTCPeerConnection() {
  return window.RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection
}
