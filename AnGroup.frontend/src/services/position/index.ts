import { Position } from '~/types'
import { ListResponse } from '~/types/common'
import axiosInstance from '../http'
import { PositionFilterTypes } from './index.types'

export const positionServices = {
  getPosition(positionFilter: PositionFilterTypes, forSelect?: boolean): Promise<ListResponse<Position>> {
    const url = forSelect ? 'api/docs/positions/search/forSelect' : 'api/docs/positions/search'
    return axiosInstance.post(url, positionFilter)
  },
}
