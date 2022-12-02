import { categoryServices } from './../../../services/category/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICategoryRequest } from './index.types'

export const categoryGetAllRequest = createAsyncThunk(
  'category/getAll',
  async ({ data, onSuccess, onError, forSelect }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryServices.getAll(forSelect)

    if (response.kind === 'ok') {
      onSuccess?.(response?.data)
      return fulfillWithValue(response?.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const categoryGetByIdRequest = createAsyncThunk(
  'category/getById',
  async ({ data, onSuccess, onError, forSelect }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await categoryServices.getById(id, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const categoryUpdateIdRequest = createAsyncThunk(
  'category/updateId',
  async ({ data, onSuccess, onError }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryServices.updateId(data)
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

export const categoryCreateRequest = createAsyncThunk(
  'category/create',
  async ({ data, onSuccess, onError }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryServices.create(data)
    if (response.kind === 'ok' && response.data?.isSuccess == true) {
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

export const categorySearchRequest = createAsyncThunk(
  'category/search',
  async ({ data, onSuccess, onError, forSelect }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryServices.search(data)
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

export const categoryUpdateIdStatusRequest = createAsyncThunk(
  'category/updateIdStatus',
  async ({ data, onSuccess, onError }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryServices.updateIdStatus(data)
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

export const categoryParentRequest = createAsyncThunk(
  'category/parent',
  async ({ data, onSuccess, onError, forSelect }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await categoryServices.getCategoryParent()
    if (response.kind === 'ok') {
      // toast.success('Create Succeed!')
      // const _dataRole =
      //   response.data.data?.map?.((item) => {
      //     return {
      //       label: item.name, value: item.id
      //     }
      //   }) || []

      // const dataTransfer = {
      //   result: _dataRole,
      //   pagination: response.data?.data?.pagination,
      // }
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      // toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response)
      return rejectWithValue(response)
    }
  },
  
)
export const categoryParentUpdateRequest = createAsyncThunk(
  'category/parent',
  async ({ data, onSuccess, onError, forSelect }: ICategoryRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await categoryServices.getCategoryParentUpdate(id)
    if (response.kind === 'ok') {
      // toast.success('Create Succeed!')
      // const _dataRole =
      //   response.data.data?.map?.((item) => {
      //     return {
      //       label: item.name, value: item.id
      //     }
      //   }) || []

      // const dataTransfer = {
      //   result: _dataRole,
      //   pagination: response.data?.data?.pagination,
      // }
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      // toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
