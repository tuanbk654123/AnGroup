import { reportGetAllRequest, reportGetAlls } from './middleware'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IReportState } from './index.types'

const initialState: IReportState = {
  dataReport: {
    result: [],
  },
  dataReportAll: {
    result: [],
  },
  loading: false,
  pagination: null,
}

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IReportState['dataReport']>) => {
      state.dataReport = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(reportGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(reportGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.dataReport = action.payload
      const newPagination = action.payload?.pagination || {}
      if (action.payload?.pagination) {
        state.pagination = { ...state.pagination, ...newPagination }
      } else {
        state.pagination = null
      }
    })
    builder.addCase(reportGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    //get list all
    builder.addCase(reportGetAlls.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataReportAll = action.payload
    })
    builder.addCase(reportGetAlls.rejected, (state, action) => {
      console.log({ state, action })
    })
  },
})

export const reportActions = reportSlice.actions

export const reportReducer = reportSlice.reducer
