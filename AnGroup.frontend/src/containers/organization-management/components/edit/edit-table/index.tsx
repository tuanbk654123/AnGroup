import React from 'react'
import { ColumnsType } from 'antd/lib/table'

import { PapperTable } from '~/components/common'
import { ActiveStatus, InActiveStatus } from '~/components/common/table/columns'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { User } from '~/types'

interface RecordDataType {
  key: React.ReactNode
  account: string
  name: string
  userRoles: any
  status: 'active' | 'inactive'
}

interface ORGEditTableProps {
  title?: string
  data?: User[]
  onDeleteUser?: (user: User) => void
}

export default function ORGEditTable({ title, data, onDeleteUser }: ORGEditTableProps) {
  const { t } = useAppTranslation()

  const columns: ColumnsType<RecordDataType> = [
    {
      title: t('userManagement.userName'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('userManagement.fullName'),
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: t('userManagement.role'),
      dataIndex: 'userRoles',
      key: 'userRoles',
      render: (_, { userRoles }) => {
        return <div>{userRoles[0]?.role?.name}</div>
      },
    },

    {
      title: t('table.column.status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        //@ts-ignore
        return status === 'A' ? <ActiveStatus /> : <InActiveStatus />
      },
    },
    // {
    //   title: t('table.column.action'),
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (value, record, index) => (
    //     <Popconfirm
    //       placement="top"
    //       title="Are you sure to delete this user?"
    //       onConfirm={() => confirm(record)}
    //       okText="Yes"
    //       cancelText="No"
    //     >
    //       <TrashIcon />
    //     </Popconfirm>
    //   ),
    // },
  ]

  return (
    <div>
      {title && <p className="mb-6 text-[#4E4B66]">{title}</p>}
      <PapperTable columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}
