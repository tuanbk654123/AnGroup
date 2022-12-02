import { FilterTypes } from '~/types/common'

type MenuFilter = 'code' | 'name'

export interface MenuFilterTypes extends FilterTypes {
  filter?: Partial<Record<MenuFilter, string>>
}
