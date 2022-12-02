import { configPageCategoryCrawlServices } from './../../../services/configpagecategorycrawl/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreativeRequest } from './index.types'

export const   configPageCategoryCrawlGetByIdRequest = createAsyncThunk(
  'configpagecategorycrawl/getById',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    console.log(forSelect)
    console.log(data)
    const response = await configPageCategoryCrawlServices.getById(id, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const configPageCategoryCrawlCreateRequest = createAsyncThunk(
  'configpagecategorycrawl/create',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await configPageCategoryCrawlServices.create(data)
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

export const configPageCategoryCrawlUpdateIdRequest = createAsyncThunk(
  'configpagecategorycrawl/updateId',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await configPageCategoryCrawlServices.updateId(data)
    if (response.kind === 'ok' && response.data?.isSuccess === true) {
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


