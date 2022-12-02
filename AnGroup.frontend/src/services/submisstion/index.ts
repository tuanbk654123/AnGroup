import { ListAllResponse, ListResponse, ObjectRespone } from '~/types/common'
import axiosInstance, { httpService } from '../http'
import { IApiResponse } from '../http/index.types'
import { ISubmissionSearchByNameBody } from './index.types'

export const submissionServices = {
  getAll: async (): Promise<ListAllResponse<any>> => {
    const response = await httpService.get('/api/docs/profile/getall', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response
  },
  getById: async (id: number | string): Promise<ObjectRespone<any>> => {
    const response = await httpService.get(`/api/docs/profile/get/${id}`)
    return response
  },
  update: async (data: any, approve?: boolean, reject?: boolean): Promise<IApiResponse> => {
    const { id } = data
    let url = `/api/docs/profile/update/${id}`
    if(approve){
      url = `/api/docs/profile/update/${id}/approve`
    }
    if(reject){
      url = `/api/docs/profile/update/${id}/reject`
    }
    const response = await httpService.put(url, data)
    // return response
    return new Promise((resolve, reject )=> {
      if (response.kind === 'ok') resolve(response)
      else reject(response) 
    })
  },
  updateIdDoc: async (data: any) => {
    const { profileId } = data
    const response = await httpService.put(`/api/docs/profile/update/${profileId}/iddoc`, data)
    return response
  },
  updateResidenceDoc: async (data: any) => {
    const { profileId } = data
    const response = await httpService.put(`/api/docs/profile/update/${profileId}/residencedoc`, data)
    return response
  },
  updateApplication: async (data: any) => {
    const { profileId } = data
    const response = await httpService.put(`/api/docs/profile/update/${profileId}/application`, data)
    return response
  },
  searchByName: async (data: ISubmissionSearchByNameBody): Promise<ListResponse<any>> => {
    const { subfix, filter, pagination } = data
    const url = '/api/docs/profile/search' + (subfix ? `/${subfix}` : '')
    const response = await httpService.post(url, { filter, pagination })
    return response
  },

  assignSale: async ({ submissionIds, userId }: { submissionIds: number[]; userId: number | string }) => {
    const response = await httpService.put(`/api/docs/profile/assignsale/${userId}`, submissionIds)
    return response
  },

  getAllLogById: async ({ id }: { id: string | number }): Promise<ListAllResponse<any>> => {
    const response = await httpService.get(`/api/docs/profile/getlog/${id}`)
    return response
  },

  searchLogById: async ({
    id,
    filterBody,
  }: {
    id: string | number
    filterBody: ISubmissionSearchByNameBody
  }): Promise<ListResponse<any>> => {
    const response = await httpService.post(`/api/docs/profile/searchlog/${id}`, filterBody)
    return response
  },

  getSource: async (): Promise<ListAllResponse<any>> => {
    const response = await httpService.get(`/api/docs/profile/getsource`)
    return response
  },

  getAddress: async (params: { level: number; code?: number }): Promise<ListAllResponse<any>> => {
    const response = await httpService.get(`/api/docs/profile/getaddress`, {
      params,
    })
    return response
  },
  getAddressCity: async (params: { level: number; code?: number }): Promise<ListAllResponse<any>> => {
    const response = await httpService.get(`/api/docs/profile/getaddress`, {
      params,
    })
    return response
  },
  getAddressDistrict: async (params: { level: number; code?: number }): Promise<ListAllResponse<any>> => {
    const response = await httpService.get(`/api/docs/profile/getaddress`, {
      params,
    })
    return response
  },
  getAddressWard: async (params: { level: number; code?: number }): Promise<ListAllResponse<any>> => {
    const response = await httpService.get(`/api/docs/profile/getaddress`, {
      params,
    })
    return response
  },
  updateEditting(isEditting: boolean, profileId: number): Promise<ObjectRespone<any>> {
    const url = '/api/module/execute/02906'
    const dataNew = {
      data: {
        isEditing: isEditting ? 'Y' : 'N',
        profileId: profileId
      },
    }
    return axiosInstance.post(url, dataNew);
  },
}
