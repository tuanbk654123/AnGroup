import { ColumnsType } from 'antd/lib/table'
import { PapperTable } from '~/components/common'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { formatTimeInTable } from '~/utils'
import { SubmissionListActions } from '../actions-into-list'

interface RecordDataType {
  key: React.ReactNode
  ghhAppID: string
  customer: string
  programNameEn: string
  productEn: string
  saleCode: string
  fast: string
  aither: string
  createdDate: string
}

export const PushToFastAitherList = () => {
  const { t } = useAppTranslation()
  const columns: ColumnsType<RecordDataType> = [
    {
      title: t('submissionManagement.Ghh.AppID'),
      dataIndex: 'ghpappid',
      key: 'ghpappid',
    },
    {
      title: t('submissionManagement.customer'),
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: t('submissionManagement.programNameEn'),
      dataIndex: 'programName',
      key: 'programName',
    },
    {
      title: t('submissionManagement.productEn'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('submissionManagement.saleCode'),
      dataIndex: 'saleCode',
      key: 'saleCode',
    },
    {
      title: t('submissionManagement.FAST'),
      // dataIndex: 'status',
      // key: 'status',
      render: (value) => {
        return (
          <div>{(value.status === 'DATACHECK' || value.status === 'ASSESSMENT' || value.status === 'APPROVED' || value.status === 'DEFER' || value.status === 'DECLINED') ? <div>{value.statusName}</div> : <div className="text-center">-</div>}</div>
        )
      },
    },
    {
      title: t('submissionManagement.Aither'),
      // dataIndex: 'status',
      // key: 'status',
      render: (value) => {
        return (
          <div>{(value.status === 'AI_NON_PROCESS_AFTER_APPROVAL' || value.status === 'AI_EXECUTION' || value.status === 'AI_REJECT' || value.status === 'AI_CANCEL') ? <div>{value.statusName}</div> : <div className="text-center">-</div>}</div>
        )
      },
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => formatTimeInTable(createdDate),
    },
  ]

  const dataSubmision = useAppSelector((state) => state.submission.dataSubmissions)
  const pagination = useAppSelector((state) => state.submission.pagination)
  const loading = useAppSelector((state) => state.submission.loading)

  return (
    <div>
      <SubmissionListActions />
      <PapperTable
        // rowSelection={{ type: 'checkbox' }}
        columns={columns}
        rowKey={({ id }) => id}
        dataSource={dataSubmision}
        pagination={{
          current: pagination?.pageCurrent,
          defaultPageSize: pagination?.pageSize,
          total: pagination?.rowCount,
        }}
        loading={loading}
      />
    </div>
  )
}
