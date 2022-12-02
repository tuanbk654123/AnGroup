import { httpService } from '../http'

export const configDetailPageCrawlServices = {
  getById: async (id: number | string, forSelect?: boolean) => {
    const url = forSelect ? `/api/cms/configDetailPageCrawl/getbyid?id=${id}/forSelect` : `/api/cms/configDetailPageCrawl/getbyid?id=${id}`
    const response = await httpService.get(url)
    return response
  },
  updateId: async (data: any) => {
    //const { id } = data
    const response = await httpService.put(`/api/cms/configDetailPageCrawl/update`, data)
    return response
  },
  create: async (data: any) => {
    const response = await httpService.post(`/api/cms/configDetailPageCrawl/create`, data)
    return response
  },
  
}
