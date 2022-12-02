import { createSlice } from '@reduxjs/toolkit'
import { storageKeys } from '~/constants/storageKeys'
import { RootState } from '~/redux/store'
import { getDataFromStorage } from '~/utils/storage.utils'
import { IPageSettings } from '../auth/index.types'
import { pageActiveRequest } from './middleware'

export interface IPageActive {
  currentPage?: string | null
  pageInfo?: IPageSettings | null
}
const initialState: IPageActive = {
  currentPage: getDataFromStorage(storageKeys.CURRENT_PAGE),
  pageInfo: getDataFromStorage(storageKeys.CURRENT_PAGE_INFO),
}

export const pageActiveSlice = createSlice({
  name: 'pageActive',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pageActiveRequest.fulfilled, (state, action: any) => {
      const { pageActive } = action.payload
      state.currentPage = pageActive?.Code
      state.pageInfo = pageActive
    })
  },
})

export const pageActiveActions = pageActiveSlice.actions

export const pageActiveReducer = pageActiveSlice.reducer

// selectors
export const selectPageActive = (state: RootState) => state.pageActive
