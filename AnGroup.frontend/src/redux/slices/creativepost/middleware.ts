import { creativePostServices } from './../../../services/creativepost/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreativeRequest } from './index.types'

export const creativePostGetAllRequest = createAsyncThunk(
  'creativepost/getAll',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.getAll(forSelect)

    if (response.kind === 'ok') {
      onSuccess?.(response?.data)
      return fulfillWithValue(response?.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const creativePostGetByIdRequest = createAsyncThunk(
  'creativepost/getById',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await creativePostServices.getById(id, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const creativePostUpdateIdRequest = createAsyncThunk(
  'creativepost/updateId',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.updateId(data)
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

export const creativePostCreateRequest = createAsyncThunk(
  'creativepost/create',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.create(data)
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

export const creativePostSearchRequest = createAsyncThunk(
  'creativepost/search',
  async ({ data, onSuccess, onError, forSelect }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.search(data, forSelect)
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

export const creativePostUpdateIdStatusRequest = createAsyncThunk(
  'creativepost/updateIdStatus',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.updateIdStatus(data)
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

export const creativePostUpdateListIdStatusRequest = createAsyncThunk(
  'creativepost/updateListIdStatus',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.updateListIdStatus(data)
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

export const creativePostUpdateListIdShowRequest = createAsyncThunk(
  'creativepost/updateListIdShow',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.updateListIdShow(data)
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

export const creativePostDeleteRequest = createAsyncThunk(
  'creativepost/delete',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.delete(data)
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
export const creativePostDeleteListRequest = createAsyncThunk(
  'creativepost/deletelist',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.deleteListId(data)
    if (response.kind === 'ok' && response.data?.isSuccess == true) {
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


export const creativePostUploadFileRequest = createAsyncThunk(
  'creativepost/api/cms/file/UploadFile',
  async ({ data, onSuccess, onError }: ICreativeRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await creativePostServices.upload(data)
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
