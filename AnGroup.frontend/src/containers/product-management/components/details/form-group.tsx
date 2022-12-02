import { Col, DatePicker, Form, FormInstance, Row } from 'antd'
import { FormItem, PapperSwitch, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
import { TextEditor } from '~/components/common/form-control/text-editor'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productgroupGetByIdRequest, productgroupUpdateIdRequest } from '~/redux/slices/productgroup/middleware'
import { formatTimeUS, formatTimeUSEndOf, RouterHelper } from '~/utils'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'
import moment from 'moment'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

export const ProductGroupManagementDetailForm = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const dataProductgroupDetail = useAppSelector((state) => state.productgroup.dataProductgroupDetail)
  const formRef = useRef<FormInstance>(null)
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch()

  const disabledDate = (current) => {
    // return current && current < moment()?.endOf("day")?.subtract(1, "d")
    const wasTheDayBefore = current < moment().endOf('day').subtract(1, 'd')
    const isTheDayAfterEndDate = dateEnd ? current > moment(dateEnd) : false
    return wasTheDayBefore || isTheDayAfterEndDate
  }

  const disabledDateEnd = (current) => {
    const wasTheDayBefore = current < moment().endOf('day').subtract(1, 'd')
    const isTheDayBeforeStartDate = current < moment(dateStart).endOf('day').subtract(1, 'd')
    return isTheDayBeforeStartDate || wasTheDayBefore
  }

  const changleDate = (e) => {
    setDateStart(e)
    // formRef.current?.setFieldsValue?.({
    //   endDate: moment(moment(e)?.format('DD/MM/YYYY'), dateFormatList[0]),
    // })
  }
  const changleDateEnd = (e) => {
    setDateEnd(e)
  }

  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.product_management,
      search: createSearchParams().toString(),
    })
  }

  const handleSave = () => {
    const formValues = formRef.current.getFieldsValue()
    const newPublic = formValues.isPublic ? 'Y' : 'N'

    const dataSubmit = {
      ...profile,
      ...formValues,
      isPublic: newPublic,
      startDate: (formValues?.startDate && formatTimeUS(formValues?.startDate)) || '',
      endDate: (formValues?.endDate && formatTimeUSEndOf(formValues?.endDate)) || '',
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        productgroupUpdateIdRequest({
          data: dataSubmit,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(t('message.updateSuccess'))
            }
          },
          onError({ message }) {
            toast.error(t('message.error'))
          },
        }),
      )
    })
  }

  const getData = useCallback(() => {
    dispatch(productgroupGetByIdRequest({ data: { id } }))
  }, [id, dispatch])

  const convertData = useCallback(() => {
    setProfile({
      ...dataProductgroupDetail,
      isPublic: dataProductgroupDetail?.isPublic === 'Y' ? true : false,
    })
  }, [dataProductgroupDetail, setProfile])

  useEffect(() => {
    convertData()
  }, [convertData])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    setDateStart(profile?.startDate)
    setDateEnd(profile?.endDate)
    formRef.current?.setFieldsValue?.({
      ...profile,
      startDate:
        profile?.startDate !== null ? moment(moment(profile?.startDate).format('DD/MM/YYYY'), dateFormatList[0]) : null,
      endDate:
        profile?.endDate !== null ? moment(moment(profile?.endDate).format('DD/MM/YYYY'), dateFormatList[0]) : null,
      createdDate: profile?.createdDate && formatTimeUS(profile?.createdDate),
      modifiedDate: profile?.modifiedDate && formatTimeUS(profile?.modifiedDate),
    })
  }, [profile])

  return (
    <div className="px-5 pb-5">
      <Form ref={formRef} layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('product.Product')}>
              <TextInput disabled height="medium" rounded="medium" value={profile?.product?.nameEn} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={t('product.groupProgramEn')}
              name="nameEn"
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 100,
                  message: t('validation.validMaxLength100'),
                },
              ]}
            >
              <TextInput height="medium" rounded="medium" placeholder="Input" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={t('product.groupProgramVn')}
              name="nameVn"
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 100,
                  message: t('validation.validMaxLength100'),
                },
              ]}
            >
              <TextInput height="medium" rounded="medium" placeholder="Input" />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('time.startDate')} name="startDate">
              <DatePicker
                placeholder={t('time.inputStartDate')}
                style={{ borderRadius: '12px' }}
                className="w-full h-8"
                disabledDate={disabledDate}
                inputReadOnly={true}
                format={dateFormatList}
                onChange={(date) => changleDate(date)}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('time.endDate')} name="endDate">
              <DatePicker
                placeholder={t('time.inputEndDate')}
                style={{ borderRadius: '12px' }}
                className="w-full h-8"
                disabledDate={disabledDateEnd}
                inputReadOnly={true}
                onChange={(date) => changleDateEnd(date)}
                format={dateFormatList}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={t('table.column.status')}
              name="status"
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <SelectBox
                placeholder={t('placeholder.Active/Inactive')}
                options={[
                  { label: t('select.active'), value: 'A' },
                  { label: t('select.inActive'), value: 'I' },
                ]}
              />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('table.column.createDate')} name="createdDate">
              <TextInput disabled height="medium" rounded="medium" placeholder="Input" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.createBy')} name="createdBy">
              <TextInput disabled height="medium" rounded="medium" placeholder="Input" />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('table.column.modifyDate')} name="modifiedDate">
              <TextInput disabled height="medium" rounded="medium" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.modifyBy')} name="modifiedBy">
              <TextInput disabled height="medium" rounded="medium" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={t('product.notes')} name="note">
              <TextInputArea placeholder={t('placeholder.notes')} />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="flex items-center mb-2">
              <span>{t('product.content')}</span>
              <div className="ml-24 flex items-center">
                <div>{t('product.public')}</div>
                <FormItem name="isPublic" className="!mb-0 ml-1">
                  <PapperSwitch />
                </FormItem>
              </div>
              {/* <FormItem layout="horizontal" label="Public" className="mb-0 ml-24" name="isPublic">
                <PapperSwitch />
              </FormItem> */}
            </div>
            <FormItem name="content">
              <TextEditor placeholder={t('placeholder.content')} />
            </FormItem>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <PappperButton variant="cancel" rounded="large" className="mr-4" onClick={handleCancel}>
              {t('button.cancel')}
            </PappperButton>
            {/* <PapperPopupConfirm title="Do you want save this data?" onConfirm={handleSave}> */}
            <PappperButton className="btn-primary" rounded="large" onClick={handleSave}>
              {t('button.save')}
            </PappperButton>
            {/* </PapperPopupConfirm> */}
          </Col>
        </Row>
      </Form>
    </div>
  )
}
