import { AitherConfig } from '~/types/aither-config'
import { ListResponse } from '~/types/common'
import axiosInstance, { httpService } from '../http'
import { AitherConfigFilterTypes } from './index.type'

export const aitherConfigServices = {
  // getAll: async () => {
  //   const response = await httpService.post('/api/module/search/', {})
  //   return response
  // },
  getAll(atherConfigFilter: AitherConfigFilterTypes): Promise<ListResponse<AitherConfig>> {
    const url = '/api/module/search/03001'
    return axiosInstance.post(url, atherConfigFilter)
  },
  update: async (aitherConfig) => {
    const dataNew = {
      data: {
        ...aitherConfig,
      },
    }

    const response = await httpService.post(`/api/module/execute/020E1`, dataNew)
    return response
  },
}
