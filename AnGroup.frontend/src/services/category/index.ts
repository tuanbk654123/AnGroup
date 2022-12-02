import { httpService } from '../http'

export const categoryServices = {
  getAll: async (forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/categorys/getall/forSelect` : `/api/cms/categorys/getall`
    const response = await httpService.get(url, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string, forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/categorys/getbyid?id=${id}/forSelect` : `/api/cms/categorys/getbyid?id=${id}`
    const response = await httpService.get(url)
    return response
  },
  updateId: async (data: any) => {
    //const { id } = data
    const response = await httpService.post(`/api/cms/categorys/update`,data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/cms/categorys/create`, data)
    return response
  },
  search: async (data: any) => {
    const response = await httpService.post(`/api/cms/categorys/search`, data)
    return response
  },
  updateIdStatus: async (data: any) => {
    // const { id } = data
    // const { status } = data
    const response = await httpService.delete(`/api/cms/categorys/deletelist?ids=${data}`)
    return response
  },
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await httpService.post(`/api/file/image/upload?folder=CMS`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  },
  getCategoryParent: async () => {
    const response = await httpService.get(`/api/cms/categorys/getcategoryparent`, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getCategoryParentUpdate: async (id: number) => {
    const response = await httpService.get(`/api/cms/categorys/getcategoryparentupdate?id=${id}`, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
}
