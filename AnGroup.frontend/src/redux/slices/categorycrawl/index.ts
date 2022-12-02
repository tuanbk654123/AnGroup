import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import {
  //categoryCrawlGetAllRequest,
  categoryCrawlGetByIdRequest,
  categoryCrawlSearchRequest,
  getCheckData,
  //categoryCrawlUpdateIdStatusRequest,
} from './middleware'

export interface ICategoryCrawlState {
  datacategoryCrawls?: any[]
  datacategoryCrawlDetails?: any
  datacategoryCrawlCheck?: any
  loading: boolean
  pagination: PaginationResponse
  datacategoryCrawlsAll?: any[]
}

const initialState: ICategoryCrawlState = {
  datacategoryCrawls: [],
  datacategoryCrawlDetails: null,
  datacategoryCrawlCheck: null,
  loading: false,
  pagination: null,
  datacategoryCrawlsAll: [],
}

export const categoryCrawlSlice = createSlice({
  name: 'categoryCrawl',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ICategoryCrawlState['datacategoryCrawls']>) => {
      state.datacategoryCrawls = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    // builder.addCase(categoryCrawlGetAllRequest.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(categoryCrawlGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.loading = false
    //   // state.datacreativePosts = action.payload
    //   state.datacategoryCrawlsAll = action.payload
    // })
    // builder.addCase(categoryCrawlGetAllRequest.rejected, (state, action) => {
    //   state.loading = false
    //   console.log({ state, action })
    // })

    // GET BY ID
    builder.addCase(categoryCrawlGetByIdRequest.fulfilled, (state, action) => {
      state.datacategoryCrawlDetails = action.payload
    })
    builder.addCase(getCheckData.fulfilled, (state, action) => {
      state.datacategoryCrawlCheck = action.payload
    })
    builder.addCase(categoryCrawlGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })

    //SEARCH
    builder.addCase(categoryCrawlSearchRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(categoryCrawlSearchRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.datacategoryCrawls = action.payload.result
      state.loading = false
      const newPagination = action.payload?.pagination || {}

      if (action.payload?.pagination) {
        state.pagination = { ...state.pagination, ...newPagination }
      } else {
        state.pagination = null
      }
      // state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(categoryCrawlSearchRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    //loading-UPDATE-STATUS
    // builder.addCase(categoryCrawlUpdateIdStatusRequest.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(categoryCrawlUpdateIdStatusRequest.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.loading = false
    // })
    // builder.addCase(categoryCrawlUpdateIdStatusRequest.rejected, (state, action) => {
    //   state.loading = false
    // })
  },
})

export const categoryCrawlActions = categoryCrawlSlice.actions

export const categoryCrawlReducer = categoryCrawlSlice.reducer
