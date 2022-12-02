import { ReportFilterTypes } from '~/services/report/index.type'
import { PaginationResponse } from '~/types/common'
import { IBaseMiddlewareRequest } from '../index.types'
export interface IReportState {
  dataReport?: {
    result: any[]
  }
  dataReportAll?: {
    result: any[]
  }
  loading: boolean
  pagination: PaginationResponse
}

export interface IFectchReportRequest {
  reportFilters: ReportFilterTypes
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}

export interface IReportRequest extends IBaseMiddlewareRequest<any> {}
