import {useI18n} from 'vue-i18n'
import dayjs from 'dayjs'

export function formatEventFullDate(unixTime: number) {
  const {locale} = useI18n()
  if (locale.value === 'en') {
    return dayjs.unix(unixTime).format('MMM D,h:mm A')
  } else {
    return dayjs.unix(unixTime).format('M月D日 h:mm A')
  }
}

export function fromatSessionTime(unixTime: number) {
  return dayjs.unix(unixTime).format('h:mmA')
}
