import { Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState, useCallback } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PapperTable } from '~/components/common/table'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { helpsGetAllRequest, updateHelps } from '~/redux/slices/helps/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { addKeyForEachItemInRecusive } from '~/utils/helper'
import { UserManagementListActions } from '../actions'

interface RecordDataType {
  key: React.ReactNode
  id: string
  title: string
  createBy: string
  createdDate: string
  createdBy: string
  updateTime: string
  status: 'A' | 'I'
  modifiedDate: string
  description: string
  content: string
  tags: string
  avatar: string
  modifiedBy: string
}

export const HelpsList = () => {
  const { t } = useAppTranslation()
  const columns: ColumnsType<RecordDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
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
      title: t('table.column.createBy'),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => formatTimeInTable(createdDate),
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
  const dataHelps = useAppSelector((state) => state.helps.dataHelps)
  const [loadPage, setLoadPage] = useState(false)
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const pagination = useAppSelector((state) => state.helps.pagination)
  const loading = useAppSelector((state) => state.helps.loading)
  const dispatch = useAppDispatch()

  const handleEdit = (recordEdit: RecordDataType) => {
    navigate({
      pathname: RouterHelper.cms_help_detail_ref(recordEdit.id),
      search: createSearchParams({ ...currentParams, name: recordEdit.title, id: recordEdit.id }).toString(),
    })
  }

  const handleSwitch = (recordSwitch: RecordDataType, checked: boolean) => {
    const checkedValue = checked ? 'A' : 'I'

    const dataSubmit = {
      id: recordSwitch.id,
      title: recordSwitch.title,
      description: recordSwitch.description || '',
      content: recordSwitch.content || '',
      avatar: recordSwitch.avatar || '',
      tags: recordSwitch.tags || '',
      status: checkedValue,
    }

    dispatch(
      updateHelps({
        helps: dataSubmit,
        onSuccess: ({ data, message }) => {
          if (data) {
            setLoadPage(!loadPage)
          }
          toast.success(t('message.updateSuccess'))
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

  const getData = useCallback(
    (_params) => {
      const { search, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params
      dispatch(
        helpsGetAllRequest({
          helpsFilters: {
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
    },
    [dispatch],
  )

  useEffect(() => {
    getData(currentParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData, currentParams, loadPage])

  return (
    <div className="bg-white p-4">
      <UserManagementListActions
      // parentCallback={callbackFunction}
      />
      <PapperTable
        // rowSelection={rowSelection}
        dataSource={addKeyForEachItemInRecusive(dataHelps?.result)}
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
