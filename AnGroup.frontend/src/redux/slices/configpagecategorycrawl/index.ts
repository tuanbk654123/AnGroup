import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import {
  //categoryCrawlGetAllRequest,
  configPageCategoryCrawlGetByIdRequest,
  configPageCategoryCrawlCreateRequest,
  //categoryCrawlSearchRequest,
  //categoryCrawlUpdateIdStatusRequest,
} from './middleware'

export interface IConfigPageCategoryCrawlState {
  dataconfigPageCategoryCrawls?: any[]
  dataconfigPageCategoryCrawlDetails?: any
  loading: boolean
  pagination: PaginationResponse
  datacategoryCrawlsAll?: any[]
}

const initialState: IConfigPageCategoryCrawlState = {
  dataconfigPageCategoryCrawls: [],
  dataconfigPageCategoryCrawlDetails: null,
  loading: false,
  pagination: null,
  datacategoryCrawlsAll: [],
}

export const configPageCategoryCrawlSlice = createSlice({
  name: 'configPageCategoryCrawl',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IConfigPageCategoryCrawlState['dataconfigPageCategoryCrawls']>) => {
      state.dataconfigPageCategoryCrawls = action.payload
    },
  },
  extraReducers: (builder) => {
    //GET CREATED
    builder.addCase(configPageCategoryCrawlCreateRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(configPageCategoryCrawlCreateRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      // state.datacreativePosts = action.payload
      //state.datacategoryCrawlsAll = action.payload
    })
    builder.addCase(configPageCategoryCrawlCreateRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(configPageCategoryCrawlGetByIdRequest.fulfilled, (state, action) => {
      state.dataconfigPageCategoryCrawlDetails = action.payload
    })
    builder.addCase(configPageCategoryCrawlGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })

    //SEARCH
    // builder.addCase(categoryCrawlSearchRequest.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(categoryCrawlSearchRequest.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.datacategoryHomeCrawls = action.payload.result
    //   state.loading = false
    //   const newPagination = action.payload?.pagination || {}

    //   if (action.payload?.pagination) {
    //     state.pagination = { ...state.pagination, ...newPagination }
    //   } else {
    //     state.pagination = null
    //   }
    //   // state.pagination = { ...state.pagination, ...newPagination }
    // })
    // builder.addCase(categoryCrawlSearchRequest.rejected, (state, action) => {
    //   state.loading = false
    //   console.log({ state, action })
    // })

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

export const configPageCategoryCrawlActions = configPageCategoryCrawlSlice.actions

export const configPageCategoryCrawReducer = configPageCategoryCrawlSlice.reducer
