import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import {
  productGetAllRequest,
  productGetByIdRequest,
  productSearchRequest,
  productUpdateIdStatusRequest,
} from './middleware'

export interface IProductState {
  dataProducts?: any[]
  dataProductDetails?: any
  loading: boolean
  pagination: PaginationResponse
  dataProductsAll?: any[]
}

const initialState: IProductState = {
  dataProducts: [],
  dataProductDetails: null,
  loading: false,
  pagination: null,
  dataProductsAll: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IProductState['dataProducts']>) => {
      state.dataProducts = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(productGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(productGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      // state.dataProducts = action.payload
      state.dataProductsAll = action.payload
    })
    builder.addCase(productGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(productGetByIdRequest.fulfilled, (state, action) => {
      state.dataProductDetails = action.payload
    })
    builder.addCase(productGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })

    //SEARCH
    builder.addCase(productSearchRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(productSearchRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataProducts = action.payload.result
      state.loading = false
      const newPagination = action.payload?.pagination || {}

      if (action.payload?.pagination) {
        state.pagination = { ...state.pagination, ...newPagination }
      } else {
        state.pagination = null
      }
      // state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(productSearchRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    //loading-UPDATE-STATUS
    builder.addCase(productUpdateIdStatusRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(productUpdateIdStatusRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    builder.addCase(productUpdateIdStatusRequest.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const productActions = productSlice.actions

export const productReducer = productSlice.reducer
