import { DepartmentFilterTypes } from '~/services/department/index.types'
import { Department } from '~/types'

export interface IFetchDepartmentRequest {
  forSelect?: boolean
  departmentFilter: DepartmentFilterTypes
  onSuccess?: (data?: Department[]) => void
  onError?: (error?: any) => void
}
