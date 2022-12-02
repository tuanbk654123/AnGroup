import {
  submissionChangeStatusRequest,
  submissionGetAllRequest,
  submissionGetByIdRequest,
  submissionGetProgramConfigRequest,
  submissionGetReasonOptionsRequest,
  submissionGetSourceRequest,
  submissionSearchByNameRequest,
  submissionSearchLogRequest,
} from '~/redux/slices/submission/middleware'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISubmissionState } from './index.types'

const initialState: ISubmissionState = {
  dataSubmissions: [],
  dataSubmissionDetails: null,
  reasonOptions: [],
  programConfig: [],
  submissionSource: [],
  pagination: null,
  loading: false,
}

export const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setDataSubmissionDetails: (state, action: PayloadAction<ISubmissionState['dataSubmissions']>) => {
      state.dataSubmissionDetails = action.payload
    },
    resetSlice: (state) => {
      state.dataSubmissions = []
      state.dataSubmissionDetails = null
      state.programConfig = []
      state.pagination = null
      state.reasonOptions = []
      state.submissionSource = []
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(submissionGetAllRequest.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(submissionGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataSubmissions = action.payload
      state.loading = false
    })
    builder.addCase(submissionGetAllRequest.rejected, (state, action) => {
      state.loading = false
    })

    // GET BY ID
    builder.addCase(submissionGetByIdRequest.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(submissionGetByIdRequest.fulfilled, (state, action) => {
      state.dataSubmissionDetails = action.payload
      state.loading = false
    })
    builder.addCase(submissionGetByIdRequest.rejected, (state, action) => {
      state.loading = false
    })

    // GET REASON OPTIONS
    builder.addCase(submissionGetReasonOptionsRequest.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(submissionGetReasonOptionsRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.reasonOptions = action.payload
      state.loading = false
    })

    //SEARCH BY NAME
    builder.addCase(submissionSearchByNameRequest.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(submissionSearchByNameRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataSubmissions = action.payload?.result
      const newPagination = action.payload?.pagination
      if (!newPagination) {
        state.pagination = null
      } else {
        state.pagination = { ...state.pagination, ...newPagination }
      }
      state.loading = false
    })
    builder.addCase(submissionSearchByNameRequest.rejected, (state, action) => {
      console.log({ state, action })
      state.loading = false
    })

    // GET PROGRAM CONFIG
    builder.addCase(submissionGetProgramConfigRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.programConfig = action.payload
    })

    // CHANGE STATUS
    builder.addCase(submissionChangeStatusRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataSubmissionDetails = {
        ...state.dataSubmissionDetails,
        status: action.payload?.newStatus,
        statusName: action.payload?.newStatus,
      }
    })

    // GET SOURCE
    builder.addCase(submissionGetSourceRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.submissionSource = action.payload
    })
    //GET GENERAL
    builder.addCase(submissionSearchLogRequest.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(submissionSearchLogRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataSubmissions = action.payload
      state.loading = false
    })
    builder.addCase(submissionSearchLogRequest.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const submissionActions = submissionSlice.actions

export const submissionReducer = submissionSlice.reducer
