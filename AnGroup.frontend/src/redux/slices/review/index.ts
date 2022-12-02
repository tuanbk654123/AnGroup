import { reviewGetAllRequest } from './middleware'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IReviewState } from './index.types'

const initialState: IReviewState = {
  dataReview: {
    result: [],
  },
  loading: false,
  pagination: null,
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IReviewState['dataReview']>) => {
      state.dataReview = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(reviewGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(reviewGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataReview = action.payload
      state.loading = false
      const newPagination = action.payload?.pagination || {}
      state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(reviewGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })
  },
})

export const reviewActions = reviewSlice.actions

export const reviewReducer = reviewSlice.reducer
