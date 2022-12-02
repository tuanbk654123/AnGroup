// import { SelectBox } from '~/components/common'
import { Col, Form, Row } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { FormItem, PappperButton, SelectBox, TextInput } from '~/components/common'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { reviewGetAllRequest } from '~/redux/slices/review/middleware'
import { formatTimeInTable } from '~/utils'
import { CSVLink } from 'react-csv'
import { Option } from '~/components/common/form-control/select-box'
import { userServices } from '~/services'
import { Sale } from '~/types'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const ActionFormFilter = () => {
  const [formValues, setFormValues] = useState({
    ProfileId: '',
  })
  const [options, setOptions] = useState<Sale[]>([])
  const [options1, setOptions1] = useState<Sale[]>([])
  const [pageIndex] = useState<number>(1)
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch()
  const dataReview = useAppSelector((state) => state.review.dataReview)
  const handleChangeForm = (changeValues, values) => {
    setFormValues({ ...formValues, ...changeValues })
  }

  const onFinish = async (values) => {
    await dispatch(
      reviewGetAllRequest({
        reviewFilter: {
          paginationAll: {
            pageIndex: 1,
            pageSize: 25,
            isAll: true,
          },
          filter: {
            saleId: values?.saleId ? values?.saleId : '',
            userId: values?.userId ? values?.userId : '',
            rating: values?.rating ? values?.rating : '',
            ProfileId: values?.ProfileId ? parseInt(values?.ProfileId) : '',
          },
        },
      }),
    )
  }
  const fetchSales = useCallback(async (pageIndex) => {
    const res = await userServices.getAll({
      paginationAll: {
        pageIndex,
        pageSize: 10,
        isAll: true,
      },
      filter: {
        userType: '1',
      },
    })
    if (res.data) {
      const options = res.data.data.result
      setOptions(options)
    }
  }, [])

  useEffect(() => {
    fetchSales(pageIndex)
  }, [fetchSales, pageIndex])

  const fetchCustomer = useCallback(async (pageIndex) => {
    const res = await userServices.getAll({
      paginationAll: {
        pageIndex,
        pageSize: 10,
        isAll: true,
      },
      filter: {
        userType: '0',
      },
    })
    if (res.data) {
      const options1 = res.data.data.result
      setOptions1(options1)
    }
  }, [])

  useEffect(() => {
    fetchCustomer(pageIndex)
  }, [fetchCustomer, pageIndex])

  const data = dataReview?.result.map((e: any) => ({
    id: e?.id,
    customerName: e.customerName,
    profileId: e.profileId,
    ratingProduct: e.ratingProduct,
    commentProduct: e.commentProduct,
    ratingService: e.ratingService,
    commentService: e.commentService,
    userId: e.userId,
    createdDate: formatTimeInTable(e.createdDate),
  }))
  const dateTime = new Date().toISOString()
  const dateFormat = formatTimeInTable(dateTime)
  const headers = [
    { label: 'ID', key: 'id' },
    { label: t('review.Customer'), key: 'customerName' },
    { label: t('review.Ghh.AppID'), key: 'profileId' },
    { label: t('review.ratingProduct'), key: 'ratingProduct' },
    { label: t('review.commentProduct'), key: 'commentProduct' },
    { label: t('review.ratingSale'), key: 'ratingService' },
    { label: t('review.commentSale'), key: 'commentService' },
    { label: t('review.Sale'), key: 'userId' },
    { label: t('review.Time'), key: 'createdDate' },
  ]
  const csvReport = {
    filename: `${t('review.title')}, ${t('review.export')} ${dateFormat}.csv`,
    headers: headers,
    data: data,
  }

  function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  return (
    <div className="px-5">
      <Form layout="vertical" initialValues={formValues} onFinish={onFinish} onValuesChange={handleChangeForm}>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem label={t('review.Ghh.AppID')} name="ProfileId">
              <TextInput height="medium" rounded="medium" placeholder={t('placeholder.Ghh.AppID')} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={t('review.Rating')} name="rating">
              <SelectBox
                allowClear
                placeholder={t('placeholder.Rating')}
                options={[
                  { label: '1 sao', value: 1 },
                  { label: '2 sao', value: 2 },
                  { label: '3 sao', value: 3 },
                  { label: '4 sao', value: 4 },
                  { label: '5 sao', value: 5 },
                ]}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={t('review.Customer')} name="userId">
              <SelectBox
                placeholder={t('placeholder.Customer')}
                showSearch
                allowClear
                optionLabelProp="label"
                filterOption={(input, option) => removeAccents(option.props.label).toLowerCase().indexOf(removeAccents(input.toLowerCase())) >= 0}
              >
                <>
                  {options1.map((option) => (
                    <Option key={option.id} label={option.fullname} value={option.id}>
                      <div className="flex flex-col">
                        <span>{option.fullname}</span>
                        <span>{option.email}</span>
                      </div>
                    </Option>
                  ))}
                </>
              </SelectBox>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={t('review.Sale')} name="saleId">
              <SelectBox
                placeholder={t('placeholder.Sale')}
                showSearch
                allowClear
                optionLabelProp="label"
                filterOption={(input, option) => removeAccents(option.props.label).toLowerCase().indexOf(removeAccents(input.toLowerCase())) >= 0}
              >
                <>
                  {options.map((option) => (
                    <Option key={option.id} label={option.fullname} value={option.saleCode}>
                      <div className="flex flex-col">
                        <span>{option.fullname}</span>
                        <span>{option.email}</span>
                      </div>
                    </Option>
                  ))}
                </>
              </SelectBox>
            </FormItem>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <PappperButton htmlType="submit" variant="primary" rounded="large">
              {t('button.search')}
            </PappperButton>
          </Col>
        </Row>
      </Form>
      <Row className="justify-end">
        <PappperButton className="px-8 ml-4" variant="primary" rounded="button">
          <CSVLink {...csvReport}>{t('button.export')}</CSVLink>
        </PappperButton>
      </Row>
    </div>
  )
}
