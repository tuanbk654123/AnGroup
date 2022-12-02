import { Languages, LanguagesType } from '~/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './index.types'

const initialState: AppState = {
  currentLanguage: Languages.En,
  isLoading: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<LanguagesType>) => {
      state.currentLanguage = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const appActions = appSlice.actions

export const appReducer = appSlice.reducer
