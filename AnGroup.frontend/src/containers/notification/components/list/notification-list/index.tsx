import { Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PapperTable } from '~/components/common/table'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { notificationGetAllRequest, updateNotification } from '~/redux/slices/notification/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { NotificationManagementListActions } from '../actions'

interface RecordDataType {
  key: React.ReactNode
  id: string
  title: string
  createdBy: string
  createdDate: string
  updateBy: string
  modifiedBy: string
  status: 'A' | 'D'
  description: string
  content: string
  modifiedDate: string
}

export const NotificationList = () => {
  const { t } = useAppTranslation()
  const columns: ColumnsType<RecordDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // width: 80,
    },
    {
      title: t('table.column.title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, { title }) => {
        return (
          <Tooltip placement="bottomLeft" title={title}>
            <div className="w-40 truncate">{title}</div>
          </Tooltip>
        )
      },
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => formatTimeInTable(createdDate),
    },
    {
      title: t('table.column.createBy'),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: t('table.column.modifyDate'),
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      render: (_, { modifiedDate }) =>
        formatTimeInTable(modifiedDate) === 'Invalid date' ? '-' : formatTimeInTable(modifiedDate),
    },
    {
      title: t('table.column.modifyBy'),
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
      render: (_, { modifiedBy }) => (modifiedBy !== null ? modifiedBy : '-'),
    },
    {
      title: t('table.column.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value, record, index) => (
        <TableActions
          defaultChecked={record.status === 'A'}
          allowActions={['switch']}
          onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
        />
      ),
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (value, record, index) => (
        <TableActions
          allowActions={['edit']}
          onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
        />
      ),
    },
  ]

  // const currentPage = useCurrentPage()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const dataNotification = useAppSelector((state) => state.notification.dataNotification)
  const loading = useAppSelector((state) => state.notification.loading)
  const pagination = useAppSelector((state) => state.notification.pagination)

  const handleEdit = (recordEdit: RecordDataType) => {
    navigate({
      pathname: RouterHelper.cms_notification_detail_ref(recordEdit.id),
      search: createSearchParams({ ...currentParams, name: recordEdit.title, id: recordEdit.id }).toString(),
    })
  }

  const handleSwitch = (recordSwitch: RecordDataType, checked: boolean) => {
    const checkedValue = checked ? 'A' : 'D'
    const dataSubmit = {
      id: recordSwitch.id,
      title: recordSwitch.title,
      description: recordSwitch.description,
      content: recordSwitch.content,
      banner: '',
      avatar: '',
      status: checkedValue,
      isall: '',
      topic: '',
      userId: '',
      token: '',
      route: '',
      exdata: '',
    }

    dispatch(
      updateNotification({
        notification: dataSubmit,
        onSuccess: ({ data, message }) => {
          if (data) {
            getData(currentParams)
            toast.success(t('message.updateSuccess'))
          }
        },
        onError(message) {
          toast.error(message)
        },
      }),
    )
  }

  const handleColumnAction = (actionType, value, record) => {
    if (actionType === EActionsType.edit) {
      handleEdit(record)
    }
    if (actionType === EActionsType.switch) {
      handleSwitch(record, value)
    }
    return
  }

  const dispatch = useAppDispatch()

  const getData = (_params) => {
    const { search, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params
    dispatch(
      notificationGetAllRequest({
        notificationFilters: {
          pagination: {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
          },
          filter: {
            querySearch: '',
            queryData: {
              id: -1,
              querySearch: search || '',
            },
          },
        },
      }),
    )
  }

  useEffect(() => {
    getData(currentParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParams])

  return (
    <div className="bg-white p-4">
      <NotificationManagementListActions />
      <PapperTable
        // rowSelection={{ type: 'checkbox' }}
        dataSource={dataNotification?.result}
        columns={columns}
        loading={loading}
        pagination={{
          current: pagination?.pageCurrent,
          defaultPageSize: pagination?.pageSize,
          total: pagination?.rowCount,
        }}
      />
    </div>
  )
}
