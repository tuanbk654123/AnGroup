import { FilterTypes } from '~/types/common'

export interface FolderFilterTypes extends FilterTypes {
  pagination: {
    pageIndex: number
    pageSize: number
    isAll: boolean
  }
}
