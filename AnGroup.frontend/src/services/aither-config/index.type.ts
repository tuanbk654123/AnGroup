import { FilterTypes } from '~/types/common'

// type AitherConfigFilter = 'querySearch' | 'fullname' | 'email' | 'userType'
export interface AitherConfigFilter {
  querySearch?: string
  queryData?: {
    varname: string
    vargroup: string
  }
}

export interface AitherConfigFilterTypes extends FilterTypes {
  filter?: AitherConfigFilter
}
