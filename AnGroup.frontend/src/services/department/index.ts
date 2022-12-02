import { Department } from '~/types'
import { ListResponse, ObjectRespone } from '~/types/common'
import axiosInstance from '../http'
import { DepartmentFilterTypes } from './index.types'

export const departmantServices = {
  getAll(departmentFilter: DepartmentFilterTypes, forSelect): Promise<ListResponse<Department>> {
    const url = forSelect ? `api/docs/departments/search/forSelect` : `api/docs/departments/search`
    return axiosInstance.post(url, departmentFilter)
  },

  getById(departmentId: number): Promise<ObjectRespone<Department>> {
    const url = `/api/docs/departments/get/${departmentId}`
    return axiosInstance.get(url)
  },

  create(department: Partial<Department>): Promise<ObjectRespone<Department>> {
    const url = '/api/docs/departments/create'
    return axiosInstance.post(url, department)
  },
  edit(department: Partial<Department>): Promise<ObjectRespone<Department>> {
    const url = `/api/docs/departments/update/${department.id}`
    return axiosInstance.put(url, department)
  },
}
