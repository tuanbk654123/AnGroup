import { Helps } from '~/types'
import { ListResponse, ObjectRespone } from '~/types/common'
import axiosInstance, { httpService } from '../http'
import { HelpsFilterTypes } from './index.type'

export const helpsServices = {
  // getAll: async () => {
  //   const response = await httpService.post('/api/module/search/', {})
  //   return response
  // },
  getAll(helpsFilters: HelpsFilterTypes): Promise<ListResponse<Helps>> {
    const url = '/api/module/search/03303'
    return axiosInstance.post(url, helpsFilters)
  },
  create(helps): Promise<ObjectRespone<Helps>> {
    const url = '/api/module/execute/02303'
    const dataNew = {
      data: {
        ...helps,
      },
    }
    return axiosInstance.post(url, dataNew)
  },
  update: async (helps) => {
    const dataNew = {
      data: {
        ...helps,
      },
    }

    const response = await httpService.post(`/api/module/execute/023E3`, dataNew)
    return response
  },
}
