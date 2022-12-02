import { Col, Form, Row } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FormItem, SelectBox, TextInput } from '~/components/common'
import { Option } from '~/components/common/form-control/select-box'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { selectDepartmentLevel01, selectUsers } from '~/redux/slices'
import { isEmpty } from '~/utils/helper'

export const CreateLayer02 = ({ formRef }: any) => {
  const departmentLevel01 = useAppSelector(selectDepartmentLevel01)
  const sales = useAppSelector(selectUsers)
  // const [groupIdSelected, setGroupIdSelected] = useState(0)
  const [searchParams] = useSearchParams()
  const { t } = useAppTranslation()
  const groupId = searchParams.get('layer')?.split('-')[1]
  // const salesPIC = sales.filter((sale) => sale.departmentId === groupIdSelected)
  const salesPIC = sales.filter((sale) => sale.positionId === 2)
  const handleOrganization = (group) => {
    formRef.setFieldsValue({
      userid: [],
    })
    // const groupSelect = JSON.parse(group).id
    // setGroupIdSelected(groupSelect)
  }
  function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  useEffect(() => {
    if (!isEmpty(groupId)) {
      formRef.setFieldsValue({
        parentId: JSON.stringify(departmentLevel01.find((department) => department.id === Number(groupId))),
      })
    }
  }, [formRef, groupId, departmentLevel01])
  return (
    <Form layout="vertical" form={formRef}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem
            label={t('organizationManagement.group')}
            name="parentId"
            required
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <SelectBox
              placeholder={t('placeholder.group')}
              options={departmentLevel01.map((department) => ({
                label: department.name,
                value: JSON.stringify(department),
              }))}
              disabled={!isEmpty(groupId)}
              onChange={handleOrganization}
            />
          </FormItem>
        </Col>

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
        <Col span={12}>
          <FormItem label={t('organizationManagement.PIC')} name="userid">
            <SelectBox optionLabelProp="label" mode="multiple" placeholder={t('placeholder.PIC')} placement="topLeft"
              showSearch
              filterOption={(input, option) => removeAccents(option.props.label).toLowerCase().indexOf(removeAccents(input.toLowerCase())) >= 0}>
              {salesPIC.map((sale) => (
                <Option
                  key={sale.id}
                  label={sale.username}
                  value={sale.id}
                >
                  <div className="flex flex-col">
                    <span>
                      {sale.username} - {sale.fullname}
                    </span>
                    <span>{sale.email}</span>
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
