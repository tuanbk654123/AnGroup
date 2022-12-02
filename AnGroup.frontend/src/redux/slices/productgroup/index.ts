import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { groupUpdateIdStatusRequest, productgroupGetAllRequest, productgroupGetByIdRequest } from './middleware'

export interface IProductgroupState {
  dataProductgroup?: any[]
  dataProductgroupDetail?: any
  loading: boolean
}

const initialState: IProductgroupState = {
  dataProductgroup: [],
  dataProductgroupDetail: null,
  loading: false,
}

export const productgroupSlice = createSlice({
  name: 'productgroup',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IProductgroupState['dataProductgroup']>) => {
      state.dataProductgroup = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(productgroupGetAllRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(productgroupGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataProductgroup = action.payload
      state.loading = false
    })
    builder.addCase(productgroupGetAllRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(productgroupGetByIdRequest.fulfilled, (state, action) => {
      state.dataProductgroupDetail = action.payload
    })
    builder.addCase(productgroupGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })

    //loading-UPDATE-STATUS
    builder.addCase(groupUpdateIdStatusRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(groupUpdateIdStatusRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    builder.addCase(groupUpdateIdStatusRequest.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const productgroupActions = productgroupSlice.actions

export const productgroupReducer = productgroupSlice.reducer
