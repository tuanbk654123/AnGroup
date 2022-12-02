import { PapperTable } from '~/components/common'
import type { ColumnsType } from 'antd/lib/table'
import { ActiveStatus, EActionsType, InActiveStatus, TableActions } from '~/components/common/table/columns'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { RouterHelper, formatTimeInTable } from '~/utils'
import { RoleManagementListActions } from './actions'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { roleServices } from '~/services'
import { toast } from 'react-toastify'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useEffect, useState } from 'react'

interface DataType {
  key: React.ReactNode
  id: string
  role: string
  createBy: string
  createDate: string
  updateBy: string
  modifyDate: string
  createdDate: string
  status: 'active' | 'inactive'
}
export const RoleManagementList = () => {
  const { t } = useAppTranslation()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('roleManagement.code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('roleManagement.role'),
      dataIndex: 'name',
      key: 'name',
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
      title: t('table.column.status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        return !!status === true ? <ActiveStatus /> : <InActiveStatus />
      },
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      key: 'action',
      render: (value, record, index) => (
        <TableActions
          allowActions={['edit', 'switch']}
          defaultChecked={!!record.status === true}
          onAction={(actionType, value) => handleChangeAction(actionType, value, record)}
        />
      ),
    },
  ]
  const [role, setRole] = useState<{ data: any; paginate: any }>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRoles(currentParams)
    setLoading(true)
  }, [currentParams])

  const getRoles = async (_params) => {
    const { name, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params
    const response = await roleServices.searchByName({
      filter: {
        name,
      },
      pagination: {
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
      },
    })
    const _dataRole =
      response.data.data?.result?.map?.((item) => {
        return {
          ...item,
          key: item?.id,
        }
      }) || []
      
    setRole({ data: _dataRole, paginate: response.data?.data?.pagination })
    setLoading(false)
  }

  const handleEdit = (recordEdit: DataType) => {
    navigate({
      pathname: RouterHelper.administrator_role_management_edit_ref(recordEdit.id),
      search: createSearchParams(currentParams).toString(),
    })
  }

  const handleEditStatus = async (recordEdit: any) => {
    const res = await roleServices.changeStatus(+recordEdit.id)
    if (res.data.message === 'Change success !' && res.kind === 'ok') {
      toast.success(res.data.message, { autoClose: 500 })
    } else {
      toast.warning(res.data.message, { autoClose: 500 })
    }
    getRoles(currentParams)
  }

  const handleChangeAction = (action, value, record) => {
    if (action === EActionsType.edit) {
      handleEdit(record)
    }
    if (action === EActionsType.switch) {
      handleEditStatus(record)
    }
  }

  return (
    <div className="bg-white p-4">
      <RoleManagementListActions />
      <div className="p-5 bg-white shadow-md rounded-small">
        <PapperTable
          columns={columns}
          dataSource={role?.data || []}
          loading={loading}
          pagination={{
            current: role?.paginate?.pageCurrent,
            defaultPageSize: role?.paginate?.pageSize,
            total: role?.paginate?.rowCount,
          }}
        />
      </div>
    </div>
  )
}
