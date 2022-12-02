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
  statusInApp: 'Approved' | 'New' | 'OCR fail' | 'Rejected' | 'Draft'
  createTime: string
  createdDate: string
}

export const SubmissionListing = () => {
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
      title: t('submissionManagement.statusInApp'),
      // dataIndex: 'statusName',
      key: 'statusName',
      render: (value) => {
        return (
          <div>{value.statusName !== "" ? value.statusName : value.status}</div>
        )
      }
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
