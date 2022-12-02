import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaginationResponse } from '~/types/common'
import { RootState } from '~/redux/store'
import { User } from '~/types'
import { ListResponse, ObjectRespone } from '~/types/common'
import { createUser, editUser, fetchUserById, fetchUsers,userSearchRequest } from './middleware'

export interface IUserState {
  loading: boolean
  users: User[]
  totalCount: number
  listUserIdEdit: number[]
  loadingGetUserById: boolean
  userDetail: any
  pagination: PaginationResponse
}
const initialState: IUserState = {
  loading: false,
  users: [],
  totalCount: 0,
  listUserIdEdit: [],
  loadingGetUserById: false,
  userDetail: [],
  pagination: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUserState['users']>) => {
      state.users = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createUser.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(fetchUsers.pending, (state, action: PayloadAction<ListResponse<User>>) => {
      state.loading = true
    })
    //SEARCH
    builder.addCase(userSearchRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(userSearchRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.users = action.payload.result
      state.loading = false
      const newPagination = action.payload?.pagination || {}

      if (action.payload?.pagination) {
        state.pagination = { ...state.pagination, ...newPagination }
      } else {
        state.pagination = null
      }
      // state.pagination = { ...state.pagination, ...newPagination }
    })
    builder.addCase(userSearchRequest.rejected, (state, action) => {
      state.loading = false
      console.log({ state, action })
    })
    builder.addCase(fetchUsers.fulfilled.toString(), (state, action: PayloadAction<ListResponse<User>>) => {
      const users = action.payload?.data?.data?.result.map((item) => ({
        ...item,
        key: item.id,
      }))
      state.users = users
      state.totalCount = action.payload?.data?.data?.pagination?.rowCount
      state.loading = false
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false
      state.users = []
      state.totalCount = 0
    })
    builder.addCase(editUser.pending, (state, action: any) => {
      const idEdit = +action?.meta.arg.user.id
      state.listUserIdEdit = state.listUserIdEdit.concat(idEdit)
    })
    builder.addCase(editUser.fulfilled, (state, action: PayloadAction<ObjectRespone<User>>) => {
      const userEditSuccess = action.payload.data.data
      const listUserIdPendingEdit = state.listUserIdEdit
      const newListUserEdit = listUserIdPendingEdit.filter((item) => item !== +userEditSuccess.id)
      state.listUserIdEdit = newListUserEdit
    })
    builder.addCase(fetchUserById.pending, (state) => {
      state.loadingGetUserById = true
    })
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loadingGetUserById = false
      state.userDetail = action.payload
    })
    builder.addCase(fetchUserById.rejected, (state) => {
      state.loadingGetUserById = false
    })
  },
})

//actions
export const userActions = userSlice.actions

// reducers
export const userReducer = userSlice.reducer

// selectors
// Create User
export const selectCreateUserLoading = (state: RootState) => state.user.loading

export const selectFetchUserLoading = (state: RootState) => state.user.loading
export const selectLoadingFetchUserById = (state: RootState) => state.user.loadingGetUserById
export const selectUsers = (state: RootState) => state.user.users
export const selectTotalCount = (state: RootState) => state.user.totalCount
export const selectListUserIdEdit = (state: RootState) => state.user.listUserIdEdit
