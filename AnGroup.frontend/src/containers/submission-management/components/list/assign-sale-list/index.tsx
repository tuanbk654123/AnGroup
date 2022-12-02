import { ColumnsType } from 'antd/lib/table'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PapperTable, PappperButton } from '~/components/common'
import { SelectboxInfinite } from '~/components/common/form-control/select-box-infinite'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { submissionAssignSaleRequest } from '~/redux/slices/submission/middleware'
import { formatTimeInTable } from '~/utils'
// import { RouterHelper } from '~/utils'
import { AssignSaleModal } from '../../modal'
import { SubmissionListActions } from '../actions-into-list'

interface RecordDataType {
  id: string | number
  key: React.ReactNode
  ghhAppID: string
  customer: string
  programNameEn: string
  productEn: string
  saleCode: string
  status: 'Approved' | 'New' | 'OCR fail' | 'Rejected' | 'DraftDraft'
  createdDate: string
}

export const SubmissionAssignSaleList = () => {
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
      title: t('submissionManagement.Sale'),
      dataIndex: '',
      width: '200px',
      key: '',
      render: (_, record) => {
        return (
          <SelectboxInfinite
            placeholder={t('placeholder.Sale')}
            size="large"
            className="w-full"
            onChange={(value) => handleColumnAssignSale(value, [Number(record.id)])}
          />
        )
      },
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
  ]

  const dataSubmision = useAppSelector((state) => state.submission.dataSubmissions)
  const pagination = useAppSelector((state) => state.submission.pagination)
  const loading = useAppSelector((state) => state.submission.loading)

  const [selectedKeys, setSelectedKeys] = useState<number[]>([])
  const [showAssignSale, setShowAssignSale] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleColumnAssignSale = (userId: number, submissionIds: number[]) => {
    dispatch(
      submissionAssignSaleRequest({
        data: { userId, submissionIds },
        onSuccess(data?) {
          toast.success(data?.message || 'Assign Sale Successful')
          setShowAssignSale(false)
          navigate(0)
        },
      }),
    )
  }

  const handleActionAssignSale = () => {
    setShowAssignSale(true)
  }

  return (
    <div>
      <SubmissionListActions
        wrapperJustify="space-between"
        righElement={
          <PappperButton
            variant="primary"
            disabled={selectedKeys.length === 0}
            rounded="large"
            className="mr-4"
            onClick={handleActionAssignSale}
          >
            {t('button.assignSale')}
          </PappperButton>
        }
      />
      <PapperTable
        rowSelection={{
          type: 'checkbox',
          onChange(selectedRowKeys: number[]) {
            setSelectedKeys(selectedRowKeys)
          },
        }}
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
      <AssignSaleModal
        visible={showAssignSale}
        submissionIds={selectedKeys}
        onAssignSale={handleColumnAssignSale}
        onCancel={() => setShowAssignSale(false)}
      />
    </div>
  )
}
