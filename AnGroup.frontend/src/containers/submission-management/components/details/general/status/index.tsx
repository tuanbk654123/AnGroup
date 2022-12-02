import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { PapperTable } from '~/components/common'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { submissionSearchLogRequest } from '~/redux/slices/submission/middleware'
import { formatTimeInTable } from '~/utils'

interface RecordDataType {
  key: React.ReactNode
  id: string
  status: string
  subStatus: string
  history: string
  createdBy: string
  module: string
  result: string
  modifyDate: string
  createdDate: string
}

const DEFAULT_PAGINATION = 1
const DEFAULT_PAGE_SIZE = 10

export default function StatusForm() {
  const { t } = useAppTranslation()
  const columns: ColumnsType<RecordDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('table.column.status'),
      dataIndex: 'status',
      key: 'status',
      width: '8%',
    },
    {
      title: t('submissionManagement.subStatus'),
      dataIndex: 'subStatus',
      key: 'subStatus',
    },
    {
      title: t('submissionManagement.history'),
      dataIndex: 'history',
      key: 'history',
    },
    {
      title: t('table.column.createBy'),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: t('submissionManagement.module'),
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: t('submissionManagement.result'),
      dataIndex: 'result',
      key: 'result',
      width: '20%',
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => formatTimeInTable(createdDate),
    },
  ]

  const [logData, setLogData] = useState([])
  const [pagination, setPagination] = useState(null)
  const loading = useAppSelector((state) => state.submission.loading)
  const dispatch = useAppDispatch()
  const param: any = useCurrentParams()
  const { id } = useParams()

  const getLogById = useCallback(
    (filter) => {
      dispatch(
        submissionSearchLogRequest({
          data: {
            id,
            filterBody: {
              pagination: {
                pageIndex: filter?.pageCurrent || DEFAULT_PAGINATION,
                pageSize: filter?.pageSize || DEFAULT_PAGE_SIZE,
              },
              filter: {
                querySearch: '',
              },
            },
          },
          onSuccess(response?) {
            const sortedArray = response?.result.sort((a, b) => moment(b.createdDate).valueOf() - moment(a.createdDate).valueOf())
            setLogData(sortedArray)
          },
        }),
      )
    },
    [dispatch, id],
  )

  useEffect(() => {
    getLogById(pagination)
  }, [pagination, getLogById])

  return (
    <div>
      {/* <div className="mb-3 text-base font-bold">{t('submissionManagement.statusInfo')}</div> */}
      <div className="flex gap-5 text-sm font-black mb-3">
        <p >
          Ghh.AppID:

          <span className="pl-1">{param.ghpappid}</span>
        </p>
        <p>
          <span>{t('submissionManagement.customer')}:</span>
          <span className="pl-1">{param.name}</span>

        </p>
      </div>
      <PapperTable
        columns={columns}
        dataSource={logData}
        pagination={{
          current: pagination?.pageCurrent,
          defaultPageSize: pagination?.pageSize,
          total: pagination?.rowCount,
          onChange(page, pageSize) {
            setPagination({
              ...pagination,
              pageCurrent: page,
              pageSize,
            })
          },
        }}
        loading={loading}
      />
    </div>
  )
}
