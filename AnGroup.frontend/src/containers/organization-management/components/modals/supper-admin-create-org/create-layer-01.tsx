import { Col, Form, Row } from 'antd'
import { FormItem, SelectBox, TextInput } from '~/components/common'
import { Option } from '~/components/common/form-control/select-box'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { selectUsers } from '~/redux/slices'

export const SupperAdminCreateLayer01 = ({ formRef }: any) => {
  const admins = useAppSelector(selectUsers)
  const { t } = useAppTranslation()
  function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  return (
    <Form layout="vertical" form={formRef}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem
            label={t('organizationManagement.Title')}
            name="name"
            required
            rules={[
              { required: true, message: t('validation.required') },
              { max: 50, message: t('validation.validMaxLength50') },
            ]}
          >
            <TextInput placeholder={t('placeholder.title')} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label={t('organizationManagement.branchCode')}
            name="code"
            required
            rules={[
              { required: true, message: t('validation.required') },
              { max: 50, message: t('validation.validMaxLength50') },
            ]}
          >
            <TextInput placeholder={t('placeholder.code')} />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label={t('organizationManagement.PIC')} name="userid">
            <SelectBox optionLabelProp="label" mode="multiple" placeholder={t('placeholder.PIC')} placement="topLeft"
              showSearch
              filterOption={(input, option) => removeAccents(option.props.label).toLowerCase().indexOf(removeAccents(input.toLowerCase())) >= 0}>
              {admins.map((admin) => (
                <Option key={admin.id} label={admin.username} value={admin.id}>
                  <div className="flex flex-col">
                    <span>{admin.username} - {admin.fullname}</span>
                    <span>{admin.email}</span>
                  </div>
                </Option>
              ))}
            </SelectBox>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}
