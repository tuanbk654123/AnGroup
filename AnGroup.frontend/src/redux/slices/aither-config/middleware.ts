import { createAsyncThunk } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'
import { aitherConfigServices } from '~/services/aither-config'

import { ICreateAitherConfigRRequest, IFectchAitherConfigRequest } from './index.types'

export const getAtherConfig = createAsyncThunk(
  'helps/getAll',
  async ({ atherConfigFilter, onSuccess }: IFectchAitherConfigRequest) => {
    const response = await aitherConfigServices.getAll(atherConfigFilter)

    if (response.kind === 'ok') {
      const _dataAitherConfig =
        response.data.data?.result?.map?.((item) => {
          return {
            ...item,
          }
        }) || []

      const dataTransfer = {
        result: _dataAitherConfig,
        pagination: response.data?.data?.pagination,
        loading: false,
      }
      onSuccess?.(response.data.data.pagination.rowCount)
      return dataTransfer
    } else {
      return []
    }
  },
)
export const updateAitherConfig = createAsyncThunk(
  'aitherconfig/update',
  async ({ aitherConfig, onSuccess, onError }: ICreateAitherConfigRRequest) => {
    const response = await aitherConfigServices.update(aitherConfig)
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
