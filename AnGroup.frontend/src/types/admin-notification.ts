export type NotificationAdmin = {
  id: number | string
  userId: string
  isRead: boolean
  title: string
  content: string
  createdBy: string
  createdDate: string
  modifiedBy: null | string
  modifiedDate: null | string
  profileInfo?: any
  saleInfo?: any
}
