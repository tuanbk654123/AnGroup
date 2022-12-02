import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import {
  //categoryCrawlGetAllRequest,
  configCategoryHomeCrawlGetByIdRequest,
  configCategoryHomeCrawlCreateRequest,
  //categoryCrawlSearchRequest,
  //categoryCrawlUpdateIdStatusRequest,
} from './middleware'

export interface IConfigCategoryHomeCrawlState {
  dataconfigcategoryHomeCrawls?: any[]
  dataconfigcategoryHomeCrawlDetails?: any
  loading: boolean
  pagination: PaginationResponse
  datacategoryCrawlsAll?: any[]
}

const initialState: IConfigCategoryHomeCrawlState = {
  dataconfigcategoryHomeCrawls: [],
  dataconfigcategoryHomeCrawlDetails: null,
  loading: false,
  pagination: null,
  datacategoryCrawlsAll: [],
}

export const configCategoryHomeCrawlSlice = createSlice({
  name: 'configCategoryHomeCrawl',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IConfigCategoryHomeCrawlState['dataconfigcategoryHomeCrawls']>) => {
      state.dataconfigcategoryHomeCrawls = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(configCategoryHomeCrawlCreateRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(configCategoryHomeCrawlCreateRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      // state.datacreativePosts = action.payload
      state.datacategoryCrawlsAll = action.payload
    })
    builder.addCase(configCategoryHomeCrawlCreateRequest.rejected, (state, action) => {
      state.loading = false
      //console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(configCategoryHomeCrawlGetByIdRequest.fulfilled, (state, action) => {
      state.dataconfigcategoryHomeCrawlDetails = action.payload
    })
    builder.addCase(configCategoryHomeCrawlGetByIdRequest.rejected, (state, action) => {
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

export const configCategoryHomeCrawlActions = configCategoryHomeCrawlSlice.actions

export const configCategoryHomeCrawlReducer = configCategoryHomeCrawlSlice.reducer
