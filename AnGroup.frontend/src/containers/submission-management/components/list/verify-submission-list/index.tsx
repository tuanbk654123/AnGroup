import { ColumnsType } from 'antd/lib/table'
import { createSearchParams, useNavigate } from 'react-router-dom'
// import { createSearchParams, useNavigate } from 'react-router-dom'
import { PapperTable } from '~/components/common'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { formatTimeInTable, RouterHelper } from '~/utils'
// import { useCurrentParams } from '~/hooks'
// import { RouterHelper } from '~/utils'
import { SubmissionListActions } from '../actions-into-list'

interface RecordDataType {
  key: React.ReactNode
  ghhAppID: string
  customer: string
  programNameEn: string
  productEn: string
  saleCode: string
  status: 'Approved' | 'New' | 'OCR fail' | 'Rejected' | 'DraftDraft'
  createdDate: string
}

export const VerifySubmissionList = () => {
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
      key: 'productEn',
    },
    {
      title: t('submissionManagement.saleCode'),
      dataIndex: 'saleCode',
      key: 'saleCode',
    },
    {
      title: t('table.column.status'),
      // dataIndex: 'statusName',
      key: 'status',
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
    {
      title: t('submissionManagement.editingUser'),
      dataIndex: 'editingUsername',
      key: 'editingUsername',
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      key: 'action',
      render: (value, record, index) => (
        <TableActions
          allowActions={['edit']}
          onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
        />
      ),
    },
  ]

  const dataSubmision = useAppSelector((state) => state.submission.dataSubmissions)
  const pagination = useAppSelector((state) => state.submission.pagination)
  const loading = useAppSelector((state) => state.submission.loading)

  const navigate = useNavigate()
  const currentParams = useCurrentParams()

  const handleEdit = (recordEdit: any) => {
    navigate({
      pathname: RouterHelper.submission_detail_ref(recordEdit.id),
      search: createSearchParams({ ...currentParams, name: recordEdit.clientName }).toString(),
    })
  }

  const handleColumnAction = (actionType, value, record) => {
    if (actionType === EActionsType.edit) {
      handleEdit(record)
    }
  }

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
