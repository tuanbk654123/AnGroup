import { Col, Form, FormInstance, Row } from 'antd'
import { useRef } from 'react'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
import { useAppDispatch } from '~/redux/hooks'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { RouterHelper } from '~/utils'
import { createNotification } from '~/redux/slices/notification/middleware'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'

export default function NotificationAddForm() {
  const formRef = useRef<FormInstance>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const handleSave = () => {
    formRef.current.validateFields().then((values) => {
      const dataSubmit = {
        ...values,
        title: values.title.replace(/  +/g, ' '),
        description: values?.description?.replace(/  +/g, ' ') || '',
        status: values.status || 'A',
        content: values.content || '',
        banner: '',
        avatar: '',
        isall: '',
        topic: '',
        userId: '',
        token: '',
        route: '',
        exdata: '',
      }

      formRef.current.validateFields().then(() => {
        dispatch(
          createNotification({
            notification: dataSubmit,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
              } else {
                toast.success(t('message.createSuccess'))
                setTimeout(() => {
                  navigate({
                    pathname: RouterHelper.cms_notification,
                  })
                }, 1000)
              }
            },
            onError({ message }) {
              toast.error(t('message.error'))
            },
          }),
        )
      })
    })
  }

  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.cms_notification,
      search: createSearchParams().toString(),
    })
  }

  return (
    <div>
      <Form ref={formRef} layout="vertical">
        <Row gutter={24}>
          <Col span={24}>
            <FormItem
              label={t('notification.title')}
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 100,
                  message: t('validation.validMaxLength100'),
                },
              ]}
              name="title"
            >
              <TextInput placeholder={t('notification.inputTitle')} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <FormItem
              label={t('notification.description')}
              name="description"
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 100,
                  message: t('validation.validMaxLength100'),
                },
              ]}
            >
              <TextInputArea placeholder={t('placeholder.description')} />
            </FormItem>
          </Col>

          {/* <Col span={8}>
            <FormItem label={t('table.column.createDate')}>
              <TextInput disabled />
            </FormItem>
            <FormItem label={t('table.column.modifyDate')}>
              <TextInput disabled />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label={t('table.column.createBy')}>
              <TextInput disabled />
            </FormItem>
            <FormItem label={t('table.column.modifyBy')}>
              <TextInput disabled />
            </FormItem>
          </Col> */}
        </Row>

        <Row>
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
                  { label: t('select.inActive'), value: 'D' },
                ]}
              />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="flex items-center mb-2">
              <span>{t('product.content')}</span>
            </div>
            <FormItem name="content" required rules={[{ required: true, message: t('validation.required') }]}>
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
            <PappperButton className="btn-primary" rounded="large" htmlType="submit" onClick={handleSave}>
              {t('button.save')}
            </PappperButton>
            {/* </PapperPopupConfirm> */}
          </Col>
        </Row>
      </Form>
    </div>
  )
}
