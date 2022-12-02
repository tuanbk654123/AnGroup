import { IBaseMiddlewareRequest } from '../index.types'

export interface ILoadingContainerRequest extends IBaseMiddlewareRequest<any> {
  isLoadingContainer: boolean
}
