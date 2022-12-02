import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { departmantServices } from '~/services'
import { IFetchDepartmentRequest } from './index.types'

/**
 * get departments
 * */

export const getDepartments = createAsyncThunk(
  'departments/fetch',
  async ({ departmentFilter, onSuccess, forSelect }: IFetchDepartmentRequest) => {
    const response = await departmantServices.getAll(departmentFilter, forSelect)
    if (response.kind === 'ok') {
      onSuccess?.(response.data.data.result)
      return response.data.data.result.map((item) => ({ ...item, key: item.id }))
    } else {
      toast.error('Something went wrong!', { autoClose: 1000 })
      return null
    }
  },
)
