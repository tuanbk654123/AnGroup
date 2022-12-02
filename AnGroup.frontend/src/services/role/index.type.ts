import { IPaginationRequest } from '../index.types'

export interface IRoleSearchByNameFilter {
  querySearch?: string
  name?: string
}

export interface IRoleSearchByNameBody {
  pagination?: IPaginationRequest
  filter?: IRoleSearchByNameFilter
}
