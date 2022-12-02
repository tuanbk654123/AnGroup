import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILoadingContainerRequest } from './index.types'

export const loadingContainerRequest = createAsyncThunk(
  'loading-container',
  ({ isLoadingContainer, onSuccess, onError }: ILoadingContainerRequest, { fulfillWithValue, rejectWithValue }) => {
    onSuccess?.(isLoadingContainer)
    return fulfillWithValue({
      isLoadingContainer,
    })
  },
)
