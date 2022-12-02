import { FilterTypes } from '~/types/common'

export interface NotificationFilter {
  querySearch?: string
  queryData?: {
    id: number
    querySearch: string
  }
}

export interface NotificationFilterTypes extends FilterTypes {
  filter?: NotificationFilter
}
