import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storageKeys } from '~/constants/storageKeys'
import { getDataFromStorage } from '~/utils/storage.utils'
import { ICurrentUser, IPageSettings } from './index.types'
import { loginRequest, logoutRequest } from './middleware'
export interface IAuthState {
  currentUser: ICurrentUser | null
  pageSettings: IPageSettings[] | null
  isLoading: boolean
}

const initialState: IAuthState = {
  currentUser: getDataFromStorage(storageKeys.CURRENT_USER),
  pageSettings: getDataFromStorage(storageKeys.PAGE_SETTINGS),
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuthState>) => {
      const newState = {
        currentUser: action.payload.currentUser,
        pageSettings: action.payload.pageSettings,
        isLoading: false,
      }
      return newState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(loginRequest.fulfilled, (state, action: any): any => {
      const newState = {
        currentUser: action.payload?.user,
        pageSettings: action.payload?.pageSettings,
        isLoading: false,
      }
      return newState
    })
    builder.addCase(loginRequest.rejected, (state, action) => {
      console.log({ state, action })
    })
    builder.addCase(logoutRequest.fulfilled, (state, action) => {
      //todo
      const newState = {
        currentUser: null,
        pageSettings: null,
        isLoading: false,
      }
      return newState
    })
  },
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer
