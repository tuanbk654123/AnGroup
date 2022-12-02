import { ColumnsType } from 'antd/lib/table'
import { PapperTable } from '~/components/common/table'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { formatTimeInTable } from '~/utils'
import { EUserType } from '../../index.types'
import { CmsReviewListActions } from '../actions'

interface RecordDataType {
  key: React.ReactNode
  id: string
  ghh_appId: string
  customer: string
  status: string
  result: string
  sale: string
  modifyTime: string
  updateBy: string
  createdDate: string
  user: any
  userHandle: string
  program: any
  department: any
  idCard: string
  programMapping: string
  profileStatuses: any[]
}

export const CmsReportList = () => {
  const renderSale = (user, userHandle) => {
    if (userHandle) {
      return userHandle.username
    } else if (user.usertype === '0' && userHandle === null) {
      return user.username
    } else if (user.usertype === '1' && userHandle !== null) {
      return userHandle
    } else if (user.usertype === '1' && userHandle === null) {
      return user.username
    } else if (user.usertype === '2' && userHandle !== null) {
      return userHandle
    } else if (user.usertype === '2' && userHandle === null) {
      return user.username
    } else {
      return
    }
  }

  const renderSaleCode = (user) => {
    if (user.usertype === EUserType.customer) {
      return user.saleCode
    } else if (user.usertype === EUserType.sale) {
      return user.employeeCode
    } else if (user.usertype === '2') {
      return user.employeeCode
    } else {
      return
    }
  }

  const { t } = useAppTranslation()

  const columns: ColumnsType<RecordDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('review.Ghh.AppID'),
      dataIndex: 'ghpappid',
      key: 'ghpappid',
    },
    {
      title: t('review.Customer'),
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'ID Number',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: t('product.Product'),
      dataIndex: 'product',
      key: 'product',
      render: (_, { program }) => program?.group?.product?.nameEn,
    },
    {
      title: 'Program Mapping',
      dataIndex: 'programMapping',
      key: 'programMapping',
      render: (_, { program }) => program?.mapping,
    },
    // {
    //   title: t('product.groupProgram'),
    //   dataIndex: 'groupProgram',
    //   key: 'groupProgram',
    //   render: (_, { program }) => program?.group?.nameEn,
    // },
    // {
    //   title: t('product.programName'),
    //   dataIndex: 'programName',
    //   key: 'programName',
    //   render: (_, { program }) => program?.nameEn,
    // },
    {
      title: t('report.department'),
      dataIndex: 'department',
      key: 'department',
      render: (_, { department }) => department?.branchTree || '-',
    },
    {
      title: 'Branch Code',
      dataIndex: '',
      key: '',
      render: (_, { department }) => department?.branchCode || '-',
    },
    {
      title: 'User name',
      dataIndex: '',
      key: '',
      render: (_, { user, userHandle }) => renderSale(user, userHandle),
    },
    {
      title: 'Sale Code',
      dataIndex: '',
      key: '',
      render: (_, { user }) => renderSaleCode(user),
    },
    {
      title: 'Device Name',
      dataIndex: '',
      key: '',
      render: (_, { user, userHandle }) => user?.deviceName,
    },
    {
      title: t('report.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: "Fast_Push_Status",
      dataIndex: 'fastPushStatus',
      key: 'fastPushStatus',
      render: (value) => {
        switch(value) {
          case 'S':
            return <div>SENT</div>
          case 'W':
            return <div>WAITING</div>
          case 'E':
            return <div>ERROR</div>
          default:
            return null
        }
      }
    },
    {
      title: "SubStatus",
      dataIndex: 'subStatus',
      key: 'subStatus,',
      render: (_, { profileStatuses }) =>
        profileStatuses.slice().sort((a, b) => a.id - b.id).at(-1)?.subStatus
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) =>
        formatTimeInTable(createdDate) === 'Invalid date' ? '-' : formatTimeInTable(createdDate),
    },
  ]

  // const dispatch = useAppDispatch()
  const dataReport = useAppSelector((state) => state.report.dataReport)
  const pagination = useAppSelector((state) => state.report.pagination)
  const loading = useAppSelector((state) => state.report.loading)

  // const getData = () => {
  //   dispatch(
  //     reportGetAlls({
  //       reportFilters: {
  //         pagination: {
  //           pageIndex: 1,
  //           pageSize: 10,
  //           isAll: true,
  //         },

  //         filter: {
  //           querySearch: '',
  //           name: '', // tìm kiếm theo tên
  //           Status: '', // -1 bản nháp , 0 verify submit, 1 apprpval , 2 reject
  //           StartDate: '', //format us yyyy/mm/dd
  //           EndDate: '', //format us yyyy/mm/dd,
  //           DepartmentIds: [], // danh sách phòng ban
  //           ChannelIds: [], // danh sách team
  //           TeamIds: [], // danh sách nhóm
  //           ProductIds: [], // danh sách sản phẩm
  //           GroupIds: [], // danh sách nhóm sản phẩm
  //           ProgramIds: [], // danh sách chương trình
  //         },
  //       },
  //     }),
  //   )
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className="bg-white p-4">
      <CmsReviewListActions />
      <PapperTable
        dataSource={dataReport.result}
        columns={columns}
        loading={loading}
        pagination={{
          current: pagination?.pageCurrent,
          defaultPageSize: pagination?.pageSize,
          total: pagination?.rowCount,
        }}
        scroll={{
          x: 2000,
        }}
      />
    </div>
  )
}
