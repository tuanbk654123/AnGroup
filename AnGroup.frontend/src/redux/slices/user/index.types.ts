import { UserFilterTypes } from '~/services/user/index.type'
import { User } from '~/types'
import { IBaseMiddlewareRequest } from '../index.types'

export type CreateSuccessResponse = {
  data: User | null
  message: string
}
export interface ICreateEditUserRequest {
  user?: User
  onSuccess?: (data?: CreateSuccessResponse) => void
  onError?: (error?: any) => void
}

export interface ISearchUserRequest extends IBaseMiddlewareRequest<any> {}{
}

export interface IFectchUserRequest {
  forSelect?: boolean
  userFilters: UserFilterTypes
  onSuccess?: (data?: number) => void
  onError?: (error?: any) => void
}

export interface IFectchUserById {
  userId: number
  onSuccess?: (data?: User) => void
  onError?: (error?: any) => void
}
