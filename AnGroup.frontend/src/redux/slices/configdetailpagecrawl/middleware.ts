import { configDetailPageCrawlServices } from './../../../services/configdetailpagecrawl/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreativeRequest } from './index.types'

export const   configDetailPageCrawlGetByIdRequest = createAsyncThunk(
  'configpagecategorycrawl/getById',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    console.log(forSelect)
    console.log(data)
    const response = await configDetailPageCrawlServices.getById(id, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const configDetailPageCrawlCreateRequest = createAsyncThunk(
  'configpagecategorycrawl/create',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await configDetailPageCrawlServices.create(data)
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

export const configDetailPageCrawlUpdateIdRequest = createAsyncThunk(
  'configpagecategorycrawl/updateId',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await configDetailPageCrawlServices.updateId(data)
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


