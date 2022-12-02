import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IFolderState } from './index.types'
import { folderDownloadRequest, folderGetAllRequest } from './middleware'

const initialState: IFolderState = {
  dataFolder: [],
  loading: false,
}

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IFolderState['dataFolder']>) => {
      state.dataFolder = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(folderGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(folderGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.dataFolder = action.payload
    })
    builder.addCase(folderGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })
    builder.addCase(folderDownloadRequest.pending, (state) => {
      // state.loading = true
      toast.success('Download')
    })
    builder.addCase(folderDownloadRequest.fulfilled, (state, action: PayloadAction<any>) => {
      // state.loading = false
      //   toast.promise(response, {
      //     pending: 'Loading',
      //     success: 'Got the data',
      //     error: 'Error when fetching',
      //  })
      toast.success('Download done')
    })
    builder.addCase(folderDownloadRequest.rejected, (state, action) => {
      // state.loading = false
      console.log({ state, action })
      toast.error('Download error')
    })
  },
})

export const folderActions = folderSlice.actions

export const folderReducer = folderSlice.reducer
