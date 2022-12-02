import { createAsyncThunk } from '@reduxjs/toolkit'
import { storageKeys } from '~/constants/storageKeys'
import { saveDataToStorage, saveValueToStorage } from '~/utils/storage.utils'
import { IPageActiveRequest } from './index.types'

export const pageActiveRequest = createAsyncThunk(
  'page/active',
  ({ pageActive, onSuccess, onError }: IPageActiveRequest, { fulfillWithValue, rejectWithValue }) => {
    saveValueToStorage(storageKeys.CURRENT_PAGE, pageActive.Code)
    saveDataToStorage(storageKeys.CURRENT_PAGE_INFO, pageActive)
    onSuccess?.(pageActive)
    return fulfillWithValue({
      pageActive,
    })
  },
)
