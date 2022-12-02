import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux/store'
import { loadingContainerRequest } from './middleware'

export interface ILoadingContainer {
  isLoading?: boolean
}
const initialState: ILoadingContainer = {
  isLoading: false,
}

export const loadingContainerSlice = createSlice({
  name: 'loadingContainer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadingContainerRequest.fulfilled, (state, action: any) => {
      const { isLoadingContainer } = action.payload
      state.isLoading = isLoadingContainer
    })
  },
})

export const loadingContainerActions = loadingContainerSlice.actions

export const loadingContainerReducer = loadingContainerSlice.reducer

// selectors
export const selectLoadingContainer = (state: RootState) => state.loadingContainer
