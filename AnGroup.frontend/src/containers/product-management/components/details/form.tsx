import { Col, Form, FormInstance, Row } from 'antd'
import { FormItem, PapperSwitch, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
import { TextEditor } from '~/components/common/form-control/text-editor'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productGetByIdRequest, productUpdateIdRequest } from '~/redux/slices/product/middleware'
import { formatTimeUS, RouterHelper } from '~/utils'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'

export const ProductManagementDetailForm = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState(null)

  const dataProductDetails = useAppSelector((state) => state.product.dataProductDetails)

  const formRef = useRef<FormInstance>(null)
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch()

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
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        productUpdateIdRequest({
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
    dispatch(productGetByIdRequest({ data: { id } }))
  }, [id, dispatch])

  const convertData = useCallback(() => {
    if (!dataProductDetails) return

    setProfile({
      ...dataProductDetails,
      isPublic: dataProductDetails?.isPublic === 'Y' ? true : false,
    })
  }, [setProfile, dataProductDetails])

  useEffect(() => {
    convertData()
  }, [convertData])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    formRef.current?.setFieldsValue?.({
      ...profile,
      createdDate: profile?.createdDate && formatTimeUS(profile?.createdDate),
      modifiedDate: profile?.modifiedDate && formatTimeUS(profile?.modifiedDate),
    })
  }, [profile])

  return (
    <div className="px-5 pb-5">
      <Form ref={formRef} layout="vertical">
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
          <Col span={8}>
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
                  { label: t('select.UNSECUREDLOANEFORM'), value: 11 },
                  { label: t('select.CREDITCARD'), value: 2 },
                  { label: t('select.CREDITCARDEFORM'), value: 21 },
                ]}
              />
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
