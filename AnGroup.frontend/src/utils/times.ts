import moment from 'moment'
export const formatTimeInTable = (date: string) => {
  return moment(date).format('DD/MM/YYYY HH:mm')
}

export const formatTimeUS = (date: string) => {
  return moment(date).format('YYYY/MM/DD HH:mm')
}
export const formatTimeUSEndOf = (date: string) => {
  return moment(date).endOf('day').format('YYYY/MM/DD HH:mm')
}
