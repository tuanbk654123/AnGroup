import { NotificationFilterTypes } from '~/services/notification/index.type'
import { PaginationResponse } from '~/types/common'

interface resultData {
  avatar: string
  banner: string
  content: string
  createdBy: string
  createdDate: string
  description: string
  exdata: string
  id: string
  isDeleted: 'N'
  isall: 'Y'
  modifiedBy: string
  modifiedDate: string
  rnum: 1
  route: string
  status: string
  title: string
  token: string
  topic: string
}

export type CreateSuccessResponse = {
  data: {
    title: string
    description: string
    content: string
    avatar: string
  }
  message: string
}

export interface INotificationState {
  dataNotification?: {
    result: resultData[]
  }
  loading: boolean
  pagination: PaginationResponse
}

export interface ICreateNotificationRequest {
  notification?: {
    title: string
    description: string
    content: string
    avatar: string
    tags: string
    status: string
  }
  onSuccess?: (data?: CreateSuccessResponse) => void
  onError?: (error?: any) => void
}

export interface IUpdateNotificationRequest {
  notification?: {
    id: string
    title: string
    description: string
    content: string
    banner: string
    avatar: string
    status: string
    isall: string
    topic: string
    userId: string
    token: string
    route: string
    exdata: string
  }
  onSuccess?: (data?: CreateSuccessResponse) => void
  onError?: (error?: any) => void
}

export interface IFectchNotificationRequest {
  notificationFilters: NotificationFilterTypes
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}
