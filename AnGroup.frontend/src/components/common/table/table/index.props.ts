import { TablePaginationConfig, TableProps } from 'antd'
import { t } from 'i18next'

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE_INDEX = 1

export const DEFAULT_PAGINATION: TablePaginationConfig = {
  defaultPageSize: DEFAULT_PAGE_SIZE,
  showQuickJumper: true,
  responsive: true,
  showTotal: (total) => `${t('page.total')} ${total} ${t('page.items')}`,
}

export interface IPapperTableProps extends TableProps<any> {}
