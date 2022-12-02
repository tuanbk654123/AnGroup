import React, { useCallback, useState } from 'react'
import { ColumnsType } from 'antd/lib/table'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { PapperTable } from '~/components/common'
import { ActiveStatus, EActionsType, InActiveStatus, TableActions } from '~/components/common/table/columns'
import { useCurrentParams } from '~/hooks'
import { OrganizationManagementListActions } from '../actions'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { Department, DepartmentTree } from '~/types'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { selectDepartmentLoading, selectDepartmentTrees } from '~/redux/slices'
import { departmantServices } from '~/services'
import { isEmpty } from '~/utils/helper'
import { toast } from 'react-toastify'
import { getDepartments } from '~/redux/slices/department/middleware'
import { message } from '~/constants/message'
import { EOrganizationListLayer } from '~/containers/organization-management/index.types'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export default function ORGSupperAdminList() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDepartmentLoading)
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()

  const [expandedKeys, setExpandedKeys] = useState<number[]>(() => {
    const expandedParams: string = currentParams['expaned']
    if (expandedParams) {
      return expandedParams
        .split('-')
        .filter((item) => item !== '')
        .map((item) => +item)
    }
    return []
  })

  const departments = useAppSelector(selectDepartmentTrees)

  const columns: ColumnsType<DepartmentTree> = [
    {
      title: t('organizationManagement.group'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: t('organizationManagement.branchCode'),
      dataIndex: 'code',
      key: 'code',
      ellipsis: true,
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => {
        return <span>{formatTimeInTable(createdDate)}</span>
      },
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
        return status === 'A' ? <ActiveStatus /> : <InActiveStatus />
      },
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      key: 'action',
      render: (value, record, index) => (
        <TableActions
          allowActions={record.level === 2 ? ['edit', 'switch'] : ['edit', 'switch', 'add']}
          defaultChecked={record.status === 'A'}
          onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
        />
      ),
    },
  ]

  const refetchDepartment = useCallback(() => {
    dispatch(
      getDepartments({
        departmentFilter: {
          pagination: {
            pageIndex: 1,
            pageSize: 50,
          },
          filter: {
            type: '1',
            querySearch: currentParams['querySearch'],
          },
        },
      }),
    )
  }, [dispatch, currentParams])

  const handleEditStatus = async (recordEdit: DepartmentTree) => {
    try {
      const res = await departmantServices.edit({ ...recordEdit, status: recordEdit.status === 'A' ? 'I' : 'A' })
      if (!isEmpty(res.data.data)) {
        toast.success(res.data.message, { autoClose: 1000 })
        refetchDepartment()
      } else {
        toast.warning(res.data.message, { autoClose: 1000 })
        refetchDepartment()
      }
    } catch (error) {
      toast.error(message.errorApi, { autoClose: 1000 })
    }
  }

  const handleClickEdit = (record: DepartmentTree) => {
    navigate({
      pathname: RouterHelper.administrator_organization_edit_ref(`${record.id}`),
      search: createSearchParams({ ...currentParams, org_name: record.name }).toString(),
    })
  }
  const handleColumnAction = (action, value, record: Department) => {
    if (action === EActionsType.edit) {
      handleClickEdit(record)
    }
    if (action === EActionsType.switch) {
      handleEditStatus(record)
    }
    if (action === EActionsType.add) {
      delete currentParams['expaned']
      delete currentParams['querySearch']

      navigate({
        pathname: RouterHelper.administrator_organization_create,
        search: createSearchParams({
          ...currentParams,
          layer: `${EOrganizationListLayer.layer_02}-${record.id}`,
        }).toString(),
      })
    }
    return
  }

  const handleExpand = (expanded, record: DepartmentTree) => {
    const _expandedKeys = []
    if (expanded) {
      _expandedKeys.push(record.key)
      setExpandedKeys((prev) => [...prev, ..._expandedKeys])
    } else {
      const newExpanedKeys = [...expandedKeys].filter((item) => item !== record.key)
      setExpandedKeys(newExpanedKeys)
    }
  }

  return (
    <div>
      <OrganizationManagementListActions />
      <PapperTable
        loading={loading}
        expandable={{
          onExpand: handleExpand,
          expandedRowKeys: expandedKeys,
        }}
        columns={columns}
        dataSource={departments}
      />
    </div>
  )
}
