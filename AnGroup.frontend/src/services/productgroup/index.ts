import { httpService } from '../http'

export const productgroupServices = {
  getAll: async () => {
    const response = await httpService.get('/api/docs/productgroup/getall', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string) => {
    const response = await httpService.get(`/api/docs/productgroup/get/${id}`)
    return response
  },
  updateId: async (data: any) => {
    const { id } = data
    const response = await httpService.put(`/api/docs/productgroup/update/${id}`, data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/docs/productgroup/create`, data)
    return response
  },
  updateIdStatus: async (data: any) => {
    const { id } = data
    const { status } = data
    const response = await httpService.put(`/api/docs/productgroup/status/${id}/${status}`, {})
    return response
  },
}
