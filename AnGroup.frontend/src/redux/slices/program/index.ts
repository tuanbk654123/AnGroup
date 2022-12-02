import { programGetAllRequest, programGetByIdRequest } from './middleware'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProgramState } from './index.types'

const initialState: IProgramState = {
  dataProgram: [],
  dataProgramDetails: null,
}

export const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IProgramState['dataProgram']>) => {
      state.dataProgram = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(programGetAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.dataProgram = action.payload
    })
    builder.addCase(programGetAllRequest.rejected, (state, action) => {
      console.log({ state, action })
    })

    // GET BY ID
    builder.addCase(programGetByIdRequest.fulfilled, (state, action) => {
      state.dataProgramDetails = action.payload
    })
    builder.addCase(programGetByIdRequest.rejected, (state, action) => {
      console.log({ state, action })
    })
  },
})

export const programActions = programSlice.actions

export const programReducer = programSlice.reducer
