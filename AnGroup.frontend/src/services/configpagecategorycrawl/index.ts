import { httpService } from '../http'

export const configPageCategoryCrawlServices = {
  getById: async (id: number | string, forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/configPageCategoryCrawl/getbyid?id=${id}/forSelect` : `/api/cms/configPageCategoryCrawl/getbyid?id=${id}`
    const response = await httpService.get(url)
    return response
  },
  updateId: async (data: any) => {
    //const { id } = data
    const response = await httpService.put(`/api/cms/configPageCategoryCrawl/update`, data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/cms/configPageCategoryCrawl/create`, data)
    return response
  },
  
}
