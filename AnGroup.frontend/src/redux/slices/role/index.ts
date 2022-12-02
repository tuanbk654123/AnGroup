import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoleState } from './index.types'
import {
  roleCreateRequest,
  roleGetAllRequest,
  roleGetByIdRequest,
  roleSearchByNameRequest,
  updateRequest,
} from './middleware'
import { cloneDeep } from 'lodash'

// export interface IRoleState {
//   currentRole: ICurrentRole[] | null
//   dataRoleDetails?: any
// }

const initialState: IRoleState = {
  dataRole: [],
  pagination: null,
  dataRoleDetails: null,
  loading: false,
}
export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<IRoleState['dataRole']>) => {
      state.dataRole = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(roleGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(roleGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataRole = action.payload
    })
    builder.addCase(roleGetAllRequest.rejected, (state, action) => {
      console.log({ state, action })
    })
    builder.addCase(roleGetByIdRequest.fulfilled, (state, action) => {
      console.log('dataRoleDetails', action.payload)
      //state.dataRoleDetails = action.payload
      const newState = {
        dataRole: state.dataRole ?? [],
        pagination: state.pagination ?? null,
        dataRoleDetails: cloneDeep(action.payload),
        loading: state.loading ?? false,
      }
      console.log('newState newState newState', newState)
      return newState
    })
    builder.addCase(roleGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })
    builder.addCase(roleCreateRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataRole = action.payload
    })
    builder.addCase(roleCreateRequest.rejected, (state, action) => {
      console.log({ state, action })
    })
    builder.addCase(updateRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataRoleDetails = action.payload
    })
    builder.addCase(updateRequest.rejected, (state, action) => {
      console.log({ state, action })
    })
    builder.addCase(roleSearchByNameRequest.pending, (state, action: PayloadAction<any>) => {
      state.loading = true
    })
    builder.addCase(roleSearchByNameRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.dataRole = action.payload?.result
      state.pagination = action.payload?.pagination
    })
    builder.addCase(roleSearchByNameRequest.rejected, (state, action) => {
      console.log({ state, action })
    })
  },
})

export const roleActions = roleSlice.actions

export const roleReducer = roleSlice.reducer
