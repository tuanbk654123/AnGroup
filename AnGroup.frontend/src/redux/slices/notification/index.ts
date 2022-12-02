import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INotificationState } from './index.types'
import { notificationGetAllRequest } from './middleware'

const initialState: INotificationState = {
  dataNotification: {
    result: [],
  },
  loading: false,
  pagination: null,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<INotificationState['dataNotification']>) => {
      state.dataNotification = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(notificationGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(notificationGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataNotification = action.payload
      state.loading = false
      const newPagination = action.payload?.pagination || {}

      state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(notificationGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })
  },
})

export const notificationActions = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer
