export function randomRange(min: number, max?: number) {
  let returnStr = ''
  const range = max ? Math.round(Math.random() * (max - min)) + min : min
  const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < range; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1))
    returnStr += charStr.substring(index, index + 1)
  }
  return returnStr
}

export function randomId() {
  return `${randomRange(8)}-${randomRange(4)}-${randomRange(4)}-${randomRange(12)}`
}

export function regUrl(str: string) {
  const strRegex = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g

  return str.replace(strRegex, function ($url) {
    return `<a href="${!$url.startsWith('http') ? 'https://' + $url : $url}" target="_blank">${$url}</a>`
  })
}

export function handleEmoji(value: any) {
  const arr = value.split('[em_')
  let newStr = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].indexOf(']') == 1) {
      const imgNum = Number(arr[i].slice(0, 1))
      if (imgNum >= 1 && imgNum <= 80) {
        arr[i] =
          '<img style="vertical-align: sub; margin: 0 2px; display: inline;" width="18" height="18" src="' +
          require('@/assets/images/emoji/' + imgNum + '.png') +
          '">' +
          arr[i].slice(2)
      } else {
        arr[i] = '[em_' + arr[i]
      }
    } else if (arr[i].indexOf(']') == 2) {
      const imgNum = Number(arr[i].slice(0, 2))
      if (imgNum >= 1 && imgNum <= 80) {
        arr[i] =
          '<img style="vertical-align: sub; margin: 0 2px; display: inline;" width="18" height="18" src="' +
          require('@/assets/images/emoji/' + imgNum + '.png') +
          '">' +
          arr[i].slice(3)
      } else {
        arr[i] = '[em_' + arr[i]
      }
    } else {
      arr[i] = '[em_' + arr[i]
    }
    newStr += arr[i]
  }
  return newStr
}

export function getObjectURL(file: any) {
  let url = null
  if ((window as any).createObjectURL != undefined) {
    // basic
    url = (window as any).createObjectURL(file)
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

export function openAccount() {
  window.open((window as any).NANJING_URL, '_self')
}