import { httpService } from '../http'

export const programServices = {
  getAll: async () => {
    const response = await httpService.get('/api/docs/program/getall', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string, forSelect?: boolean) => {
    const url = forSelect ? `/api/docs/program/get/${id}/forSelect` : `/api/docs/program/get/${id}`
    const response = await httpService.get(url)
    return response
  },
  updateId: async (data: any) => {
    const { id } = data
    const response = await httpService.put(`/api/docs/program/update/${id}`, data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/docs/program/create`, data)
    return response
  },
  updateIdStatus: async (data: any) => {
    const { id } = data
    const { status } = data
    const response = await httpService.put(`/api/docs/program/status/${id}/${status}`, {})
    return response
  },
}
