import { Badge, Dropdown, Menu } from 'antd'
import { BellFilled } from '@ant-design/icons'
import './style.scss'
import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DashboardServices } from '~/services/dashboardservice'
// import moment from 'moment'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { useAppTranslation } from '~/hooks'
import { useAppDispatch } from '~/redux/hooks'
import { submissionGetProgramConfigRequest } from '~/redux/slices/submission/middleware'
import { toast } from 'react-toastify'
const BadgeContainer = () => {
  const [adminNotification, setAdminNotification] = useState<{ data: any; paginate: any }>(null)
  const [counter, setCounter] = useState<number>()
  const [programId, setProgramId] = useState()
  const iconNotification = require('~/images/icons8-bell-64.png')
  const iconCircle = require('~/images/icons8-blue-circle-96.png')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  useEffect(() => {
    // fetchNotification()
    // getCountUnRead()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchNotification() {
    const res = await DashboardServices.searchAdminNotification({
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
      filter: {},
    })
    if (res) {
      setAdminNotification({ data: res?.data?.data?.result?.result, paginate: res?.data?.data?.result?.pagination })
    } else {
      toast.error(t('message.error'), { autoClose: 1000 })
    }

  }

  async function getCountUnRead() {
    const countNotificationUnRead = await DashboardServices.getCountNotificationUnRead()
    if (countNotificationUnRead.data !== null) {
      setCounter(countNotificationUnRead?.data?.data?.count ?? 0)
    }
    else {
      toast.error(t('message.error'), { autoClose: 1000 })
    }

  }
  // const [checkClicked, setCheckClicked] = useState(false)
  // const checkClick = () => {

  //   setCheckClicked(true)

  // }
  const handleBadgeItem = async (item) => {
    if (item?.isRead) return
    await DashboardServices.changeStatusAdminNotification(item?.id)
    setProgramId(item?.submissionId)
    // setCheckClicked(false)
    navigate({
      pathname: RouterHelper.submission_detail_ref(item?.submissionId),
    })

    // window.location.reload()

    // if (res.data.message && res.kind === 'ok') {
    //   toast.success(res.data.message, { autoClose: 500 })
    // } else {
    //   toast.warning(res.data.message, { autoClose: 500 })
    // }

    getCountUnRead()
    fetchNotification()
  }
  const getProgramConfig = useCallback(
    (programId) => {
      if (!programId) {
        return
      }
      dispatch(
        submissionGetProgramConfigRequest({
          data: { programId },
          requestWithLoading: false,
        }),
      )
    },
    [dispatch],
  )

  useEffect(() => {
    getProgramConfig(programId)
  }, [programId, getProgramConfig])
  const menu = () => {

    return (
      <>

        <Menu className="wrap-badge" >
          {adminNotification?.data?.length ? (
            <>
              <div className="header-badge">{t('adminNotification.notification')}</div>
              {adminNotification?.data?.map((item, index) => {
                return (
                  <div className="item-badge" key={index + 1}>
                    <div className="item-avt">
                      <img className="icon-noti" src={iconNotification} alt="icon notification" />
                    </div>

                    <div className="item-right inline relative" onClick={() => handleBadgeItem(item)}>
                      <div className="title  min-w-[275px]">
                        <div className="title-content">
                          <span className={item.isRead ? null : 'readTrue'}>
                            {item?.profileInfo?.ghpappid} {item?.profileInfo?.clientName}{' '}
                            {t('adminNotification.createBy')} {item?.profileInfo?.createdBy}
                          </span>
                        </div>
                        <div className={item.isRead ? null : 'readTrue'}>
                          Profile status: {item?.title}
                        </div>
                        <div className="flex pl-[60%]">
                          {/* <div className={item.isRead ? 'hour' : 'hour-ago'}>
                            {moment(item.createdDate).startOf('hour').fromNow()}
                          </div> */}
                          <div className={item.isRead ? 'hour' : 'hour-ago'}>
                            {formatTimeInTable(item?.profileInfo?.createdDate)}
                          </div>
                        </div>
                      </div>
                      <div className="check absolute top-[15px] right-[-10px]">
                        {item?.isRead && null}
                        {!item?.isRead && (
                          <img className="icon-circle" src={iconCircle} style={{ width: '15px' }} alt="icon circle" />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="d-flex read-more">
                <Link to="/admin-notification">
                  <button type="button" >
                    <span>{t('adminNotification.more')}</span>
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="no-result">
                <span>{t('adminNotification.noResult')}</span>
              </div>
            </>
          )}
        </Menu>

      </>
    )
  }

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={['hover']}>
        <Badge size="small" overflowCount={999999} count={counter || 0}>
          <button >
            <BellFilled className="text-2xl text-white cursor-pointer" />
          </button>
        </Badge>
      </Dropdown>
    </>
  )
}

export default BadgeContainer
