import { httpService } from '../http'

export const creativePostServices = {
  getAll: async (forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/creativepost/getall/forSelect` : `/api/cms/creativepost/getall`
    const response = await httpService.get(url, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string, forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/creativepost/getbyid?id=${id}/forSelect` : `/api/cms/creativepost/getbyid?id=${id}`
    const response = await httpService.get(url)
    return response
  },
  updateId: async (data: any) => {
    //const { id } = data
    const response = await httpService.post(`/api/cms/creativepost/update`, data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/cms/creativepost/create`, data)
    return response
  },
  delete: async (data: any) => {
    const response = await httpService.delete(`/api/cms/creativepost/delete?id=${data}`)
    return response
  },
  // upload: async (data: any) => {
  //   const response = await httpService.post(` /api/cms/file/UploadFile`,data )
  //   return response
  // },
  search: async (data: any, forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/creativepost/search/forSelect` : `/api/cms/creativepost/search`
    const response = await httpService.post(url, data)
    return response
  },
  updateIdStatus: async (data: any) => {
    const { id } = data
    const { status } = data
    const response = await httpService.put(`/api/cms/creativepost/status/${id}/${status}`, {})
    return response
  },
  updateListIdStatus: async (data: any) => {
    const { id } = data
    const { status } = data
    const{dateCalendar}=data
    const{note}=data
    if(dateCalendar==null){
      const response = await httpService.post(`/api/cms/creativepost/updatelist?status=${status}`, {ids:id,note:note})
    return response
    }
    else{
      const response = await httpService.post(`/api/cms/creativepost/updatelist?status=${status}&ScheduledPublishedDate=${dateCalendar}`, {ids:id,note:note})
      return response
    }
    
  },
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('UploadedFile', file)
    const response = await httpService.post(`/api/cms/file/UploadFile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  },
  updateListIdShow: async (data: any) => {
    const { id } = data
      const response = await httpService.post(`/api/cms/creativepost/updatelistshow`, id)
    return response
    
  },
  deleteListId: async (data: any) => {
    // const { id } = data
    // const { status } = data
    const response = await httpService.delete(`/api/cms/creativepost/deletelist?ids=${data}`)
    return response
  },
}
