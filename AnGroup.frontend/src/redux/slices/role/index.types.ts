import { IRoleSearchByNameBody } from '~/services/role/index.type'
import { PaginationResponse } from '~/types/common'
import { IBaseMiddlewareRequest } from '../index.types'

export interface IRoleState {
  // id?: number
  // code?: string
  // name?: string
  // isDeleted?: string
  // CreatedDate?: string
  // ModifiedDate?: string
  // note?: string
  // roleMenus?: string[]
  // userRoles?: string[]
  dataRole?: any[]
  dataRoleDetails?: any
  pagination?: PaginationResponse
  loading?: boolean
}

export interface IRoleRequest extends IBaseMiddlewareRequest<any> {}

export interface IRoleSearchByNameFilter extends IBaseMiddlewareRequest<IRoleSearchByNameBody> {}
