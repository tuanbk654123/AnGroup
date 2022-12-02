import { AitherConfigFilterTypes } from '~/services/aither-config/index.type'
import { PaginationResponse } from '~/types/common'
import { IBaseMiddlewareRequest } from '../index.types'
export interface IAitherConfigState {
  dataAitherConfig?: {
    result: any[]
  }
  loading: boolean
  pagination: PaginationResponse
}
export type CreateSuccessResponse = {
  data: {
    grname: string
    rnum: number
    vardesc: string
    varname: string
    varvalue: string
    modifiedDate: string
    modifyBy: string
    status: string
  }
  message: string
  status: number
}
export interface IFectchAitherConfigRequest {
  atherConfigFilter: AitherConfigFilterTypes
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}
export interface ICreateAitherConfigRRequest {
  aitherConfig?: {
    vargroup: string
    varname: string
    varvalue: string
    status: string
  }
  onSuccess?: (data?: CreateSuccessResponse) => void
  onError?: (error?: any) => void
}

export interface IAitherConfigRequest extends IBaseMiddlewareRequest<any> {}
