import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { menuServices } from '~/services/menu'
import {} from '~/services/role/index.type'
import { ICreateEditMenuRequest, IFectchMenuById, IFetchMenuRequest, IMenuRequest } from './index.types'

export const menuGetAllRequest = createAsyncThunk(
  'menu/getAll',
  async ({ onSuccess, onError }: IMenuRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await menuServices.getTree()
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data || [])
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
export const createMenu = createAsyncThunk(
  'menu/create',
  async ({ menu, onSuccess, onError }: ICreateEditMenuRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await menuServices.create(menu)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response.error)
      return rejectWithValue(response)
    }
  },
)
export const menuGetByIdRequest = createAsyncThunk(
  'menu/getById',
  async ({ menuId, onSuccess, onError }: IFectchMenuById, { fulfillWithValue, rejectWithValue }) => {
    const response = await menuServices.getById(menuId)
    if (response.kind === 'ok') {
      onSuccess?.(response.data?.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

/**
 * edit menu
 * */
export const editMenu = createAsyncThunk('user/menu', async ({ menu, onSuccess, onError }: ICreateEditMenuRequest) => {
  const response = await menuServices.edit(+menu.id, menu)
  if (response.kind === 'ok') {
    onSuccess?.(response.data)
    return response
  } else {
    toast.error('Something went wrong!')
    onError?.(response.error)
    return response.error
  }
})

export const getMenu = createAsyncThunk('menu/search', async ({ onSuccess, forSelect }: IFetchMenuRequest) => {
  const response = await menuServices.getAll(forSelect)
  if (response.kind === 'ok') {
    onSuccess?.(response.data.data)
    return response.data.data.map((item) => ({ ...item, key: item.id }))
  } else {
    toast.error('Something went wrong!')
    return null
  }
})
