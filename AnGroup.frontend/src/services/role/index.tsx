import { Role } from '~/types'
import { ObjectRespone } from '~/types/common'
import axiosInstance, { httpService } from '../http'
import { IRoleSearchByNameBody } from './index.type'

export const roleServices = {
  getAll: async (forSelect?: boolean) => {
    const url = forSelect ? '/api/docs/role/getall/forSelect' : '/api/docs/role/getall'
    const response = await httpService.get(url, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string) => {
    const response = await httpService.get(`/api/docs/role/get/${id}`)
    return response
  },
  create: async (data) => {
    const response = await httpService.post('/api/docs/role/create', data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },
  update: async (data) => {
    const id = data.id
    const response = await httpService.put(`/api/docs/role/update/${id}`, data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },
  searchByName: async (data: IRoleSearchByNameBody) => {
    const response = await httpService.post('api/docs/role/search', data)
    return response
  },

  changeStatus(roleId: number): Promise<ObjectRespone<Role>> {
    const url = `/api/docs/role/${roleId}/activate`
    return axiosInstance.put(url)
  },
}
