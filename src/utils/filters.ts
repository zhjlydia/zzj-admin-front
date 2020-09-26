import dayjs from 'dayjs'

/** 日期格式化 */
export function formatDate(date : string, format : string = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return '未知'
  }
  return dayjs(date).format(format)
}
