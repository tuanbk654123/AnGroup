import { ResponseKindType } from '~/services/http/index.types'

export interface PaginationResponse {
  pageCurrent: number
  pageCount: number
  pageSize: number
  rowCount: number
  firstRowOnPage: number
  lastRowOnPage: number
}

export interface ListResponse<T> {
  data: {
    data: {
      result: T[]
      pagination: PaginationResponse
    }
    status?: number
  }
  kind: ResponseKindType
}

export interface ListAllResponse<T> {
  data: {
    data: T[]
    status?: number
  }
  kind: ResponseKindType
}

export interface ObjectRespone<T> {
  data: {
    data: T
    message: string
    status?: number
  }
  error: null
  kind: ResponseKindType
}
export type PaginationParams = {
  pageIndex: number
  pageSize: number
  isAll?: boolean
}

export interface FilterTypes {
  pagination?: PaginationParams
}

export type PaginationParamsAll = {
  pageIndex: number
  pageSize: number
  isAll: boolean
}

export interface FilterTypes {
  paginationAll?: PaginationParamsAll
}

export type RecusiveType = {
  [key: string]: any
  children?: RecusiveType[]
}
