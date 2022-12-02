import { httpService } from '../http'

export const configCategoryHomeCrawlServices = {
  getAll: async (forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/linkHomeCrawl/getall/forSelect` : `/api/cms/linkHomeCrawl/getall`
    const response = await httpService.get(url, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string, forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/configCategoryHomeCrawl/getbyid?id=${id}/forSelect` : `/api/cms/configCategoryHomeCrawl/getbyid?id=${id}`
    const response = await httpService.get(url)
    return response
  },
  updateId: async (data: any) => {
    //const { id } = data
    const response = await httpService.put(`/api/cms/configCategoryHomeCrawl/update`, data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/cms/configCategoryHomeCrawl/create`, data)
    return response
  },
  delete: async (data: any) => {
    const response = await httpService.delete(`/api/cms/linkHomeCrawl/delete?id=${data}`)
    return response
  },
  search: async (data: any, forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/linkHomeCrawl/search/forSelect` : `/api/cms/linkHomeCrawl/search`
    const response = await httpService.post(url, data)
    return response
  },
  checkData: async (id: number) => {
    const url =  `/api/cms/linkHomeCrawl/checkconfig?id=${id}`
    const response = await httpService.get(url)
    return response
  },
  updateIdStatus: async (data: any) => {
    const { id } = data
    const { status } = data
    const response = await httpService.put(`/api/cms/linkHomeCrawl/status/${id}/${status}`, {})
    return response
  },
  updateListIdStatus: async (data: any) => {
    const { id } = data
    const { status } = data
    const{dateCalendar}=data
    if(dateCalendar==null){
      const response = await httpService.post(`/api/cms/linkHomeCrawl/updatelist?status=${status}`, id)
    return response
    }
    else{
      const response = await httpService.post(`/api/cms/linkHomeCrawl/updatelist?status=${status}&ScheduledPublishedDate=${dateCalendar}`, id)
      return response
    }
    
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
  updateListIdShow: async (data: any) => {
    const { id } = data
      const response = await httpService.post(`/api/cms/linkHomeCrawl/updatelistshow`, id)
    return response
    
  },
  deleteListId: async (data: any) => {
    // const { id } = data
    // const { status } = data
    const response = await httpService.delete(`/api/cms/linkHomeCrawl/deletelist?ids=${data}`)
    return response
  },
}
