import { PaginationProps, Table, TablePaginationConfig, TableProps } from 'antd'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'

import { DEFAULT_PAGINATION, IPapperTableProps } from './index.props'

import './style.scss'

export const PapperTable = ({ pagination = {}, ...props }: IPapperTableProps) => {
  const params = useCurrentParams()
  const location = useLocation()
  const navigate = useNavigate()

  const handleChange: PaginationProps['onChange'] = (page, pageSize) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        ...params,
        pageIndex: `${page}`,
        pageSize: `${pageSize}`,
      }).toString(),
    })
  }

  const _pagition: TablePaginationConfig = {
    ...DEFAULT_PAGINATION,
    onChange: handleChange,
    ...pagination,
  }
  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    const objSort = {};
    let strSort = '';
    if (sorter && sorter["field"]) {
      objSort[sorter["field"]] = sorter["order"];
    } else {
      objSort['createdDate'] = 'descend';
    }
    strSort = JSON.stringify(objSort);
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        ...params,
        pageIndex: `${pagination.current == null ? pagination.defaultCurrent : pagination.current}`,
        pageSize: `${pagination.pageSize == null ? pagination.defaultPageSize : pagination.pageSize}`,
        sort: strSort
      }).toString(),
    })
  };

  return (
    <div>
      <Table pagination={!pagination ? false : _pagition} className="papper-table__custom" {...props} onChange={onChange} size="small" />
    </div>
  )
}
