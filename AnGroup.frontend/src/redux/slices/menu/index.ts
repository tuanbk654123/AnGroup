import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import arrayToTree from 'array-to-tree'
import { RootState } from '~/redux/store'
import { Menu, MenuTree } from '~/types/menu'
import { flatten, recusiveAddLevelForEachItem } from '~/utils/helper'
import { getMenu } from './middleware'

export interface IMenuState {
  menu: Menu[]
  loading: boolean
  menuTrees: MenuTree[]
  menuLeve01: Menu[]
  menuLeve02: Menu[]
}
const initialState: IMenuState = {
  menu: [],
  loading: false,
  menuTrees: [],
  menuLeve01: [],
  menuLeve02: [],
  // dataMenuDetails: null,
}
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenu.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getMenu.fulfilled, (state, action: PayloadAction<Menu[]>) => {
      const generateTreeMenu: any = recusiveAddLevelForEachItem({
        data: arrayToTree(action.payload, {
          parentProperty: 'parentId',
          customID: 'id',
        }),
      })
      const menu = flatten(generateTreeMenu)
      state.menu = menu
      state.menuTrees = generateTreeMenu
      state.menuLeve01 = menu.filter((item) => item.level === 1)
      state.menuLeve02 = menu.filter((item) => item.level === 2)
      state.loading = false
    })
    builder.addCase(getMenu.rejected, (state, action) => {
      state.menu = []
      state.menuTrees = []
      state.menuLeve01 = []
      state.menuLeve02 = []
      state.loading = false
    })
  },
})

export const menuActions = menuSlice.actions

export const menuReducer = menuSlice.reducer

// selectors
export const selectMenuLoading = (state: RootState) => state.menu.loading
export const selectListMenu = (state: RootState) => state.menu.menu
export const selectMenuTrees = (state: RootState) => state.menu.menuTrees
export const selectMenuLevel01 = (state: RootState) => state.menu.menuLeve01
export const selectMenuLevel02 = (state: RootState) => state.menu.menuLeve02
