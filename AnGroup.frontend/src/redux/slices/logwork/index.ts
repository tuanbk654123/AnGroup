import { logworkGetAllRequest } from './middleware'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILogworkState } from './index.types'

const initialState: ILogworkState = {
  dataLogwork: {
    result: [],
  },
  loading: false,
  pagination: null,
}

export const logworkSlice = createSlice({
  name: 'logwork',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ILogworkState['dataLogwork']>) => {
      state.dataLogwork = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(logworkGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logworkGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataLogwork = action.payload
      state.loading = false
      const newPagination = action.payload?.pagination || {}
      state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(logworkGetAllRequest.rejected, (state, action) => {
      console.log({ state, action })
      state.loading = false
    })
  },
})

export const logworkActions = logworkSlice.actions

export const logworkReducer = logworkSlice.reducer
