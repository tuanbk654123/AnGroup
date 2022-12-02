import { LogworkFilterTypes } from '~/services/logwork/index.type'
import { Logwork } from '~/types'
import { PaginationResponse } from '~/types/common'
import { IBaseMiddlewareRequest } from '../index.types'
export interface ILogworkState {
  dataLogwork?: {
    result: any[]
  }
  loading: boolean
  pagination: PaginationResponse
}
// export type CreateSuccessResponse = {
//   data: {
//     title: string
//     description: string
//     content: string
//     avatar: string
//     tags: string
//   }
//   message: string
// }
export interface IFectchLogworkRequest {
  logworkFilters: LogworkFilterTypes
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}
export interface IFectchLogworkById {
  userLogworkId: number
  onSuccess?: (data?: Logwork) => void
  onError?: (error?: any) => void
}

// export interface ICreateHelpsRequest {
//   helps?: {
//     title: string
//     description: string
//     content: string
//     avatar: string
//     tags: string
//   }
//   onSuccess?: (data?: CreateSuccessResponse) => void
//   onError?: (error?: any) => void
// }

export interface ILogworkRequest extends IBaseMiddlewareRequest<any> {}
