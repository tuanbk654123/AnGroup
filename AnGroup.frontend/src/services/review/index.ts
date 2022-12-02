import { Review } from '~/types'
import { ListResponse } from '~/types/common'

import axiosInstance from '../http'
import { ReviewFilterTypes } from './index.type'

export const reviewServices = {
  // getAll: async () => {
  //   const response = await httpService.post('/api/module/search/', {})
  //   return response
  // },
  // getAll(): Promise<ListResponse<Review>> {
  //   const url = '/api/docs/profileRatings/getall'
  //   return axiosInstance.get(url, {})
  // },
  getAll(reviewFilter: ReviewFilterTypes): Promise<ListResponse<Review>> {
    const url = '/api/docs/profileRatings/search'
    return axiosInstance.post(url, reviewFilter)
  },

  getById(reviewId: number): Promise<any> {
    const url = `/api/docs/profileRatings/get/${reviewId}`
    return axiosInstance.get(url)
  },
}
