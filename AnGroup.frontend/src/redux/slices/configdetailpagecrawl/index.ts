import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import {
  //categoryCrawlGetAllRequest,
  configDetailPageCrawlGetByIdRequest,
  configDetailPageCrawlCreateRequest,
  //categoryCrawlSearchRequest,
  //categoryCrawlUpdateIdStatusRequest,
} from './middleware'

export interface IConfigDetailPageCrawlState {
  dataconfigDetailPageCrawls?: any[]
  dataconfigDetailPageCrawlDetails?: any
  loading: boolean
  pagination: PaginationResponse
  datacategoryCrawlsAll?: any[]
}

const initialState: IConfigDetailPageCrawlState = {
  dataconfigDetailPageCrawls: [],
  dataconfigDetailPageCrawlDetails: null,
  loading: false,
  pagination: null,
  datacategoryCrawlsAll: [],
}

export const configDetailPageCrawlSlice = createSlice({
  name: 'configDetailPageCategoryCrawl',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IConfigDetailPageCrawlState['dataconfigDetailPageCrawls']>) => {
      state.dataconfigDetailPageCrawls = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(configDetailPageCrawlCreateRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(configDetailPageCrawlCreateRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      // state.datacreativePosts = action.payload
      //state.datacategoryCrawlsAll = action.payload
    })
    builder.addCase(configDetailPageCrawlCreateRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(configDetailPageCrawlGetByIdRequest.fulfilled, (state, action) => {
      state.dataconfigDetailPageCrawlDetails = action.payload
    })
    builder.addCase(configDetailPageCrawlGetByIdRequest.rejected, (state, action) => {
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

export const configDetailPageCrawlActions = configDetailPageCrawlSlice.actions

export const configDetailPageCrawReducer = configDetailPageCrawlSlice.reducer
