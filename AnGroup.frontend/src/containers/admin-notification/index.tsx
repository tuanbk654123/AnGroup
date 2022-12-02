import { Spin } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PapperTable } from '~/components/common'
import { NotificationRead, NotificationUnRead } from '~/components/common/table/columns/notification-status'
import { useAppTranslation } from '~/hooks'
import { DashboardServices } from '~/services/dashboardservice'
import { NotificationAdmin } from '~/types/admin-notification'
import { formatTimeInTable, RouterHelper } from '~/utils'

export const AdminNotification: React.FC<any> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [adminNotification, setAdminNotification] = useState<{ data: any; paginate: any }>(null)
  const { t } = useAppTranslation()
  const navigate = useNavigate()
  useEffect(() => {
    (async function () {
      setIsLoading(true)
      const res = await DashboardServices.searchAdminNotification({
        pagination: {
          pageIndex: 1,
          pageSize: 50,
        },
        filter: {},
      })
      setAdminNotification({ data: res?.data?.data?.result?.result, paginate: res?.data?.data?.result?.pagination })
      setIsLoading(false)
    })()
  }, [])
  const getColumn = (): ColumnsType<NotificationAdmin> => {
    return [
      {
        title: 'Ghh.AppID',
        dataIndex: 'profileInfo',
        key: 'profileInfo',
        render: (_, { profileInfo }) => {
          return <div>{profileInfo?.ghpappid}</div>
        },
      },
      {
        title: t('adminNotification.customer'),
        dataIndex: 'clientName',
        key: 'clientName',
        render: (_, { profileInfo }) => {
          return <div>{profileInfo?.clientName}</div>
        },
      },
      {
        title: t('table.column.status'),
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: t('table.column.createDate'),
        dataIndex: 'createDate',
        key: 'createDate',
        render: (_, { profileInfo }) => {
          return <div>{formatTimeInTable(profileInfo?.createdDate)}</div>
        },
      },
      {
        title: t('table.column.createBy'),
        dataIndex: 'createBy',
        key: 'createBy',
        render: (_, { profileInfo }) => {
          return <div>{profileInfo?.createdBy}</div>
        },
      },
      {
        title: t('adminNotification.isRead'),
        dataIndex: 'isRead',
        key: 'isRead',
        render: (_, { isRead }) => {
          return isRead === true ? <NotificationRead /> : <NotificationUnRead />
        },
      },
    ]
  }
  const handleRowClick = (record) => {
    navigate({
      pathname: RouterHelper.submission_detail_ref(record.submissionId),
    })
    if (record?.isRead) return
    DashboardServices.changeStatusAdminNotification(record?.id)
  }
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-80">
          <Spin size="large"></Spin>
        </div>
      ) : (
        <div className="bg-white p-4">
          <PapperTable
            // pagination={{ total: adminNotification?.paginate.rowCount, current: currentPage }}
            loading={isLoading}
            dataSource={adminNotification?.data}
            columns={getColumn()}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => handleRowClick(record),
              }
            }}
          />
        </div>
      )}
    </div>
  )
}
