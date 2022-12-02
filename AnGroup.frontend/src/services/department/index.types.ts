import { FilterTypes } from '~/types/common'

type DepartmentFilter = 'code' | 'name' | 'status' | 'querySearch' | 'type' | 'userId'

export interface DepartmentFilterTypes extends FilterTypes {
  filter?: Partial<Record<DepartmentFilter, string>>
}
