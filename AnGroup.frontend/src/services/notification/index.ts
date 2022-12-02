import { Notification } from '~/types'
import { ListResponse, ObjectRespone } from '~/types/common'
import axiosInstance, { httpService } from '../http'
import { NotificationFilterTypes } from './index.type'

export const notificationServices = {
  getAll(notificationFilters: NotificationFilterTypes): Promise<ListResponse<Notification>> {
    const url = '/api/module/search/03304'
    return axiosInstance.post(url, notificationFilters)
  },
  update: async (notificationFilters) => {
    const dataNew = {
      data: {
        ...notificationFilters,
      },
    }
    const response = await httpService.post(`/api/module/execute/023E4`, dataNew)
    return response
  },
  create(notification): Promise<ObjectRespone<Notification>> {
    const url = '/api/module/execute/02304'
    const dataNew = {
      data: {
        ...notification,
      },
    }
    return axiosInstance.post(url, dataNew)
  },
}
