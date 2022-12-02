import { Logwork } from '~/types'
import { ListResponse } from '~/types/common'
import axiosInstance, { httpService } from '../http'
import { LogworkFilterTypes } from './index.type'

export const logworkServices = {
  // getAll: async () => {
  //   const response = await httpService.post('/api/module/search/', {})
  //   return response
  // },
  getAll(logworkFilters: LogworkFilterTypes): Promise<ListResponse<Logwork>> {
    const url = '/api/docs/logWorks/search'
    return axiosInstance.post(url, logworkFilters)
  },
  getById: async (id: number | string) => {
    const response = await httpService.get(`/api/docs/logWorks/get/${id}`)
    return response
  },
}
