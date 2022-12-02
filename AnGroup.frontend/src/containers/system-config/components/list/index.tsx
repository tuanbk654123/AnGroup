import { ColumnsType } from 'antd/lib/table'
import React, { useCallback, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PapperTable } from '~/components/common'
import { ActiveStatus, EActionsType, InActiveStatus, TableActions } from '~/components/common/table/columns'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getAtherConfig } from '~/redux/slices/aither-config/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
// import { SystemConfigListActions } from './actions'

interface RecordDataType {
  key: React.ReactNode
  grname: string
  rnum: number
  status: string
  vardesc: string
  varname: string
  varvalue: string
  modifiedDate: string
  modifyBy: string
}

const FastConfigList = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const currentParams = useCurrentParams()
  const dataAtherConfig = useAppSelector((state) => state.aitherConfig.dataAitherConfig)
  const loading = useAppSelector((state) => state.aitherConfig.loading)
  const fetchAtherConfig = useCallback(() => {
    dispatch(
      getAtherConfig({
        atherConfigFilter: {
          pagination: {
            pageIndex: 1,
            pageSize: 25,
          },
          filter: {
            querySearch: '',
            queryData: {
              varname: '',
              vargroup: 'FAST',
            },
          },
        },
      }),
    )
  }, [dispatch])

  useEffect(() => {
    fetchAtherConfig()
  }, [fetchAtherConfig])
  const columns: ColumnsType<RecordDataType> = [
    // {
    //   title: 'Grname',
    //   dataIndex: 'grname',
    //   key: 'grname',
    // },
    {
      title: 'Rnum',
      dataIndex: 'rnum',
      key: 'rnum',
    },
    {
      title: 'Varname',
      dataIndex: 'varname',
      key: 'varname',
    },
    {
      title: 'Vardesc',
      dataIndex: 'vardesc',
      key: 'vardesc',
    },
    {
      title: 'Varvalue',
      dataIndex: 'varvalue',
      key: 'varvalue',
      render: (_, { varvalue }) => {
        return <div className="w-40 truncate">{varvalue}</div>
      },
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
      title: t('table.column.modifyDate'),
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      render: (_, { modifiedDate }) => {
        return <span>{modifiedDate ? formatTimeInTable(modifiedDate) : ''}</span>
      },
    },
    {
      title: t('table.column.modifyBy'),
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
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
  const handleEdit = (recordEdit: RecordDataType) => {
    navigate({
      pathname: RouterHelper.configuration_DMS_connection_detail_ref(recordEdit.varname),
      search: createSearchParams({ ...currentParams, varname: recordEdit.varname, vargroup: 'FAST' }).toString(),
    })
  }
  const handleColumnAction = (actionType, value, record) => {
    if (actionType === EActionsType.edit) {
      handleEdit(record)
    }
    return
  }

  return (
    <div className="bg-white p-4">
      {/* <SystemConfigListActions /> */}
      <PapperTable 
        dataSource={dataAtherConfig?.result} 
        columns={columns} 
        loading={loading}
      />
    </div>
  )
}

export default FastConfigList
