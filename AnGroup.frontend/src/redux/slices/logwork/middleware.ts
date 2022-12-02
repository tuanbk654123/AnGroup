import { createAsyncThunk } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'
import { logworkServices } from '~/services'
import { IFectchLogworkById, IFectchLogworkRequest } from './index.types'

export const logworkGetAllRequest = createAsyncThunk(
  'userLogwork/getAll',
  async ({ logworkFilters, onSuccess }: IFectchLogworkRequest) => {
    const response = await logworkServices.getAll(logworkFilters)

    if (response.kind === 'ok') {
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
      return []
    }
  },
)

export const userLogworkGetByIdRequest = createAsyncThunk(
  'userLogwwork/getById',
  async ({ userLogworkId, onSuccess, onError }: IFectchLogworkById, { fulfillWithValue, rejectWithValue }) => {
    const response = await logworkServices.getById(userLogworkId)
    if (response.kind === 'ok') {
      onSuccess?.(response.data?.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
