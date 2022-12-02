import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { positionServices } from '~/services'
import { IFectchPositionRequest } from './index.types'

/**
 * create user
 * */
export const getPositions = createAsyncThunk(
  'position/fetch',
  async ({ positionFilter, onSuccess, forSelect }: IFectchPositionRequest) => {
    const response = await positionServices.getPosition(positionFilter, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data.data.result)
      return response.data.data.result
    } else {
      toast.error('Something went wrong!')
      return null
    }
  },
)
