import { FilterTypes } from '~/types/common'

type ReviewFilter = 'saleId' | 'rating' | 'ProfileId' | 'userId'

export interface ReviewFilterTypes extends FilterTypes {
  filter?: Partial<Record<ReviewFilter, any>>
}
