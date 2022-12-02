import { User } from '~/types'
import { ListResponse, ObjectRespone } from '~/types/common'
import axiosInstance, { httpService } from '../http'
import { UserFilterTypes } from './index.type'

export const userServices = {
  getAll(userFilter: UserFilterTypes, forSelect?: boolean): Promise<ListResponse<User>> {
    const url = forSelect || userFilter.forSelect  ? `/api/cms/user/search/forSelect` : `/api/cms/user/search`
    return axiosInstance.post(url, userFilter)
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/cms/user/create`, data)
    return response
  },
  // create(user): Promise<ObjectRespone<User>> {

  //   const url = '/api/cms/user/create'
  //   return axiosInstance.post(url, user)
  // },
  search: async (data) => {
    const response = await httpService.post('/api/cms/user/search', data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },
  edit(userId: number, user: User): Promise<ObjectRespone<User>> {
    const url = `api/cms/user/update`
    return axiosInstance.post(url, user)
  },
  getById(userId: number): Promise<ObjectRespone<User>> {
    const url = `/api/cms/user/getbyid?id=${userId}`
    return axiosInstance.get(url)
  },
  changeStatus(useId: number): Promise<ObjectRespone<User>> {
    const url = `/api/cms/user/${useId}/activate`
    return axiosInstance.post(url)
  },
  delete(userId: number): Promise<ObjectRespone<number>> {
    const url = `api/cms/user/inactive/${userId}`
    return axiosInstance.delete(url)
  },
  updateIdStatus: async (data: any) => {
    // const { id } = data
    // const { status } = data
    const response = await httpService.delete(`/api/cms/user/deletelist?ids=${data}`)
    return response
  },
  getUserById:async(userId: number)=> {
    const url = `/api/cms/user/getbyid?id=${userId}`
    const response = await httpService.get(url)
    return response
    //return axiosInstance.get(url)
  },
  deleteList: async (data: any) => {
    const response = await httpService.delete(`/api/cms/user/delete?id=${data}`)
    return response
  },
}
