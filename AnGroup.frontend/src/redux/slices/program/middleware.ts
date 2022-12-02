import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProgramRequest } from './index.types'
import { programServices } from '~/services/program'

export const programGetAllRequest = createAsyncThunk(
  'program/getAll',
  async ({ data, onSuccess, onError }: IProgramRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await programServices.getAll()
    if (response.kind === 'ok') {
      onSuccess?.()
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const programGetByIdRequest = createAsyncThunk(
  'program/getById',
  async ({ data, onSuccess, onError }: IProgramRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await programServices.getById(id)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const programUpdateIdRequest = createAsyncThunk(
  'program/updateId',
  async ({ data, onSuccess, onError }: IProgramRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await programServices.updateId(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response.data)
      return rejectWithValue(response)
    }
  },
)

export const programCreateRequest = createAsyncThunk(
  'program/create',
  async ({ data, onSuccess, onError }: IProgramRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await programServices.create(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response.data)
      return rejectWithValue(response)
    }
  },
)

export const programUpdateIdStatusRequest = createAsyncThunk(
  'program/updateIdStatus',
  async ({ data, onSuccess, onError }: IProgramRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await programServices.updateIdStatus(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      // toast.success('Update Succeed!')
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      // toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response.data)
      return rejectWithValue(response)
    }
  },
)
