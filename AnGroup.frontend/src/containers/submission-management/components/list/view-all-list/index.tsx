import { ColumnsType } from 'antd/lib/table'
import { PapperTable } from '~/components/common'
import { SubmissionListActions } from '../actions-into-list'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { useAppSelector } from '~/redux/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'

interface RecordDataType {
  key: React.ReactNode
  ghhAppID: string
  customer: string
  programNameEn: string
  productEn: string
  saleCode: string
  status: string
  pushToFastAither: string
  createdDate: string
}

export const SubmissionViewAllList = () => {
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
      title: t('table.column.status'),
      // dataIndex: 'statusName',
      key: 'status',
      render: (value) => {
        return <div>{value.statusName !== '' ? value.statusName : value.status}</div>
      },
    },
    {
      title: t('submissionManagement.pushToFAST&Aither'),
      dataIndex: 'fastPushStatus',
      key: 'fastPushStatus',
      render: (value) => {
        switch (value) {
          case 'S':
            return <div className="text-green-500">SENT</div>
          case 'W':
            return <div className="text-orange-500">WAITING</div>
          case 'E':
            return <div className="text-red-500">ERROR</div>
          default:
            return <div className="text-orange-500">WAITING</div>
        }
      },
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
    console.log(recordEdit)
    navigate({
      pathname: RouterHelper.submission_detail_ref(recordEdit.id),
      search: createSearchParams({
        ...currentParams,
        ghpappid: recordEdit.ghpappid,
        name: recordEdit.clientName,
      }).toString(),
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
