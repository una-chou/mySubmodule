function timeShow(ts: string | number, i18n: string): string {
  ts = Number(ts) * 1000
  if (!ts) return '--'
  const oDate: Date = new Date(ts),
    oYear: number = oDate.getFullYear(),
    oMonth: number = oDate.getMonth() + 1,
    oDay: number = oDate.getDate()
  let oHour: number | string = oDate.getHours(),
    oMin: number | string = oDate.getMinutes()
  oHour = oHour <= 9 ? '0' + oHour : oHour
  oMin = oMin <= 9 ? '0' + oMin : oMin
  const zeroTime: number = new Date(new Date().toLocaleDateString()).getTime()
  const yestodayZeroTime: number = new Date(new Date().toLocaleDateString()).getTime() - 1000 * 60 * 60 * 24
  const yearZeroTime: number = new Date(new Date().getFullYear() + '/1/1').getTime()

  if (ts >= zeroTime) {
    return `${oHour}:${oMin}`
  } else if (ts >= yestodayZeroTime) {
    if (i18n == 'cn') {
      return `昨天 ${oHour}:${oMin}`
    } else {
      return `Yesterday, ${oHour}:${oMin}`
    }
  } else if (ts >= yearZeroTime) {
    if (i18n == 'cn') {
      return `${oMonth}月${oDay}日 ${oHour}:${oMin}`
    } else {
      const monthStr = oDate.toString().split(' ')[1]
      return `${monthStr} ${oDay}, ${oHour}:${oMin}`
    }
  } else {
    if (i18n == 'cn') {
      return `${oYear}年${oMonth}月${oDay}日 ${oHour}:${oMin}`
    } else {
      const monthStr = oDate.toString().split(' ')[1]
      return `${monthStr} ${oDay},${oYear}, ${oHour}:${oMin}`
    }
  }
}
export {timeShow}
