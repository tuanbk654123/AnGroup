import { PapperTable } from '~/components/common'
import { ProductManagementListActions } from './actions'
import type { ColumnsType } from 'antd/lib/table'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { recusiveAddLevelItemProduct } from '~/utils/helper'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productSearchRequest, productUpdateIdStatusRequest } from '~/redux/slices/product/middleware'
import { groupUpdateIdStatusRequest } from '~/redux/slices/productgroup/middleware'
import { programUpdateIdStatusRequest } from '~/redux/slices/program/middleware'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useEffect, useState } from 'react'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { Tooltip } from 'antd'
import { toast } from 'react-toastify'

export const ProductManagementList = () => {
  const { t } = useAppTranslation()
  interface DataType {
    key: React.ReactNode
    id: string
    nameEn: string
    nameVn: string
    createdBy: string
    createdDate: string
    status: 'A' | 'I'
    children?: DataType[]
    productId: string
    groupId: string
    layer: string
    level: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: t('product.Product'),
      dataIndex: 'nameEn',
      key: 'nameEn',
      ellipsis: {
        showTitle: false,
      },
      render: (nameEn) => (
        <Tooltip placement="topLeft" title={nameEn}>
          {nameEn}
        </Tooltip>
      ),
    },
    {
      title: t('product.nameVn'),
      dataIndex: 'nameVn',
      key: 'nameVn',
      ellipsis: {
        showTitle: false,
      },
      render: (nameVn) => (
        <Tooltip placement="topLeft" title={nameVn}>
          {nameVn}
        </Tooltip>
      ),
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
      // width: 150,
      render: (value, record, index) => {
        // eslint-disable-next-line eqeqeq
        if (record?.level == '3' || record.status === 'I') {
          return (
            <TableActions
              allowActions={['edit']}
              onAction={(action, value) => handleChangeAction(action, value, record)}
            />
          )
        } else {
          return (
            <TableActions
              allowActions={['edit', 'add']}
              onAction={(action, value) => handleChangeAction(action, value, record)}
            />
          )
        }
      },
    },
  ]

  const dispatch = useAppDispatch()

  const pagination = useAppSelector((state) => state.product.pagination)
  const loading = useAppSelector((state) => state.product.loading)
  const dataProduct = useAppSelector((state) => state.product.dataProducts)
  const [loadPage, setLoadPage] = useState(false)

  const dataS = []
  if (dataProduct !== undefined && dataProduct.length !== 0) {
    for (const item of dataProduct) {
      const data2 = []

      for (const item1 of item.productGroups) {
        data2.push({ ...item1, children: item1.programs })
      }
      dataS.push({
        ...item,
        children: data2,
      })
    }
  }

  const navigate = useNavigate()

  const currentParams = useCurrentParams()

  const handleEdit = (recordEdit: DataType) => {
    if (recordEdit.groupId) {
      navigate({
        pathname: RouterHelper.product_name_edit_ref(recordEdit.id),
        search: createSearchParams({ ...currentParams, name: recordEdit.nameEn }).toString(),
      })
    } else if (recordEdit.productId) {
      navigate({
        pathname: RouterHelper.product_group_edit_ref(recordEdit.id),
        search: createSearchParams({ ...currentParams, name: recordEdit.nameEn }).toString(),
      })
    } else {
      navigate({
        pathname: RouterHelper.product_edit_ref(recordEdit.id),
        search: createSearchParams({ ...currentParams, name: recordEdit.nameEn }).toString(),
      })
    }
  }

  const handleAdd = (recordAdd: DataType) => {
    if (recordAdd.productId) {
      navigate({
        pathname: RouterHelper.product_management_product_group_add_ref(recordAdd.productId, recordAdd.id),
        search: createSearchParams({ type: 'programName' }).toString(),
      })
    } else {
      navigate({
        pathname: RouterHelper.product_management_add_ref(recordAdd.id),
        search: createSearchParams({ type: 'groupProgram' }).toString(),
      })
    }
  }

  const handleSwitch = (recordSwitch: DataType, checked: boolean) => {
    const checkedValue = checked ? 'A' : 'I'
    // eslint-disable-next-line eqeqeq
    if (recordSwitch.groupId && recordSwitch.level == '3') {
      dispatch(
        programUpdateIdStatusRequest({
          data: { ...recordSwitch, status: checkedValue },
          onSuccess: ({ data, message }) => {
            if (data) {
              toast.success(t('message.updateSuccess'))
              setLoadPage(!loadPage)
            } else {
              toast.warning(message)
            }
          },
          onError(message) {
            toast.error(message?.message)
          },
        }),
      )
      getData(currentParams)
      // eslint-disable-next-line eqeqeq
    } else if (recordSwitch.productId && recordSwitch.level == '2') {
      dispatch(
        groupUpdateIdStatusRequest({
          data: { ...recordSwitch, status: checkedValue },
          onSuccess: ({ data, message }) => {
            if (data) {
              toast.success(t('message.updateSuccess'))
              setLoadPage(!loadPage)
            } else {
              toast.warning(message)
            }
          },
          onError() {
            toast.error(t('message.error'))
          },
        }),
      )
    } else {
      dispatch(
        productUpdateIdStatusRequest({
          data: { ...recordSwitch, status: checkedValue },
          onSuccess: ({ data, message }) => {
            if (data) {
              toast.success(t('message.updateSuccess'))
              setLoadPage(!loadPage)
            } else {
              toast.warning(message)
            }
          },
          onError() {
            toast.error(t('message.error'))
          },
        }),
      )
    }
  }

  const handleChangeAction = (action, value, record) => {
    if (action === EActionsType.edit) {
      handleEdit(record)
    }
    if (action === EActionsType.add) {
      handleAdd(record)
    }
    if (action === EActionsType.switch) {
      handleSwitch(record, value)
    }
  }

  // const getDataAll = () => {
  //   dispatch(productGetAllRequest({}))
  // }

  const getData = (_params) => {
    const { name, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params

    dispatch(
      productSearchRequest({
        data: {
          pagination: {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
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

  return (
    <div className="bg-white p-4">
      <ProductManagementListActions />
      <div className="p-5 bg-white shadow-md rounded-small">
        <PapperTable
          dataSource={recusiveAddLevelItemProduct({
            data: dataS,
          })}
          columns={columns}
          loading={loading}
          pagination={{
            current: pagination?.pageCurrent,
            defaultPageSize: pagination?.pageSize,
            total: pagination?.rowCount,
          }}
        />
      </div>
    </div>
  )
}
