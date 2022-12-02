import { createAsyncThunk } from '@reduxjs/toolkit'
import { reviewServices } from '~/services/review'
import { IFectchReviewRequest } from './index.types'

// export const reviewGetAllRequest = createAsyncThunk(
//   'review/getAll',
//   async ({ reviewFilters, onSuccess }: IFectchReviewRequest) => {
//     const response = await reviewServices.getAll()

//     if (response.kind === 'ok') {
//       const _dataRole =
//         response.data.data?.result?.map?.((item) => {
//           return {
//             ...item,
//           }
//         }) || []

//       const dataTransfer = {
//         result: _dataRole,
//         pagination: response.data?.data?.pagination,
//       }
//       onSuccess?.(response.data.data.pagination.rowCount)
//       return dataTransfer
//     } else {
//       return []
//     }
//   },
// )
export const reviewGetAllRequest = createAsyncThunk(
  'review/fetch',
  async ({ reviewFilter, onSuccess }: IFectchReviewRequest) => {
    const response = await reviewServices.getAll(reviewFilter)

    if (response.kind === 'ok') {
      const _dataReview =
        response.data.data?.result?.map?.((item) => {
          return {
            ...item,
          }
        }) || []

      const dataTransfer = {
        result: _dataReview,
        pagination: response.data?.data?.pagination,
      }
      onSuccess?.(response.data.data.pagination.rowCount)
      return dataTransfer
    } else {
      return []
    }
  },
)
