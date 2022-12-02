import { ObjectRespone } from '~/types/common'
import axiosInstance, { httpService } from '../http'

export const DashboardServices = {
  search: async (options) => {
    const response = await httpService.get('/api/docs/dashboardStatistics/search', options)
    return response
  },
  searchAdminNotification: async (options) => {
    const response = await httpService.post('/api/docs/dashboardStatistics/searchAsyncNotification', options)
    return response
  },

  changeStatusAdminNotification(id: number): Promise<ObjectRespone<any>> {
    const url = `/api/docs/dashboardStatistics/notification/${id}/changeStatus`
    return axiosInstance.put(url)
  },

  getCountNotificationUnRead: async () => {
    const response = await httpService.get('/api/docs/dashboardStatistics/notification/count/unRead')
    return response
  },
}
