import { HelpsFilterTypes } from '~/services/helps/index.type'
import { PaginationResponse } from '~/types/common'
import { IBaseMiddlewareRequest } from '../index.types'
export interface IHelpsState {
  dataHelps?: {
    result: any[]
  }
  loading: boolean
  pagination: PaginationResponse
}
export type CreateSuccessResponse = {
  data: {
    title: string
    description: string
    content: string
    avatar: string
    tags: string
  }
  message: string
}
export interface IFectchHelpsRequest {
  helpsFilters: HelpsFilterTypes
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}

export interface ICreateHelpsRequest {
  helps?: {
    title: string
    description: string
    content: string
    avatar: string
    tags: string
    status: string
  }
  onSuccess?: (data?: CreateSuccessResponse) => void
  onError?: (error?: any) => void
}

export interface IHelpsRequest extends IBaseMiddlewareRequest<any> {}
