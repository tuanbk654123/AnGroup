import { ListAllResponse, ObjectRespone } from '~/types/common'
import { SystemReason, SystemStatus } from '~/types/system'
import axiosInstance from '../http'

export const systemServices = {
  getAllStatus(forSelect?: boolean): Promise<ListAllResponse<SystemStatus>> {
    const url = forSelect ? '/api/docs/system/getall/status/forSelect' : '/api/docs/system/getall/status'
    return axiosInstance.get(url)
  },
  editStatus(recordEdit: SystemStatus): Promise<ObjectRespone<SystemStatus>> {
    const url = `/api/docs/system/update/status/${recordEdit.id}`
    return axiosInstance.put(url, recordEdit)
  },
  getAllReason(forSelect?: boolean): Promise<ListAllResponse<SystemReason>> {
    const url = forSelect ? `/api/docs/system/getall/reason/forSelect` : '/api/docs/system/getall/reason'
    return axiosInstance.get(url)
  },
  editReason(recordEdit: SystemReason): Promise<ObjectRespone<SystemReason>> {
    const url = `/api/docs/system/update/reason/${recordEdit.id}`
    return axiosInstance.put(url, recordEdit)
  },
  deleteReason(recordId: number | string): Promise<ObjectRespone<SystemReason>> {
    const url = `/api/docs/system/delete/reason/${recordId}`
    return axiosInstance.delete(url)
  },
  createReason(reason: SystemReason): Promise<ObjectRespone<SystemReason>> {
    const url = `/api/docs/system/create/reason`
    return axiosInstance.post(url, reason)
  },
}
