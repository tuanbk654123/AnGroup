import { productServices } from './../../../services/product/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProductRequest } from './index.types'

export const productGetAllRequest = createAsyncThunk(
  'product/getAll',
  async ({ data, onSuccess, onError, forSelect }: IProductRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productServices.getAll(forSelect)

    if (response.kind === 'ok') {
      onSuccess?.(response?.data)
      return fulfillWithValue(response?.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const productGetByIdRequest = createAsyncThunk(
  'product/getById',
  async ({ data, onSuccess, onError, forSelect }: IProductRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    console.log(forSelect)
    console.log(data)
    const response = await productServices.getById(id, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const productUpdateIdRequest = createAsyncThunk(
  'product/updateId',
  async ({ data, onSuccess, onError }: IProductRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productServices.updateId(data)
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

export const productCreateRequest = createAsyncThunk(
  'product/create',
  async ({ data, onSuccess, onError }: IProductRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productServices.create(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
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

export const productSearchRequest = createAsyncThunk(
  'product/search',
  async ({ data, onSuccess, onError, forSelect }: IProductRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productServices.search(data, forSelect)
    if (response.kind === 'ok') {
      // toast.success('Create Succeed!')
      const _dataRole =
        response.data.data?.result?.map?.((item) => {
          return {
            ...item,
          }
        }) || []

      const dataTransfer = {
        result: _dataRole,
        pagination: response.data?.data?.pagination,
      }
      onSuccess?.(response.data.data.pagination.rowCount)
      return dataTransfer
    } else {
      // toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const productUpdateIdStatusRequest = createAsyncThunk(
  'product/updateIdStatus',
  async ({ data, onSuccess, onError }: IProductRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await productServices.updateIdStatus(data)
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
