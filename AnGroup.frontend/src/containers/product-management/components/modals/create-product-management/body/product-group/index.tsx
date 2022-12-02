import { Col, DatePicker, Row } from 'antd'
import Form, { FormInstance } from 'antd/lib/form/Form'
import moment from 'moment'
import { useRef, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productgroupCreateRequest } from '~/redux/slices/productgroup/middleware'
import { formatTimeUS, formatTimeUSEndOf, RouterHelper } from '~/utils'


export const ProductGroupModalBody = () => {
  const dataProductsAll = useAppSelector((state) => state.product.dataProductsAll)
  const dataProductsAllActive = dataProductsAll.filter((product) => product.status === 'A')
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
  const dataSelectProduct = []
  const dataSelectId = []
  const formRef = useRef<FormInstance>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const currentParams = useCurrentParams()
  const { id } = useParams()

  const disableStartDate = (current) => {
    const wasTheDayBefore = current < moment().endOf('day').subtract(1, 'd')
    const isTheDayAfterEndDate = dateEnd ? current > moment(dateEnd) : false
    return wasTheDayBefore || isTheDayAfterEndDate
  }

  const disabledDateEnd = (current) => {
    const isTheDayBeforeStartDate = current < moment(dateStart)
    return isTheDayBeforeStartDate
  }

  if (dataProductsAllActive !== undefined && dataProductsAllActive.length !== 0) {
    const productSort = [...dataProductsAllActive]
    productSort?.sort((a, b) => a?.status?.localeCompare(b?.status))

    for (const item of productSort) {
      if (`${item.id}` === `${id}`) {
        dataSelectId.push({ label: item.nameEn, value: item.id })
      }
      dataSelectProduct.push({ label: item.nameEn, value: item.id })
    }
  }

  const handleSubmit = () => {
    const values = formRef.current.getFieldsValue()

    formRef.current.validateFields().then(() => {
      dispatch(
        productgroupCreateRequest({
          data: {
            ...values,
            productId: dataSelectId[0]?.value || values?.productId,
            startDate: formatTimeUS(values.startDate) || '',
            endDate: formatTimeUSEndOf(values.endDate) || '',
          },
          onSuccess: ({ data, message }) => {
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
            toast.error(t('message.error'))
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

  const changleDate = (e) => {
    setDateStart(e)
  }
  const changleDateEnd = (e) => {
    setDateEnd(e)
  }

  return (
    <div>
      <div className="pt-6">
        <Form layout="vertical" ref={formRef}>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                label={t('product.Product')}
                name="productId"
                required={dataSelectId.length > 0 ? false : true}
                rules={[{ required: dataSelectId.length > 0 ? false : true, message: t('validation.required') }]}
              >
                <SelectBox
                  placeholder={t('product.Product')}
                  defaultValue={dataSelectId.length > 0 ? dataSelectId : null}
                  options={dataSelectProduct}
                  disabled={dataSelectId.length > 0}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={t('time.startDate')} name="startDate">
                <DatePicker
                  placeholder={t('time.inputStartDate')}
                  style={{ borderRadius: '12px' }}
                  className="w-full h-8"
                  disabledDate={disableStartDate}
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
                  format={dateFormatList}
                  onChange={(date) => changleDateEnd(date)}
                  disabled={dateStart !== null ? false : true}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                label={t('product.groupProgram')}
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
                <TextInput height="medium" rounded="medium" placeholder={t('product.inputgroupProgramEn')} />
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
                <TextInput height="medium" rounded="medium" placeholder={t('product.inputgroupProgramVn')} />
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
          <Row>
            <Col span={24}>
              <FormItem label={t('product.notes')} name="note">
                <TextInputArea placeholder={t('placeholder.notes')} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="flex justify-center pb-6">
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={handleClose}>
          {t('button.cancel')}
        </PappperButton>
        <PappperButton variant="primary" rounded="button" onClick={handleSubmit} loading={false}>
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
