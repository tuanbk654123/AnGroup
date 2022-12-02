import { configCategoryHomeCrawlServices } from './../../../services/configcategoryhomecrawl/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreativeRequest } from './index.types'

export const configCategoryHomeCrawlGetByIdRequest = createAsyncThunk(
  'configcategoryhomecrawl/getById',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    console.log(forSelect)
    console.log(data)
    const response = await configCategoryHomeCrawlServices.getById(id, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const configCategoryHomeCrawlCreateRequest = createAsyncThunk(
  'configcategoryhomecrawl/create',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await configCategoryHomeCrawlServices.create(data)
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

export const configCategoryHomeCrawlUpdateIdRequest = createAsyncThunk(
  'configcategoryhomecrawl/updateId',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await configCategoryHomeCrawlServices.updateId(data)
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


