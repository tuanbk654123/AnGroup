import { IBaseMiddlewareRequest } from '../index.types'
export interface IFolderState {
  dataFolder?: any
  loading: boolean
}

export interface IFectchFolderRequest {
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}

export interface IFolderRequest extends IBaseMiddlewareRequest<any> {}
