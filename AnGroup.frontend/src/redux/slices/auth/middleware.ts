import { createAsyncThunk } from '@reduxjs/toolkit'
import { storageKeys } from '~/constants/storageKeys'
import { saveDataToStorage } from '~/utils/storage.utils'
import { saveDataToCookie } from '~/utils/cookie.utils'
import { ILoginRequest } from './index.types'
import { toast } from 'react-toastify'
import { authServices } from '~/services'

export const loginRequest = createAsyncThunk(
  'auth/login',
  async ({ data, onSuccess, onError }: ILoginRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await authServices.login(data)
    if (response.kind === 'ok' && response.data.data.access_token !=="false") {
      saveDataToCookie(storageKeys.TOKEN, response.data.data.access_token
        // .replace('"', '')
      )
      saveDataToStorage(storageKeys.CURRENT_USER, response.data.data.user)
      saveDataToStorage(storageKeys.PAGE_SETTINGS, response.data?.pageSettings)
      onSuccess?.(response.data)
      return fulfillWithValue({
        user: response.data.data.user,
        pageSettings: response.data.pageSettings,
      })
    } else {
      // toast.error('Something went wrong!')
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)

export const logoutRequest = createAsyncThunk(
  'auth/logout',
  async ({ data, onSuccess, onError }: ILoginRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await authServices.logout()
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response)
    } else {
      toast.error('Something went wrong!')
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
export const forgotPasswordRequest = createAsyncThunk(
  'auth/forgot-password',
  async ({ data, onSuccess, onError }: ILoginRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await authServices.forgot_password(data)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response)
    } else {
      toast.error(response.error.response.data.message)
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
export const verifyOTPRequest = createAsyncThunk(
  'auth/forgot-password',
  async ({ data, onSuccess, onError }: ILoginRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await authServices.verifyOTP(data)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response)
    } else {
      toast.error(response.error.response.data.message)
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
export const resetPasswordRequest = createAsyncThunk(
  'auth/reset-password',
  async ({ data, onSuccess, onError }: ILoginRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await authServices.reset_password(data)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response)
    } else {
      toast.error(response.error.response.data.message)
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
export const changePasswordRequest = createAsyncThunk(
  'auth/reset-password',
  async ({ data, onSuccess, onError }: ILoginRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await authServices.change_password(data)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response)
    } else {
      toast.error(response.error.response.data.message)
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
