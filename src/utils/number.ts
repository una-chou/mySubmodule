export function twoDigits(value: any) {
  if (value.toString().length <= 1) {
    return '0' + value.toString()
  }
  return value.toString()
}
