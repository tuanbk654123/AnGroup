import { ColumnsType } from 'antd/lib/table'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PapperTable } from '~/components/common/table'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { logworkGetAllRequest } from '~/redux/slices/logwork/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { UserLogworkListActions } from '../actions'

interface RecordDataType {
  key: React.ReactNode
  id: string
  time: string
  actions: string
  createBy: string
  code: string
  role: string
  createdDate: string
}

export const UserLogworkList = () => {
  const { t } = useAppTranslation()
  const columns: ColumnsType<RecordDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => formatTimeInTable(createdDate),
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: t('table.column.createBy'),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: t('userLogwork.title'),
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: t('userLogwork.Endpoint'),
      dataIndex: 'endpoint',
      key: 'endpoint',
    },
  ]

  const dataLogwork = useAppSelector((state) => state.logwork.dataLogwork)
  const pagination = useAppSelector((state) => state.logwork.pagination)
  const loading = useAppSelector((state) => state.logwork.loading)

  const currentParams = useCurrentParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getData = (_params) => {
    const { search, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params
    dispatch(
      logworkGetAllRequest({
        logworkFilters: {
          pagination: {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
          },
          filter: {
            createdBy: search || '',
            method: '1',
            // 1-Get 2-Post 3-Put 4-Delete
          },
        },
      }),
    )
  }

  useEffect(() => {
    getData(currentParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParams])
  const handleRowClick = (record: RecordDataType) => {
    navigate({
      pathname: RouterHelper.cms_user_logwork_detail_ref(record.id),
      // search: createSearchParams({ ...currentParams, org_name: record.group }).toString(),
    })
  }

  return (
    <div className="bg-white p-4">
      <UserLogworkListActions />
      <PapperTable
        dataSource={dataLogwork.result}
        columns={columns}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleRowClick(record),
          }
        }}
        pagination={{
          current: pagination?.pageCurrent,
          defaultPageSize: pagination?.pageSize,
          total: pagination?.rowCount,
        }}
      />
    </div>
  )
}
