import { FilterTypes } from '~/types/common'

type PositionFilter = 'code' | 'name'

export interface PositionFilterTypes extends FilterTypes {
  filter?: Record<PositionFilter, string>
}
