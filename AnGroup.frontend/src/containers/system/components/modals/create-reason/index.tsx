import { Col, Form, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormItem, IPaperCreateEditModalProps, PaperCreateEditModal, TextInput } from '~/components/common'
import { message } from '~/constants/message'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { systemServices } from '~/services/system'
import { RouterHelper } from '~/utils'
import { isEmpty } from '~/utils/helper'

interface ICreateReasonModalProps extends IPaperCreateEditModalProps {}

export const CreateReasonModal = (props: ICreateReasonModalProps) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const handleCreateReason = () => {
    form.validateFields().then(async (values) => {
      console.log({ values })
      try {
        const res = await systemServices.createReason(values)
        console.log({ res })
        if (isEmpty(res.data.data)) {
          toast.warning(res.data.message, { autoClose: 1500 })
        } else {
          toast.success('Create reason success')
          setTimeout(() => {
            navigate({
              pathname: RouterHelper.configuration_system,
            })
          }, 1000)
        }
      } catch (error) {
        toast.error(message.errorApi)
      }
    })
  }

  return (
    <PaperCreateEditModal centered titleText="Create Reason" {...props} onOk={handleCreateReason}>
      <Form layout="vertical" form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              name="code"
              required
              label={t('configuration.Code')}
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <TextInput height="medium" rounded="medium" placeholder={t('placeholder.code')} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="nameVn"
              required
              label={t('configuration.NameVn')}
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <TextInput height="medium" rounded="medium" placeholder={t('placeholder.Text')} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              name="nameEn"
              required
              label={t('configuration.NameEn')}
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <TextInput height="medium" rounded="medium" placeholder={t('placeholder.Text')} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="description" label={t('configuration.description')}>
              <TextInput height="medium" rounded="medium" placeholder={t('placeholder.description')} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </PaperCreateEditModal>
  )
}
