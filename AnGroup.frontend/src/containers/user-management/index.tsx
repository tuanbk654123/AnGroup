import { useCurrentPath, useCurrentParams } from '~/hooks'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { UserManagementHeaderForList } from './components/header/for-list'
import { ActionFormLeft } from './components/actions/form-left'
import { ColumnsType } from 'antd/lib/table'
import { Admin, User } from '~/types'
import { Tooltip, Row, Col, Checkbox } from 'antd'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { ActiveStatus, EActionsType, InActiveStatus, TableActions } from '~/components/common/table/columns'
import { PappperButton, PapperTable } from '~/components/common'
import React, { lazy, useState, useEffect } from 'react'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { userSearchRequest } from '~/redux/slices/user/middleware'
import { PopupCategoryModal } from '~/containers/category-management/components/modals/popup'
import { CreateUserModal } from '~/containers/user-management/components/modals/add'
import { EditUserModal } from '~/containers/user-management/components/modals/edit'
import { DeleteUserModal } from '~/containers/user-management/components/modals/delete'

interface UserType {
  key: React.ReactNode
  stt: string
  userName: string
  fullName: string
  email: string
  createdDate: string
  tag: string
  publishDate: string
  statusname: string
  checkbox: boolean
  createdBy: string
  code: string
  status: string
  modifiedBy: string
}
export const UsersContainer: React.FC<any> = () => {
  const { t } = useAppTranslation()
  const currentPath = useCurrentPath()
  const showModal = currentPath !== RouterHelper.administrator_user_management
  const dispatch = useAppDispatch()
  const currentParams = useCurrentParams()
  const [loadPage, setLoadPage] = useState(false)
  const pagination = useAppSelector((state) => state.user.pagination)
  const loading = useAppSelector((state) => state.user.loading)
  const dataUser = useAppSelector((state) => state.user.users)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [warningText, setWarningText] = useState(null)
  const initialSelect = new Array(DEFAULT_PAGE_SIZE).fill(false)
  const [checkTable, setCheckTable] = useState(initialSelect);
  const [id, setId] = useState();
  const [ids, setIds] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleColumnAction = (actionType, value, record) => {
    if (actionType === EActionsType.edit) {
      handleEdit(record)
    }
    if (actionType === EActionsType.delete) {
      handleDelete(record)
    }
  }
  const columns: ColumnsType<UserType> = [
    {
      title: t('creativepost.stt'),
      dataIndex: 'stt',
      key: 'stt',
      render: (stt, recod, index) => (
        <Tooltip placement="topLeft" title={stt}>
          {((DEFAULT_PAGE_INDEX - 1) * DEFAULT_PAGE_SIZE) + index + 1}
        </Tooltip>
      ),
    },
    {
      title: t('userManagement.userName'),
      dataIndex: 'userName',
      key: 'userName',
      render: (_, { userName }) => {
        return (
          <Tooltip placement="bottomLeft" title={userName}>
            <div className="w-32 truncate">{userName}</div>
          </Tooltip>
        )
      },
    },
    {
      title: t('userManagement.fullName'),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, { fullName }) => {
        return (
          <Tooltip placement="bottomLeft" title={fullName}>
            <div className="w-40 truncate">{fullName}</div>
          </Tooltip>
        )
      },
    },
    {
      title: t('userManagement.email'),
      dataIndex: 'email',
      key: 'email',
      render: (_, { email }) => {
        return (
          <Tooltip placement="bottomLeft" title={email}>
            <div className="w-40 truncate">{email}</div>
          </Tooltip>
        )
      },
      // width: '20%',
      // ellipsis: {
      //   showTitle: false,
      // },
      // render: (email) => (
      //   <Tooltip placement="topLeft" title={email}>
      //     {email}
      //   </Tooltip>
      // ),
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
      title: t('table.column.action'),
      //dataIndex: 'action',
      key: 'status',
      width: 120,
      render: (value, record, index) => {
        return <div>
          {(() => {
            return (
              <TableActions
                allowActions={['edit', 'delete']}
                onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
              />
            )
          })()}
          {/* {value.status === 0 ? value.status : value.status} */}

        </div>
      },
    },
  ]
  const getData = (_params) => {
    const { userName, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params

    dispatch(
      userSearchRequest({
        data: {
          pagination: {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
            isAll: false
          },
          filter: {
            querySearch: '',
            userName: userName || '',
          },
        },
      }),
    )
    setSelectedRowKeys([])
  }
  useEffect(() => {
    // getDataAll()
    getData(currentParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParams, loadPage])

  function handleAdd() {
    setShowAdd(true)

  }
  function handleEdit(recordEdit: any) {
    setId(recordEdit.id)
    setShowEdit(true)



  }
  function handleDelete(recordDelete: any) {
    const array = [];
    array.push(recordDelete.id)
    setIds(array)
    setShowDelete(true)


  }
  const selectRow = (record) => {
    console.log(123)
    const selectedRowKeys1 = [...selectedRowKeys];
    if (selectedRowKeys1.indexOf(record.key) >= 0) {
      selectedRowKeys1.splice(selectedRowKeys1.indexOf(record.key), 1);
    } else {
      selectedRowKeys1.push(record.key);
    }
    console.log(selectedRowKeys1)
    setSelectedRowKeys(selectedRowKeys1);
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  function handleEditList() {
    const array = [];
    // checkTable.forEach((select, index) => {
    //   if (select === true) array.push(dataCategory[index].id);
    // })
    // console.log(array)
    if (selectedRowKeys.length == 1) {
      selectedRowKeys.forEach(element => {
        array.push(element)
      });
      setId(array[0])
      //setId(123)
      setShowEdit(true)
    }
    else {
      setShowWarning(true)
      if (selectedRowKeys.length == 0) {

        setWarningText("warning.edit0")
      }
      else {
        setWarningText("warning.editGreaterThan1")
      }

    }

  }
  function handleDeleteList() {
    // const array = [];
    // checkTable.forEach((select, index) => {
    //   if (select === true) array.push(dataCategory[index].id);
    // })
    // console.log(array)
    if (selectedRowKeys.length > 0) {
      setIds(selectedRowKeys)
      setShowDelete(true)
    }
    else {
      setShowWarning(true)
      setWarningText("warning.delete0")
    }
  }
  return (
    <div className="bg-white">
      <div className="bg-white pt-5 px-4 mb-6">
        <p className="page-title my-2">{t('userManagement.title')}</p>
      </div>
      <div className="bg-white p-4">
        <Row justify="space-between" className="pb-4">
          <Col span={12}>
            <ActionFormLeft />
          </Col>
          <Col span={12}>
            <Row className="justify-end">
              <PappperButton className="btn-primary" rounded="medium" onClick={() => handleAdd()}>
                {t('button.addNew')}
              </PappperButton>
              <PappperButton className="btn-primary" rounded="medium" onClick={() => handleEditList()}>
                {t('button.edit')}
              </PappperButton>
              <PappperButton className="btn-primary" rounded="medium" onClick={() => handleDeleteList()}>
                {t('button.delete')}
              </PappperButton>
            </Row>
          </Col>
        </Row>
        {/* <CategoryManagementListActions /> */}
        <div className="p-5 bg-white shadow-md rounded-small">
          <PapperTable
            rowSelection={rowSelection}
            rowKey={({ id }) => id}
            dataSource={dataUser}
            columns={columns}
            loading={loading}
            pagination={{
              current: pagination?.pageCurrent,
              defaultPageSize: pagination?.pageSize,
              total: pagination?.rowCount,
            }}
            onRow={(record) => ({
              onClick: () => {
                selectRow(record);
              },
            })}
          />
        </div>
      </div>
      <CreateUserModal showAdd={showAdd} hideAdd={setShowAdd} loadPage={loadPage} setLoadPage={setLoadPage} />
      <EditUserModal showEdit={showEdit} hideEdit={setShowEdit} loadPage={loadPage} setLoadPage={setLoadPage} id={id} checkTable={setCheckTable} total={pagination?.pageSize} />
      <DeleteUserModal showDelete={showDelete} hideDelete={setShowDelete} loadPage={loadPage} setLoadPage={setLoadPage} ids={ids} />
      <PopupCategoryModal showWarning={showWarning} hideShowWarning={setShowWarning} warning={warningText} />
    </div>
  )
}
