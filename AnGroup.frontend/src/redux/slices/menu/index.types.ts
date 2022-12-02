// import { MenuFilterTypes } from '~/services/menu/index.type'
import { Menu } from '~/types/menu'
import { IBaseMiddlewareRequest } from '../index.types'

export interface IMenuState {
  dataMenu?: any[]
  dataMenuDetails?: any
  loading: boolean
}
export type CreateSuccessResponse = {
  data: Menu | null
  message: string
}
export interface ICreateEditMenuRequest {
  menu?: Menu
  onSuccess?: (data?: CreateSuccessResponse) => void
  onError?: (error?: any) => void
}

export interface IFetchMenuRequest {
  // menuFilter: MenuFilterTypes
  onSuccess?: (data?: Menu[]) => void
  onError?: (error?: any) => void
  forSelect?: boolean
}

export interface IFectchMenuById {
  menuId: number
  onSuccess?: (data?: Menu) => void
  onError?: (error?: any) => void
}

export interface IMenuRequest extends IBaseMiddlewareRequest<any> {}
