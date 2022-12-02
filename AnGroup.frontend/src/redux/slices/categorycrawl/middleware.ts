import { categoryCrawlServices } from './../../../services/categorycrawl/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreativeRequest } from './index.types'

export const categoryCrawlGetByIdRequest = createAsyncThunk(
  'categorycrawl/getById',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    console.log(forSelect)
    console.log(data)
    const response = await categoryCrawlServices.getById(id, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const categoryCrawlCreateRequest = createAsyncThunk(
  'categorycrawl/create',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryCrawlServices.create(data)
    if (response.kind === 'ok' && response?.data?.isSuccess === true) {
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

export const categoryCrawlSearchRequest = createAsyncThunk(
  'categorycrawl/search',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryCrawlServices.search(data, forSelect)
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

export const getCheckData = createAsyncThunk(
  'categorycrawl/getcheckdata',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await categoryCrawlServices.checkData(id)
    if (response.kind === 'ok' && response?.data?.isSuccess === true) {
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

export const categoryCrawlGetAllRequest = createAsyncThunk(
  'category/getAll',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryCrawlServices.getAll(forSelect)

    if (response.kind === 'ok') {
      onSuccess?.(response?.data)
      return fulfillWithValue(response?.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)


