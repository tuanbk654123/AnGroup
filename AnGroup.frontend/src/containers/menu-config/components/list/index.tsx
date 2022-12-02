import { ColumnsType } from 'antd/lib/table'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { PapperTable } from '~/components/common/table'
// import { MenuConfigListActions } from './actions'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { Menu } from '~/types/menu'
import { useAppDispatch } from '~/redux/hooks'
import { editMenu, getMenu } from '~/redux/slices/menu/middleware'
import { toast } from 'react-toastify'
import { useAppTranslation } from '~/hooks/useAppTranslation'

interface DataType {
  id: string
  code: string
  name: string
  icon: string
  url: string
  orderNumber: string
  menuPosition: string
  createdDate: string
  createBy: string
  modifiedDate: string
  modifiedBy: string
  parentId: string
  status: 'A' | 'I'
}

const MenuConfigList = ({ data, loading }: any) => {
  const { t } = useAppTranslation()
  const columns: ColumnsType<DataType> = [
    {
      title: t('configuration.Code'),
      dataIndex: 'code',
      width: '15%',
      key: 'code',
    },
    {
      title: t('configuration.NameEn'),
      dataIndex: 'nameEn',
      key: 'nameEn',
    },
    {
      title: t('configuration.NameVn'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('configuration.Url'),
      dataIndex: 'url',
      key: 'url',
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
      render: (value, record, index) => (
        <TableActions
          defaultChecked={record.status === 'A'}
          allowActions={['switch']}
          onAction={(action, value) => handleChangeAction(action, value, record)}
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
          onAction={(actionType, value) => handleChangeAction(actionType, value, record)}
        />
      ),
    },
  ]
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const dispatch = useAppDispatch()
  const refetchMenu = () => {
    dispatch(getMenu({}))
  }

  const handleEdit = (recordEdit: DataType) => {
    navigate({
      pathname: RouterHelper.configuration_menu_edit_ref(recordEdit.id),
      search: createSearchParams(currentParams).toString(),
    })
  }
  const handleEditStatus = (recordEdit: Menu) => {
    dispatch(
      editMenu({
        menu: { ...recordEdit, status: recordEdit.status === 'A' ? 'I' : 'A' },
        onSuccess: ({ data, message }) => {
          if (!data) {
            toast.warning(message)
            refetchMenu()
          } else {
            toast.success(message, { autoClose: 500 })
            refetchMenu()
          }
        },
      }),
    )
  }
  const handleChangeAction = (action, value, record) => {
    if (action === EActionsType.edit) {
      handleEdit(record)
    }
    if (action === EActionsType.switch) {
      handleEditStatus(record)
    }
    return
  }

  return (
    <div className="bg-white p-4">
      {/* <MenuConfigListActions /> */}
      <PapperTable dataSource={data} columns={columns} loading={loading} />
    </div>
  )
}

export default MenuConfigList
