import { IPageSettings } from '../auth/index.types'
import { IBaseMiddlewareRequest } from '../index.types'

export interface IPageActiveRequest extends IBaseMiddlewareRequest<any> {
  pageActive: IPageSettings
}
