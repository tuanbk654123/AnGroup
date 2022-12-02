import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { roleServices } from '~/services'
import {} from '~/services/role/index.type'
import { IRoleRequest, IRoleSearchByNameFilter } from './index.types'

export const roleGetAllRequest = createAsyncThunk(
  'role/getAll',
  async ({ onSuccess, onError, forSelect }: IRoleRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await roleServices.getAll(forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const roleGetByIdRequest = createAsyncThunk(
  'role/getById',
  async ({ data, onSuccess, onError }: IRoleRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await roleServices.getById(id)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
export const roleCreateRequest = createAsyncThunk(
  'role/create',
  async ({ data, onSuccess, onError }: IRoleRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await roleServices.create(data)
    if (response.kind === 'ok') {
      // toast.success(response?.data?.message || 'Success')
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      // toast.error('Something went wrong!')
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
export const updateRequest = createAsyncThunk(
  'role/update',
  async ({ data, onSuccess, onError }: IRoleRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await roleServices.update(data)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      toast.error('Something went wrong!')
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
export const roleSearchByNameRequest = createAsyncThunk(
  'role/searchByName',
  async ({ data, onSuccess, onError }: IRoleSearchByNameFilter, { fulfillWithValue, rejectWithValue }) => {
    const response = await roleServices.searchByName(data)
    if (response.kind === 'ok') {
      const _dataRole =
        response.data.data?.result?.map?.((item) => {
          return {
            ...item,
            key: item?.id,
          }
        }) || []

      const dataTransfer = {
        result: _dataRole,
        pagination: response.data?.data?.pagination,
        loading: false,
      }
      onSuccess?.(dataTransfer)
      return fulfillWithValue(dataTransfer)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
