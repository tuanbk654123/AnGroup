import { createAsyncThunk } from '@reduxjs/toolkit'
import { reportServices } from '~/services'
import { IFectchReportRequest } from './index.types'

export const reportGetAllRequest = createAsyncThunk(
  'report/getAll',
  async ({ reportFilters, onSuccess }: IFectchReportRequest) => {
    const response = await reportServices.getAll(reportFilters)
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

export const reportGetAlls = createAsyncThunk(
  'report/getAlls',
  async ({ reportFilters, onSuccess, onError }: IFectchReportRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await reportServices.getAll(reportFilters)

    if (response.kind === 'ok') {
      onSuccess?.(response.data.data.pagination.rowCount)
      return fulfillWithValue(response?.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
