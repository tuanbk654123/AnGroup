import { ISubmissionSearchByNameBody } from '~/services/submisstion/index.types'
import { PaginationResponse } from '~/types/common'
import { IBaseMiddlewareRequest } from '../index.types'

export interface IReasonOptionItem {
  label: string
  value: string
}
export interface ISubmissionState {
  dataSubmissions?: any[]
  dataSubmissionDetails?: any
  pagination?: PaginationResponse
  programConfig?: any[]
  reasonOptions?: IReasonOptionItem[]
  submissionSource?: any[]
  loading: boolean
}

export interface ISubmissionRequest extends IBaseMiddlewareRequest<any> { }

export interface ISubmissionSearchByNameRequest extends IBaseMiddlewareRequest<ISubmissionSearchByNameBody> { }
