import { Col, DatePicker, Form, FormInstance, Row } from 'antd'
import { FormItem, PapperSwitch, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
import { TextEditor } from '~/components/common/form-control/text-editor'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { programGetByIdRequest, programUpdateIdRequest } from '~/redux/slices/program/middleware'
import { SettingSubmission } from '../setting-submission'
import { convertProgramDocumentsProductName, convertProgramDocumentsToFormValues } from '../setting-submission/helper'
import { formatTimeUS, formatTimeUSEndOf, RouterHelper } from '~/utils'
import { OtherPageConfig } from '../other-page-config'
import { listDefaultConfig } from '../setting-submission/constant'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'
import moment from 'moment'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

export const ProductNameManagementDetailForm = () => {
  const { id } = useParams()
  const [product, setProfile] = useState(null)
  const dataProgramDetails = useAppSelector((state) => state.program.dataProgramDetails)
  const { t } = useAppTranslation()
  const formRef = useRef<FormInstance>(null)
  const navigate = useNavigate()
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)

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
    return wasTheDayBefore || isTheDayBeforeStartDate
  }

  const changleDate = (e) => {
    setDateStart(e)
    // const valueDateStart = moment(e)?.format('DD/MM/YYYY')
    // const valueDateEnd = moment(formRef.current?.getFieldValue('endDate'))?.format('DD/MM/YYYY')
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
    const programDocuments = convertProgramDocumentsProductName(formValues)

    // delete some key not use
    listDefaultConfig.forEach((config) => {
      delete formValues[config.activeName]
      delete formValues[config.documentsName]
    })
    delete formValues['optionDocuments']
    delete formValues['product']
    const newPublic = formValues.isPublic ? 'Y' : 'N'
    const dataSubmit = {
      ...product,
      isPublich: newPublic,
      ...formValues,
      programDocuments,
      startDate: (formValues?.startDate && formatTimeUS(formValues?.startDate)) || '',
      endDate: (formValues?.endDate && formatTimeUSEndOf(formValues?.endDate)) || '',
    }
    formRef.current.validateFields().then(() => {
      dispatch(
        programUpdateIdRequest({
          data: dataSubmit,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(t('message.updateSuccess'))
            }
          },
          onError({ message }) {
            toast.error(message)
          },
        }),
      )
    })
  }

  const getData = useCallback(() => {
    dispatch(programGetByIdRequest({ data: { id } }))
  }, [id, dispatch])

  const convertData = useCallback(() => {
    setProfile({
      ...dataProgramDetails,
      isPublic: dataProgramDetails?.isPublich === 'Y' ? true : false,
    })
  }, [dataProgramDetails, setProfile])

  useEffect(() => {
    convertData()
  }, [convertData])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const programDocumentsConverted = convertProgramDocumentsToFormValues(
      product?.programDocuments,
      product?.group?.product?.formType,
    )
    setDateEnd(product?.endDate)
    formRef.current?.setFieldsValue?.({
      ...product,
      startDate:
        product?.startDate !== null ? moment(moment(product?.startDate).format('DD/MM/YYYY'), dateFormatList[0]) : null,
      endDate:
        product?.endDate !== null ? moment(moment(product?.endDate).format('DD/MM/YYYY'), dateFormatList[0]) : null,
      createdDate: product?.createdDate && formatTimeUS(product?.createdDate),
      modifiedDate: product?.modifiedDate && formatTimeUS(product?.modifiedDate),
      ...programDocumentsConverted,
    })
  }, [product])

  return (
    <div className="px-5 pb-5">
      <Form ref={formRef} layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('product.Product')}>
              <TextInput disabled height="medium" rounded="medium" value={product?.group?.product?.nameEn} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('product.groupProgram')}>
              <TextInput disabled height="medium" rounded="medium" value={product?.group?.nameEn} />
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
            <FormItem
              label={t('product.nameEn')}
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
              label={t('product.nameVn')}
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
          <Col span={8}>
            <FormItem
              label={t('product.mapping')}
              name="mapping"
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

        <SettingSubmission />
        <OtherPageConfig />

        <Row className="mt-3">
          <Col span={24}>
            <div className="flex items-center mb-2">
              <span>{t('product.content')}</span>
              {/* <FormItem layout="horizontal" label="Public" className="mb-0 ml-24">
                <PapperSwitch />
              </FormItem> */}
              <div className="ml-24 flex items-center">
                <div>{t('product.public')}</div>
                <FormItem name="isPublic" className="!mb-0 ml-1">
                  <PapperSwitch />
                </FormItem>
              </div>
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
