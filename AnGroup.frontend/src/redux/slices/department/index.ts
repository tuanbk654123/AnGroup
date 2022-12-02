import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '~/redux/store'
import { Department, DepartmentTree } from '~/types'
import { flatten, recusiveAddLevelForEachItem } from '~/utils/helper'
import { getDepartments } from './middleware'
import arrayToTree from 'array-to-tree'
export interface IDepartmentState {
  departments: Department[]
  loading: boolean
  departmentTrees: DepartmentTree[]
  departmentLeve01: Department[]
  departmentLeve02: Department[]
}
const initialState: IDepartmentState = {
  departments: [],
  loading: false,
  departmentTrees: [],
  departmentLeve01: [],
  departmentLeve02: [],
}

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // new
    builder.addCase(getDepartments.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getDepartments.fulfilled, (state, action: PayloadAction<Department[]>) => {
      const generateTreeDepartments: any = recusiveAddLevelForEachItem({
        data: arrayToTree(action.payload, {
          parentProperty: 'parentId',
          customID: 'id',
        }),
        titleKey: 'name',
        valueKey: 'id',
      })
      const departments = flatten(generateTreeDepartments)
      state.departments = departments
      state.departmentTrees = generateTreeDepartments
      state.departmentLeve01 = departments.filter((item) => item.level === 1)
      state.departmentLeve02 = departments.filter((item) => item.level === 2)
      state.loading = false
    })
    builder.addCase(getDepartments.rejected, (state, action) => {
      state.departments = []
      state.departmentTrees = []
      state.departmentLeve01 = []
      state.departmentLeve02 = []
      state.loading = false
    })
  },
})

//actions
export const departmentActions = departmentSlice.actions

// reducers
export const departmentReducer = departmentSlice.reducer

// selectors
export const selectDepartmentLoading = (state: RootState) => state.department.loading
export const selectListDepartment = (state: RootState) => state.department.departments
export const selectDepartmentTrees = (state: RootState) => state.department.departmentTrees
export const selectDepartmentLevel01 = (state: RootState) => state.department.departmentLeve01
export const selectDepartmentLevel02 = (state: RootState) => state.department.departmentLeve02
