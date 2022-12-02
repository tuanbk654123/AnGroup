import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import {
  creativePostGetAllRequest,
  creativePostGetByIdRequest,
  creativePostSearchRequest,
  creativePostUpdateIdStatusRequest,
} from './middleware'

export interface ICreativePostState {
  datacreativePosts?: any[]
  datacreativePostDetails?: any
  loading: boolean
  pagination: PaginationResponse
  datacreativePostsAll?: any[]
}

const initialState: ICreativePostState = {
  datacreativePosts: [],
  datacreativePostDetails: null,
  loading: false,
  pagination: null,
  datacreativePostsAll: [],
}

export const creativePostSlice = createSlice({
  name: 'creativePost',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ICreativePostState['datacreativePosts']>) => {
      state.datacreativePosts = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(creativePostGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(creativePostGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      // state.datacreativePosts = action.payload
      state.datacreativePostsAll = action.payload
    })
    builder.addCase(creativePostGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(creativePostGetByIdRequest.fulfilled, (state, action) => {
      state.datacreativePostDetails = action.payload
    })
    builder.addCase(creativePostGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })

    //SEARCH
    builder.addCase(creativePostSearchRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(creativePostSearchRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.datacreativePosts = action.payload.result
      state.loading = false
      const newPagination = action.payload?.pagination || {}

      if (action.payload?.pagination) {
        state.pagination = { ...state.pagination, ...newPagination }
      } else {
        state.pagination = null
      }
      // state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(creativePostSearchRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    //loading-UPDATE-STATUS
    builder.addCase(creativePostUpdateIdStatusRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(creativePostUpdateIdStatusRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    builder.addCase(creativePostUpdateIdStatusRequest.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const creativePostActions = creativePostSlice.actions

export const creativePostReducer = creativePostSlice.reducer
