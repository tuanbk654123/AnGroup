import { FilterTypes } from '~/types/common'

// type HelpsFilter = 'querySearch' | 'fullname' | 'email' | 'userType'
export interface HelpsFilter {
  querySearch?: string
  queryData?: {
    id: number
    querySearch: string
  }
}

export interface HelpsFilterTypes extends FilterTypes {
  filter?: HelpsFilter
}
