import { useCurrentPath, useCurrentParams } from '~/hooks'
import { CategoryManagementHeaderForList } from './components/header/for-list'
import React, { lazy, useState, useEffect } from 'react'
import { Tooltip, Checkbox, Col, Row } from 'antd'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import type { ColumnsType } from 'antd/lib/table'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { categorySearchRequest } from '~/redux/slices/category/middleware'
import { PapperTable } from '~/components/common'
import { CreateCategoryModal } from '~/containers/category-management/components/modals/add-category'
import { EditCategoryModal } from '~/containers/category-management/components/modals/edit-category'
import { DeleteCategoryModal } from '~/containers/category-management/components/modals/delete-category'
import { ActionFormLeft } from '~/containers/category-management/components/list/actions/form-left'
import { PappperButton } from '~/components/common'
import { PopupCategoryModal } from '~/containers/category-management/components/modals/popup'


export const CategorysContainer: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [warningText, setWarningText] = useState(null)
  const { t } = useAppTranslation()
  const pagination = useAppSelector((state) => state.category.pagination)
  const loading = useAppSelector((state) => state.category.loading)
  const dataCategory = useAppSelector((state) => state.category.dataCategorys)
  const [loadPage, setLoadPage] = useState(false)
  const initialSelect = new Array(DEFAULT_PAGE_SIZE).fill(false)
  const [checkTable, setCheckTable] = useState(initialSelect);
  const [id, setId] = useState();
  const [ids, setIds] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const _onChangeRowCheckbox = (event, index) => {

    setCheckTable(checkTable.map((item, idx) => {
      return (idx === index) ? !item : item
    }));
    console.log(checkTable)
  };
  interface DataType {
    key: React.ReactNode
    id: string
    no: string
    code: string
    name: string
    createdDate: string
    status: 'A' | 'I'
    parentName: string
    order: string
    checkbox: boolean
  }
  const columns: ColumnsType<DataType> = [
    // {
    //   //title: t('category.No'),
    //   dataIndex: 'checkbox',
    //   key: 'id',
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (id,recod,index) => (
    //     <Checkbox 
    //     onChange={(event) => _onChangeRowCheckbox(event, index)}//onChange={(e, data) => _onChangeRowCheckbox(data, index)}
    //     id={"check" + index}
    //     value={id}
    //     checked={checkTable[index]}>
    //     </Checkbox>
    //   ),
    // },
    {
      title: t('category.No'),
      dataIndex: 'no',
      key: 'no',
      ellipsis: {
        showTitle: false,
      },
      render: (no, recod, index) => (
        <Tooltip placement="topLeft" title={no}>
          {((DEFAULT_PAGE_INDEX - 1) * DEFAULT_PAGE_SIZE) + index + 1}
        </Tooltip>
      ),
    },
    {
      title: t('category.Code'),
      dataIndex: 'code',
      key: 'code',
      ellipsis: {
        showTitle: false,
      },
      render: (code) => (
        <Tooltip placement="topLeft" title={code}>
          {code}
        </Tooltip>
      ),
    },
    {
      title: t('category.Name'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (name) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: t('category.ParentName'),
      dataIndex: 'parentName',
      key: 'parentName',
      ellipsis: {
        showTitle: false,
      },
      render: (parentName) => (
        <Tooltip placement="topLeft" title={parentName}>
          {parentName}
        </Tooltip>
      ),
    },
    {
      title: t('table.column.status'),
      dataIndex: 'status',
      key: 'status',
      ellipsis: {
        showTitle: false,
      },
      render: (status) => (
        <Tooltip placement="topLeft" title={status}>
          {status = "A" ? t('category.show') : t('category.hide')}
        </Tooltip>
      ),
    },
    {
      title: t('category.Order'),
      dataIndex: 'order',
      key: 'order',
      ellipsis: {
        showTitle: false,
      },
      render: (order) => (
        <Tooltip placement="topLeft" title={order}>
          {order}
        </Tooltip>
      ),
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => formatTimeInTable(createdDate),
    },
  ]
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()

  const getData = (_params) => {
    const { name, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params

    dispatch(
      categorySearchRequest({
        data: {
          pagination: {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
            isAll: false
          },
          filter: {
            querySearch: '',
            name: name || '',
          },
        },
      }),
    )
  }

  useEffect(() => {
    // getDataAll()
    getData(currentParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParams, loadPage])
  const currentPath = useCurrentPath()

  const showModal = currentPath !== RouterHelper.category_management
  function handleAdd() {
    setShowAdd(true)

  }
  function handleEdit() {
     const array = [];
    // checkTable.forEach((select, index) => {
    //   if (select === true) array.push(dataCategory[index].id);
    // })
    // console.log(array)
    if (selectedRowKeys.length==1){
      selectedRowKeys.forEach(element => {
        array.push(element)
      });
      setId(array[0])
      //setId(123)
      setShowEdit(true)
    }
    else {
      setShowWarning(true)
      if(selectedRowKeys.length==0){
        
        setWarningText("warning.edit0")
      }
      else {
        setWarningText("warning.editGreaterThan1")
      }

    }

  }
  function handleDelete() {
    // const array = [];
    // checkTable.forEach((select, index) => {
    //   if (select === true) array.push(dataCategory[index].id);
    // })
    // console.log(array)
    if (selectedRowKeys.length>0){
      setIds(selectedRowKeys)
      setShowDelete(true)
    }
    else {
      setShowWarning(true)
      setWarningText("warning.delete0")
    }
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
  return (
    <div className="bg-white">
      <CategoryManagementHeaderForList />
      <div className="bg-white p-4">
      <Row justify="space-between" className="pb-4">
      <Col span={12}>
        <ActionFormLeft />
      </Col>
      <Col span={12}>
      <Row className="justify-end">
      <PappperButton className="btn-primary ml-2" rounded="medium" onClick={() => handleAdd()}>
        {t('button.addNew')}
      </PappperButton>
      <PappperButton className="btn-primary ml-2" rounded="medium" onClick={() => handleEdit()}>
        {t('button.edit')}
      </PappperButton>
      <PappperButton className="btn-primary ml-2" rounded="medium" onClick={() => handleDelete()}>
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
          dataSource={dataCategory}
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
      {/* {showModal && <CategoryManagementModal />} */}
      <CreateCategoryModal showAdd={showAdd} hideAdd={setShowAdd} loadPage={loadPage} setLoadPage={setLoadPage} />
      <EditCategoryModal showEdit={showEdit} hideEdit={setShowEdit} loadPage={loadPage} setLoadPage={setLoadPage} id={id} checkTable={setCheckTable} total={pagination?.pageSize} />
      <DeleteCategoryModal showDelete={showDelete} hideDelete={setShowDelete} loadPage={loadPage} setLoadPage={setLoadPage} ids={ids} />
      <PopupCategoryModal showWarning={showWarning} hideShowWarning={setShowWarning} warning={warningText} />
    </div>
  )
}