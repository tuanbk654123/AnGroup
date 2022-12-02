import { productgroupServices } from './../../../services/productgroup/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProductgroupRequest } from './index.types'

export const productgroupGetAllRequest = createAsyncThunk(
  'productgroup/getAll',
  async ({ data, onSuccess, onError }: IProductgroupRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productgroupServices.getAll()
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const productgroupGetByIdRequest = createAsyncThunk(
  'productgroup/getById',
  async ({ data, onSuccess, onError }: IProductgroupRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await productgroupServices.getById(id)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const productgroupUpdateIdRequest = createAsyncThunk(
  'productgroup/updateId',
  async ({ data, onSuccess, onError }: IProductgroupRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productgroupServices.updateId(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
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

export const productgroupCreateRequest = createAsyncThunk(
  'productgroup/create',
  async ({ data, onSuccess, onError }: IProductgroupRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productgroupServices.create(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response.data)
      return rejectWithValue(response)
    }
  },
)

export const groupUpdateIdStatusRequest = createAsyncThunk(
  'productgroup/updateIdStatus',
  async ({ data, onSuccess, onError }: IProductgroupRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productgroupServices.updateIdStatus(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
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
