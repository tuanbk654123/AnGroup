import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '~/redux/store'
import { Position } from '~/types'
import { getPositions } from './middleware'

export interface IPositionState {
  positions: Position[]
  loading: boolean
}
const initialState: IPositionState = {
  positions: [],
  loading: false,
}

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPositions.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getPositions.fulfilled, (state, action: PayloadAction<Position[]>) => {
      state.loading = false
      state.positions = action.payload
    })
    builder.addCase(getPositions.rejected, (state, s) => {
      state.loading = false
      state.positions = []
    })
  },
})

//actions
export const positionActions = positionSlice.actions

// reducers
export const positionReducer = positionSlice.reducer

// selectors
// Create User
export const selectPositionLoading = (state: RootState) => state.position.loading
export const selectListPosition = (state: RootState) => state.position.positions
