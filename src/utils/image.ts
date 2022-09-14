export function getImageFullUrl(url: string) {
  if (!url) {
    return ''
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  if (/^\//i.test(url)) {
    return `${process.env.VUE_APP_OSS_BASE_URL}${url}`
  }

  return `${process.env.VUE_APP_OSS_BASE_URL}/${url}`
}
