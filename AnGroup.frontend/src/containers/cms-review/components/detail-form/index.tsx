import { Col, Form, Row, Tooltip } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { FormItem, PapperRating, PapperTable, TextInput, TextInputArea } from '~/components/common'
import { ColumnsType } from 'antd/lib/table'
// import { formatTimeInTable } from '~/utils'
import { toast } from 'react-toastify'
import { reviewServices } from '~/services/review'
import { useParams } from 'react-router-dom'
import { formatTimeInTable } from '~/utils'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { User } from '~/types'
import { ActiveStatus, InActiveStatus } from '~/components/common/table/columns'

interface RecordDataType {
  key: React.ReactNode
  id: string
  statusName: string
  history: string
  createBy: string
  module: string
  result: string
  createdDate: string
}

export default function CMSReviewDetailForm() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [ratingProduct, setRatingProduct] = useState(0)
  const [ratingService, setRatingService] = useState(0)
  const [allSubmissionStatus, setAllSubmissionStatus] = useState([])
  const [saleManager, setSalesManager] = useState([])
  const [saleLeader, setSaleLeader] = useState([])
  const { t } = useAppTranslation()

  const columns: ColumnsType<RecordDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('review.Ghh.AppID'),
      dataIndex: 'profileId',
      key: 'profileId',
    },
    {
      title: t('table.column.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('review.subStatus'),
      dataIndex: 'subStatus',
      key: 'subStatus',
    },
    {
      title: t('review.module'),
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: t('review.history'),
      dataIndex: 'history',
      key: 'history',
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
  ]
  const columnSale: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('userManagement.userName'),
      dataIndex: 'username',
      key: 'username',
      render: (_, { username }) => {
        return (
          <Tooltip placement="bottomLeft" title={username}>
            <div className="w-32 truncate">{username}</div>
          </Tooltip>
        )
      },
    },
    {
      title: t('userManagement.fullName'),
      dataIndex: 'fullname',
      key: 'fullname',
      render: (_, { fullname }) => {
        return (
          <Tooltip placement="bottomLeft" title={fullname}>
            <div className="w-40 truncate">{fullname}</div>
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
    },
    {
      title: t('userManagement.saleCode'),
      dataIndex: 'saleCode',
      key: 'saleCode',
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
      title: t('userManagement.phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
  ]
  const fetchReviewGetById = useCallback(async () => {
    try {
      const res = await reviewServices.getById(+id)
      if (res.kind === 'ok') {
        const data = res.data.data?.result
        setRatingProduct(data?.profileRating?.ratingProduct)
        setRatingService(data?.profileRating?.ratingService)
        setAllSubmissionStatus(data?.allSubmissionStatus)
        setSaleLeader(data.saleLeader.departmentUsers.map((user) => user.user))
        setSalesManager(data.saleManager.departmentUsers.map((user) => user.user))
        form.setFieldsValue({
          commentProduct: data?.profileRating?.commentProduct,
          commentService: data?.profileRating?.commentService,
          createdDate: data?.profileRating?.createdDate && formatTimeInTable(data?.profileRating?.createdDate),
          customerFullName: data?.customerInfo?.fullname,
          customerUserName: data?.customerInfo?.username,
          customerPhone: data?.customerInfo?.phone,
          saleFullName: data?.saleInfo?.fullname,
          saleUserName: data?.saleInfo?.username,
          salePhone: data?.saleInfo?.phone,
          saleCode: data?.saleInfo?.saleCode,
          positionSale: data?.saleInfo?.positionName,
          groupSale: data?.saleManager?.name,
          channelName: data.saleLeader.name,
          teamSale: data?.saleInfo?.departmentName,
          saleLeader: data.saleLeader.departmentUsers.map((sale) => sale.user.fullname).join(','),
          userNameLeader: data.saleLeader.departmentUsers.map((sale) => sale.user.username).join(','),
          saleManager: data.saleManager.departmentUsers.map((sale) => sale.user.username).join(','),
          userNameManager: data.saleManager.departmentUsers.map((sale) => sale.user.username).join(','),
          productNameEn: data?.packageInfo?.productNameEn,
          productGroupNameEn: data?.packageInfo?.productGroupNameEn,
          programNameEn: data?.packageInfo?.programNameEn,
        })
      }
    } catch (error) {
      toast.error(t('message.error'))
    }
  }, [id, form, t])
  useEffect(() => {
    fetchReviewGetById()
  }, [fetchReviewGetById])
  return (
    <div className="p-4">
      <Form layout="vertical" form={form}>
        <p className="text-[20px] text-[#4E4B66] font-body-bold mb-3">{t('review.Rating')} </p>
        <Row>
          <Col span={24}>
            <FormItem label={t('review.commentProduct')} name="commentProduct">
              <TextInputArea />
            </FormItem>
          </Col>
        </Row>
        <Row className="mb-10">
          <Col span={24}>
            <span className="mr-6">{t('review.ratingProduct')} </span>{' '}
            <PapperRating readonly initialRating={ratingProduct} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={t('review.commentSale')} name="commentService">
              <TextInputArea />
            </FormItem>
          </Col>
        </Row>
        <Row className="mb-10">
          <Col span={24}>
            <span className="mr-6">{t('review.ratingSale')} </span>{' '}
            <PapperRating readonly initialRating={ratingService} />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <FormItem label={t('table.column.createDate')} name="createdDate">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <p className="text-[20px] text-[#4E4B66] font-body-bold mb-3">{t('review.customerInformation')}</p>
        <Row className="mb-10" gutter={24}>
          <Col span={8}>
            <FormItem label={t('userManagement.fullName')} name="customerFullName">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.userName')} name="customerUserName">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.phone')} name="customerPhone">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <p className="text-[20px] text-[#4E4B66] font-body-bold mb-3">{t('review.saleInformation')}</p>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('userManagement.fullName')} name="saleFullName">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.userName')} name="saleUserName">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.phone')} name="salePhone">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('userManagement.saleCode')} name="saleCode">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.position')} name="positionSale">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('userManagement.group')} name="groupSale">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.channel/Branch')} name="channelName">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.team')} name="teamSale">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>

        {/* <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('userManagement.saleLeader')} name="saleLeader">
              <TextInput readOnly={true} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.userName')} name="userNameLeader">
              <TextInput readOnly={true} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.phone')}>
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row> */}
        <p className="text-[20px] text-[#4E4B66] font-body-bold mb-3">{t('review.saleLeaderInformation')} </p>
        <PapperTable columns={columnSale} dataSource={saleLeader} size="middle" />
        {/* <Row gutter={24} className="mb-10">
          <Col span={8}>
            <FormItem label={t('userManagement.saleManager')} name="saleManager">
              <TextInput readOnly={true} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.userName')} name="userNameManager">
              <TextInput readOnly={true} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userManagement.phone')}>
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row> */}
        <p className="text-[20px] text-[#4E4B66] font-body-bold mb-3">{t('review.saleManagerInformation')} </p>
        <PapperTable columns={columnSale} dataSource={saleManager} size="middle" />
        <p className="text-[20px] text-[#4E4B66] font-body-bold mb-3">{t('review.productInformation')}</p>
        <Row gutter={24} className="mb-10">
          <Col span={8}>
            <FormItem label={t('product.Product')} name="productNameEn">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('product.groupProgram')} name="productGroupNameEn">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('product.programName')} name="programNameEn">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
      </Form>

      <p className="text-[20px] text-[#4E4B66] font-body-bold mb-3">{t('review.statusInformation')} </p>
      <PapperTable columns={columns} dataSource={allSubmissionStatus} size="middle" />
    </div>
  )
}
