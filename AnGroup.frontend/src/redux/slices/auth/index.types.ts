import { IBaseMiddlewareRequest } from '../index.types'

export interface ICurrentUser {
  Username?: string
  Fullname?: string
  Status?: string
  Email?: string
  LastLogin?: string
  IpDevice?: string
  UserRoles?: string[]
  Id?: number
  CreatedDate?: string
  ModifiedDate?: string
  Usertype: string
  ProfileImageUrl: string
}

export interface IPageSettings {
  Key?: string
  Id?: number
  Text: string
  Icon: string
  Label: string
  Data: any
  Children: any
  ShowOnMenu?: boolean
  Code?: string
}

export interface ILoginRequest extends IBaseMiddlewareRequest<any> {}
