
// 判断 string 类型
export function isString(v: any) {
  return typeof v === 'string'
}

// http 链接转化成 https
export function toHttps(url: any) {
  if (!isString(url)) {
    return url
  }
  return url.replace('http://', 'https://')
}

// 补0函数
export function addZero(s: number) {
  return s < 10 ? '0' + s : s
}

// 把歌曲时长变成 03:15 这样的
export function durationFormat(value :number) {
  let minute = Math.floor(value / 60)
  let second = Math.floor(value % 60)
  return `${addZero(minute)}:${addZero(second)}`
}