import { Col, Form, FormInstance, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productCreateRequest } from '~/redux/slices/product/middleware'
import { RouterHelper } from '~/utils'

export const ProductModalBody = () => {
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [valueFormType, setValueFormType] = useState<number>()

  const dataProductsAll = useAppSelector((state) => state.product.dataProductsAll)

  const dataProductType = useMemo(() => {
    const data = dataProductsAll.filter(
      (item) => item.formType === valueFormType && item.status === 'A' && item.parentId === null,
    )
    return data.map((el) => ({
      label: `${el.nameEn} EFORM`,
      value: el.id,
    }))
  }, [valueFormType, dataProductsAll])

  const handleSubmit = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      parentId: values.parentId || null,
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        productCreateRequest({
          data: newValues,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
              // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
            } else {
              toast.success(t('message.createSuccess'))
              // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'success', message }))
            }
          },
          onError({ data, message }) {
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

  const handleFormType = (value) => {
    setValueFormType(value)
    form.setFieldsValue({
      parentId: null,
    })
  }

  // const closePopup = () => {
  //   setModalConfirm((prev) => {
  //     return { ...prev, isOpen: false }
  //   })
  //   navigate({
  //     pathname: RouterHelper.product_management,
  //     search: createSearchParams(currentParams).toString(),
  //   })
  // }

  return (
    <div>
      <div className="pt-6">
        <Form layout="vertical" ref={formRef} onFinish={handleSubmit} form={form}>
          <Row gutter={24}>
            <Col span={12}>
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
                <TextInput placeholder={t('product.inputNameEn')} />
              </FormItem>
            </Col>
            <Col span={12}>
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
                <TextInput placeholder={t('product.inputNameVn')} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem
                label={t('product.formType')}
                name="formType"
                required
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <SelectBox
                  placeholder={t('placeholder.formType')}
                  options={[
                    { label: t('select.UNSECUREDLOAN'), value: 1 },
                    // { label: t('select.UNSECUREDLOANEFORM'), value: 11 },
                    { label: t('select.CREDITCARD'), value: 2 },
                    // { label: t('select.CREDITCARDEFORM'), value: 21 },
                  ]}
                  onChange={handleFormType}
                />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                label={t('product.eformType')}
                name="parentId"
              // required
              // rules={[{ required: true, message: t('validation.required') }]}
              >
                <SelectBox
                  allowClear
                  placeholder={t('placeholder.eformType')}
                  options={dataProductType}
                  disabled={dataProductType.length > 0 ? false : true}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem
                label={t('table.column.status')}
                name="status"
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <SelectBox
                  options={[
                    { label: t('select.active'), value: 'A' },
                    { label: t('select.inActive'), value: 'I' },
                  ]}
                  placeholder={t('placeholder.Active/Inactive')}
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
