import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import {
  categoryGetAllRequest,
  categoryGetByIdRequest,
  categorySearchRequest,
  categoryUpdateIdStatusRequest,
} from './middleware'

export interface ICategoryState {
  dataCategorys?: any[]
  categoryId?: number,
  dataCategoryDetails?: any
  loading: boolean
  pagination: PaginationResponse
  dataCategorysAll?: any[]
}

const initialState: ICategoryState = {
  dataCategorys: [],
  dataCategoryDetails: null,
  loading: false,
  pagination: null,
  dataCategorysAll: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ICategoryState['dataCategorys']>) => {
      state.dataCategorys = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(categoryGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(categoryGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      // state.dataProducts = action.payload
      state.dataCategorysAll = action.payload
    })
    builder.addCase(categoryGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(categoryGetByIdRequest.fulfilled, (state, action) => {
      state.dataCategoryDetails = action.payload
    })
    builder.addCase(categoryGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })

    //SEARCH
    builder.addCase(categorySearchRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(categorySearchRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataCategorys = action.payload.result
      state.loading = false
      const newPagination = action.payload?.pagination || {}

      if (action.payload?.pagination) {
        state.pagination = { ...state.pagination, ...newPagination }
      } else {
        state.pagination = null
      }
      // state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(categorySearchRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    //loading-UPDATE-STATUS
    builder.addCase(categoryUpdateIdStatusRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(categoryUpdateIdStatusRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    builder.addCase(categoryUpdateIdStatusRequest.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const categoryActions = categorySlice.actions

export const categoryReducer = categorySlice.reducer
