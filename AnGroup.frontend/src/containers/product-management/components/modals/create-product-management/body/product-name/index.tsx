import { Col, DatePicker, Row, Form } from 'antd'
import { FormItem, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productGetByIdRequest } from '~/redux/slices/product/middleware'
import {
  configApplicationCredit,
  configApplicationLoan,
  configIdCard,
  configResidence,
  listDefaultConfig,
} from '~/containers/product-management/components/setting-submission/constant'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { OtherPageConfig } from '../../../../other-page-config'
import { useForm, useWatch } from 'antd/lib/form/Form'
import { EProductType } from '~/containers/product-management/index.types'
import { programCreateRequest } from '~/redux/slices/program/middleware'
import { SettingSubmission } from '~/containers/product-management/components/setting-submission'
import { convertProgramDocumentsProductName } from '~/containers/product-management/components/setting-submission/helper'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { formatTimeUS, formatTimeUSEndOf, RouterHelper } from '~/utils'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'
import moment from 'moment'

// type ModalConfirm = {
//   isOpen: boolean
//   status: TConfirmModalListType | ''
//   message: string
// }

export const ProductNameModalBody = () => {
  const [form] = useForm()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const productWatch = useWatch('product', form)
  // const [modalConfirm, setModalConfirm] = useState<ModalConfirm>({
  //   isOpen: false,
  //   status: '',
  //   message: '',
  // })

  const dispatch = useAppDispatch()
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
  const { t } = useAppTranslation()
  // const dataProduct: any = useAppSelector((state) => state.product.dataProducts)
  const dataProductsAll = useAppSelector((state) => state.product.dataProductsAll)
  const dataProductDetails = useAppSelector((state) => state.product.dataProductDetails)
  const dataProductsAllActive = dataProductsAll?.filter((product) => product.status === 'A')
  const dataProductsDetailsActive = dataProductDetails?.productGroups?.filter((product) => product.status === 'A')
  const dataSelectId = []
  const dataSelectGroup = []
  const [disabled, setDisabled] = useState(true)
  const [dateStart, setDateStart] = useState(null)
  const [endDate, setDateEnd] = useState(null)
  const { productId, id } = useParams()

  if (dataProductsAllActive !== undefined && dataProductsAllActive.length > 0) {
    for (const item of dataProductsAllActive) {
      if (`${item.id}` === `${productId}`) {
        dataSelectId.push({ label: item.nameEn, value: item.id })

        if (item.productGroups.length > 0) {
          for (const el of item.productGroups) {
            if (`${el.id}` === `${id}`) {
              dataSelectGroup.push({ label: el.nameEn, value: el.id })
            }
          }
        }
      }
    }
  }

  const updateApplicationSubmission = useCallback(() => {
    const productSelected = dataProductsAllActive?.find((item) => item.key === (productWatch || Number(productId)))

    const isLoan = productSelected?.formType === EProductType.loan
    const isCredit = productSelected?.formType === EProductType.credit

    let applicationValue = []
    if (isLoan) {
      applicationValue = configApplicationLoan.value
    }
    if (isCredit) {
      applicationValue = configApplicationCredit.value
    }
    form.setFieldsValue({
      applicationDocuments: applicationValue,
    })
  }, [form, dataProductsAllActive, productWatch, productId])

  useEffect(() => {
    updateApplicationSubmission()
  }, [productWatch, productId, updateApplicationSubmission])

  useEffect(() => {
    form.setFieldsValue({
      idCardDocuments: configIdCard.value,
      residenceDocuments: configResidence.value,
      idCardActive: true,
      residenceActive: true,
      applicationActive: true,
      incomeActive: true,
      employmentActive: true,
      customerActive: true,
      otherActive: true,
    })
  }, [form])

  const dataSelectProduct = useMemo(() => {
    const productSort = [...dataProductsAllActive]
    productSort?.sort((a, b) => a?.status?.localeCompare(b?.status))
    if (productSort?.length > 0) {
      return productSort?.map((item) => ({
        label: item.nameEn,
        value: item.id,
      }))
    }
    return []
  }, [dataProductsAllActive])

  const dataSelectProductGroup = useMemo(() => {
    if (dataProductsDetailsActive?.length > 0) {
      return dataProductsDetailsActive?.map((item) => ({
        label: item.nameEn,
        value: item.id,
      }))
    }
    return []
  }, [dataProductsDetailsActive])

  const handleProduct = (id) => {
    setDisabled(false)
    dispatch(productGetByIdRequest({ data: { id } }))
    form.setFieldsValue({
      groupId: null,
    })
  }

  const disabledDate = (current) => {
    const wasTheDayBefore = current < moment().endOf('day').subtract(1, 'd')
    const isTheDayAfterEndDate = endDate ? current > moment(endDate) : false
    return wasTheDayBefore || isTheDayAfterEndDate
  }
  const disabledDateEnd = (current) => {
    return current < moment(dateStart)
  }

  const changleDate = (e) => {
    setDateStart(e)
  }

  const changleDateEnd = (e) => {
    setDateEnd(e)
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const endDate = formatTimeUSEndOf(values?.endDate) || null
    const startDate = formatTimeUS(values?.startDate) || null
    const programDocuments = convertProgramDocumentsProductName(values)
    // delete some key not use
    listDefaultConfig.forEach((config) => {
      delete values[config.activeName]
      delete values[config.documentsName]
    })
    delete values['optionDocuments']
    delete values['product']

    const dataSubmit = {
      ...values,
      groupId: values.groupId || id,
      startDate,
      endDate,
      programDocuments,
      isPublich: 'Y',
      id: 0,
    }
    form.validateFields().then(() => {
      dispatch(
        programCreateRequest({
          data: dataSubmit,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
              // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
            } else {
              toast.success(t('message.createSuccess'))
              navigate({
                pathname: RouterHelper.product_management,
                search: createSearchParams(currentParams).toString(),
              })
              // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'success', message }))
            }
          },
          onError({ message }) {
            toast.error(message)
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
          },
        }),
      )
    })
  }

  const handleClose = () => {
    navigate({
      pathname: RouterHelper.product_management,
      search: createSearchParams(currentParams).toString(),
    })
  }

  // const closePopup = () => {
  //   setModalConfirm((prev) => ({ ...prev, isOpen: false }))
  //   navigate({
  //     pathname: RouterHelper.product_management,
  //     search: createSearchParams(currentParams).toString(),
  //   })
  // }

  useEffect(() => {
    const id = productId
    if (productId !== undefined) {
      dispatch(productGetByIdRequest({
        data: { id },
        forSelect: true
      }))
    }
  }, [productId, dispatch])

  return (
    <div>
      <div className="pt-6">
        <Form layout="vertical" form={form}>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                label={t('product.Product')}
                required={dataSelectId.length > 0 ? false : true}
                name="product"
                rules={[{ required: dataSelectId.length > 0 ? false : true, message: t('validation.required') }]}
              >
                <SelectBox
                  placeholder={t('product.Product')}
                  options={dataSelectProduct}
                  onChange={handleProduct}
                  defaultValue={dataSelectId.length > 0 ? dataSelectId : null}
                  disabled={dataSelectId.length > 0}
                  // getPopupContainer={() => document.getElementById('product')}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label={t('product.groupProgramEn')}
                name="groupId"
                required={dataSelectGroup.length > 0 ? false : true}
                rules={[{ required: dataSelectGroup.length > 0 ? false : true, message: t('validation.required') }]}
              >
                <SelectBox
                  placeholder={t('product.groupProgramEn')}
                  options={dataSelectProductGroup}
                  defaultValue={dataSelectGroup.length > 0 ? dataSelectGroup : null}
                  disabled={dataSelectGroup.length > 0 || disabled}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
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
                <TextInput height="medium" rounded="medium" placeholder={t('product.inputMapping')} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                label={t('product.programNameEn')}
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
                <TextInput height="medium" rounded="medium" placeholder={t('product.inputProgramNameEn')} />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label={t('product.programNameVn')}
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
                <TextInput height="medium" rounded="medium" placeholder={t('product.inputProgramNameVn')} />
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
                  getPopupContainer={(trigger) => trigger.parentElement}
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
              <FormItem label={t('time.startDate')} name="startDate">
                <DatePicker
                  placeholder={t('time.inputStartDate')}
                  className="w-full h-8"
                  style={{ borderRadius: '12px' }}
                  format={dateFormatList}
                  disabledDate={disabledDate}
                  inputReadOnly={true}
                  onChange={(date) => changleDate(date)}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={t('time.endDate')} name="endDate">
                <DatePicker
                  placeholder={t('time.inputEndDate')}
                  className="w-full h-8"
                  format={dateFormatList}
                  style={{ borderRadius: '12px' }}
                  disabledDate={disabledDateEnd}
                  inputReadOnly={true}
                  onChange={changleDateEnd}
                  disabled={dateStart !== null ? false : true}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
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
        </Form>
      </div>
      <div className="flex justify-center pb-6">
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={handleClose}>
          {t('button.cancel')}
        </PappperButton>
        <PappperButton onClick={handleSubmit} variant="primary" rounded="button" htmlType="submit" loading={false}>
          {t('button.save')}
        </PappperButton>
      </div>

      {/* <PaperConfirmModal
        type={modalConfirm.status as TConfirmModalListType}
        message={modalConfirm.message}
        visible={modalConfirm.isOpen}
        onOk={closePopup}
        // onOk={() => setModalConfirm((prev) => ({ ...prev, isOpen: false }))}
      /> */}
    </div>
  )
}
