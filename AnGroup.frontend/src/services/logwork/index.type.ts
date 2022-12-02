import { FilterTypes } from '~/types/common'

// type HelpsFilter = 'querySearch' | 'fullname' | 'email' | 'userType'
export interface LogworkFilter {
  querySearch?: string
  createdBy: string
  method: string
  queryData?: {
    id: number
    querySearch: string
  }
}

export interface LogworkFilterTypes extends FilterTypes {
  filter?: LogworkFilter
}
