import { getAtherConfig } from './middleware'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAitherConfigState } from './index.types'

const initialState: IAitherConfigState = {
  dataAitherConfig: {
    result: [],
  },
  loading: false,
  pagination: null,
}

export const aitherConfigSlice = createSlice({
  name: 'aitherConfig',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAitherConfigState['dataAitherConfig']>) => {
      state.dataAitherConfig = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getAtherConfig.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAtherConfig.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataAitherConfig = action.payload
      state.loading = false
      const newPagination = action.payload?.pagination || {}
      state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(getAtherConfig.rejected, (state, action) => {
      console.log({ state, action })
      state.loading = false
    })
  },
})

export const aitherConfigActions = aitherConfigSlice.actions

export const aitherConfigReducer = aitherConfigSlice.reducer
