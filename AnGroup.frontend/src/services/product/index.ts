import { httpService } from '../http'

export const productServices = {
  getAll: async (forSelect?: boolean) => {
    const url = forSelect ? `/api/docs/products/getall/forSelect` : `/api/docs/products/getall`
    const response = await httpService.get(url, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string, forSelect?: boolean) => {
    const url = forSelect ? `/api/docs/products/get/${id}/forSelect` : `/api/docs/products/get/${id}`
    const response = await httpService.get(url)
    return response
  },
  updateId: async (data: any) => {
    const { id } = data
    const response = await httpService.put(`/api/docs/products/update/${id}`, data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/docs/products/create`, data)
    return response
  },
  search: async (data: any, forSelect?: boolean) => {
    const url = forSelect ? `/api/docs/products/search/forSelect` : `/api/docs/products/search`
    const response = await httpService.post(url, data)
    return response
  },
  updateIdStatus: async (data: any) => {
    const { id } = data
    const { status } = data
    const response = await httpService.put(`/api/docs/products/status/${id}/${status}`, {})
    return response
  },
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await httpService.post(`/api/cms/file/UploadFile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  },
}
