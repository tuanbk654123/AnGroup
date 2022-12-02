import { ReviewFilterTypes } from '~/services/review/index.type'
import { PaginationResponse } from '~/types/common'
import { IBaseMiddlewareRequest } from '../index.types'

export interface IReviewState {
  dataReview: {
    result: []
  }
  loading: boolean
  pagination: PaginationResponse
}

export interface IFectchReviewRequest {
  reviewFilter: ReviewFilterTypes
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}

export interface IReviewRequest extends IBaseMiddlewareRequest<any> {}
