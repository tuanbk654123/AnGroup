import { createHelps, helpsGetAllRequest } from './middleware'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHelpsState } from './index.types'

const initialState: IHelpsState = {
  dataHelps: {
    result: [],
  },
  loading: false,
  pagination: null,
}

export const helpsSlice = createSlice({
  name: 'helps',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IHelpsState['dataHelps']>) => {
      state.dataHelps = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(helpsGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(helpsGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataHelps = action.payload
      state.loading = false
      const newPagination = action.payload?.pagination || {}
      state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(helpsGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    //CREATE
    builder.addCase(createHelps.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createHelps.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createHelps.rejected, (state) => {
      state.loading = false
    })
  },
})

export const helpsActions = helpsSlice.actions

export const helpsReducer = helpsSlice.reducer
