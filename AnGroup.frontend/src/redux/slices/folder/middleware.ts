import { createAsyncThunk } from '@reduxjs/toolkit'
import { folderServices } from '~/services'
import { Folder } from '~/types'
import { ListAllResponse } from '~/types/common'
import { withRetryFunction } from '~/utils/function.utils'
import { IFolderRequest } from './index.types'

export const folderGetAllRequest = createAsyncThunk(
  'folder/getAll',
  async ({ onSuccess, onError }: IFolderRequest, { fulfillWithValue, rejectWithValue }) => {
    const getAllFolderService = withRetryFunction<ListAllResponse<Folder>>({
      callback: folderServices.getAll,
      numberOfRetries: 3,
      retryTimeout: 5000,
      needRetry: (res) => {
        return !res.data?.data?.length
      },
    })

    // const response = await folderServices.getAll()
    const response = await getAllFolderService()
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
export const folderDownloadRequest = createAsyncThunk(
  'folder/download',
  async ({ folder, onSuccess, onError }: any) => {
    const response = await folderServices.download(folder)
    const file = response.data
    console.log(file)
    const data = new Blob([file], { type: 'application/zip' })
    const zipURL = window.URL.createObjectURL(data)
    const tempLink = document.createElement('a')
    tempLink.href = zipURL
    tempLink.setAttribute('download', folder.name)
    tempLink.click()
  },
)
