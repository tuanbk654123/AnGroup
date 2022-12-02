import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { userServices } from '~/services/user'
import { IFectchUserRequest, ICreateEditUserRequest, IFectchUserById,ISearchUserRequest } from './index.types'

/**
 * create user
 * */
export const createUser = createAsyncThunk(
  'user/create',
  async ({ user, onSuccess, onError }: ICreateEditUserRequest) => {
    const response = await userServices.create(user)
    if (response.kind === 'ok' && response?.data?.isSuccess === true) {
      onSuccess?.(response.data)
      return response.data
    } else {
      //toast.error('Something went wrong!')
      onError?.(response.error)
      return response.error
    }
  },
)

/**
 * edit user
 * */
export const editUser = createAsyncThunk('user/edit', async ({ user, onSuccess, onError }: ICreateEditUserRequest) => {
  const response = await userServices.edit(+user.id, user)
  if (response.kind === 'ok') {
    onSuccess?.(response.data)
    return response
  } else {
    toast.error('Something went wrong!')
    onError?.(response.error)
    return response.error
  }
})
/**
 * get user
 */
export const fetchUsers = createAsyncThunk('user/fetch', async ({ userFilters, forSelect, onSuccess  }: IFectchUserRequest) => {
  const response = await userServices.getAll(userFilters, forSelect)
  if (response.kind === 'ok') {
    // onSuccess?.(response.data.data.pagination.rowCount)
    return response
  } else {
    toast.error('Something went wrong!')
    return []
  }
})

/**
 * get user by Id
 */
export const fetchUserById = createAsyncThunk('user/fetch_by_id', async ({ userId, onSuccess }: IFectchUserById) => {
  const response = await userServices.getById(userId)
  if (response.kind === 'ok') {
    onSuccess?.(response.data.data)
    return response
  } else {
    toast.error('Something went wrong!')
    return []
  }
})

export const userSearchRequest = createAsyncThunk(
  'user/search',
  async ({ data, onSuccess, onError, forSelect }: ISearchUserRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await userServices.search(data)
    if (response.kind === 'ok') {
      // toast.success('Create Succeed!')
       onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      // toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response.data)
      return rejectWithValue(response)
    }
  },
)
export const userById = createAsyncThunk('user/get_by_id',
async ({ data, onSuccess, onError, forSelect }: ISearchUserRequest, { fulfillWithValue, rejectWithValue }) => {
  const { id } = data
  const response = await userServices.getUserById(id)
  if (response.kind === 'ok') {
    // toast.success('Create Succeed!')
    onSuccess?.(response.data)
    return fulfillWithValue(response.data?.data)
  } else {
    // toast.error(response.data?.message || 'Something went wrong!')
    onError?.(response.data)
    return rejectWithValue(response)
  }
},)

export const deleteRequest = createAsyncThunk(
  'user/delete',
  async ({ data, onSuccess, onError }: ISearchUserRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await userServices.deleteList(data)
    if (response.kind === 'ok' && response?.data?.isSuccess === true) {
      // toast.success('Update Succeed!')
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      // toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
