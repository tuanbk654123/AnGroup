import { createAsyncThunk } from '@reduxjs/toolkit'
import { helpsServices } from '~/services'
import { ICreateHelpsRequest, IFectchHelpsRequest } from './index.types'

export const helpsGetAllRequest = createAsyncThunk(
  'helps/getAll',
  async ({ helpsFilters, onSuccess }: IFectchHelpsRequest) => {
    const response = await helpsServices.getAll(helpsFilters)
    // if (response.kind === 'ok') {
    //   onSuccess?.(response.data.data.pagination.rowCount)
    //   return response.data.data
    // } else {
    //   return []
    // }

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

export const createHelps = createAsyncThunk(
  'helps/create',
  async ({ helps, onSuccess, onError }: ICreateHelpsRequest) => {
    const response = await helpsServices.create(helps)

    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      // toast.success('Create Succeed!')
      return response.data
    } else {
      // toast.error('Something went wrong!')
      onError?.(response.error)
      return response.error
    }
  },
)

export const updateHelps = createAsyncThunk(
  'helps/update',
  async ({ helps, onSuccess, onError }: ICreateHelpsRequest) => {
    const response = await helpsServices.update(helps)
    if (response.kind === 'ok' && response?.data?.status === 1) {
      onSuccess?.(response.data)
      // toast.success('Update Succeed!')
      return response.data
    } else {
      // toast.error('Something went wrong!')
      onError?.(response.error)
      return response.error
    }
  },
)
