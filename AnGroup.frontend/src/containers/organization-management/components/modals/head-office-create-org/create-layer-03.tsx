import { Col, Form, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FormItem, SelectBox, TextInput } from '~/components/common'
// import { Option } from '~/components/common/form-control/select-box'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { selectDepartmentLevel01, selectDepartmentLevel02 } from '~/redux/slices'
import { Department } from '~/types'
import { isEmpty } from '~/utils/helper'

export const CreateLayer03 = ({ formRef }: any) => {
  const [searchParams] = useSearchParams()
  const departmentLevel01 = useAppSelector(selectDepartmentLevel01)
  const departmentLevel02 = useAppSelector(selectDepartmentLevel02)

  const pathParams = searchParams.get('layer')?.split('-')
  const fatherGroupId = !isEmpty(pathParams) && pathParams[1]
  const groupId = !isEmpty(pathParams) && pathParams[2]
  const { t } = useAppTranslation()
  // const sales = useAppSelector(selectUsers)
  // const [groupIdSelected, setGroupIdSelected] = useState(0)
  const [disableGroup, setDisableGroup] = useState<boolean>(true)
  const [avaiabledepartmentLevel02, setAvaiabledepartmentLevel02] = useState<Department[]>(() => {
    if (!isEmpty(fatherGroupId) && !isEmpty(groupId)) {
      return departmentLevel02
    }
    return []
  })
  // const salesPIC = sales.filter((sale) => sale.departmentId === groupIdSelected)
  // const salesPIC = sales.filter((sale) => sale.positionId === 1)
  const handleFatherChange = (value) => {
    const fatherValue = JSON.parse(value)
    const avaiableDepartmentLevel02 = departmentLevel02.filter((item) => item.parentId === fatherValue.id)
    if (avaiableDepartmentLevel02.length === 0) {
      setDisableGroup(true)
      return
    }
    setAvaiabledepartmentLevel02(avaiableDepartmentLevel02)
    setDisableGroup(false)
  }
  const handleOrganization = (group) => {
    formRef.setFieldsValue({
      userid: [],
    })
    // const groupSelect = JSON.parse(group).id
    // setGroupIdSelected(groupSelect)
  }
  // function removeAccents(str) {
  //   return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // }

  useEffect(() => {
    if (!isEmpty(fatherGroupId) && !isEmpty(groupId)) {
      formRef.setFieldsValue({
        fatherId: JSON.stringify(departmentLevel01.find((department) => department.id === Number(fatherGroupId))),
        parentId: JSON.stringify(departmentLevel02.find((department) => department.id === Number(groupId))),
      })
    }
  }, [formRef, groupId, departmentLevel01, departmentLevel02, fatherGroupId])

  return (
    <Form layout="vertical" form={formRef}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem
            label={t('organizationManagement.fatherGroup')}
            name="fatherId"
            required
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <SelectBox
              onChange={handleFatherChange}
              placeholder={t('placeholder.fatherGroup')}
              options={departmentLevel01.map((department) => ({
                label: department.name,
                value: JSON.stringify(department),
              }))}
              disabled={!isEmpty(pathParams)}
            />
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem
            label={t('organizationManagement.group')}
            name="parentId"
            required
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <SelectBox
              disabled={disableGroup}
              placeholder={t('placeholder.group')}
              options={avaiabledepartmentLevel02.map((department) => ({
                label: department.name,
                value: JSON.stringify(department),
              }))}
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
        {/* <Col span={24}>
          <FormItem label={t('organizationManagement.PIC')} name="userid">
            <SelectBox optionLabelProp="label" mode="multiple" placeholder={t('placeholder.PIC')} placement="topLeft"
              showSearch
              filterOption={(input, option) => removeAccents(option.props.label).toLowerCase().indexOf(removeAccents(input.toLowerCase())) >= 0}>
              {salesPIC.map((sale) => (
                <Option
                  key={sale.id}
                  label={
                    <div>
                      {sale.username}
                    </div>
                  }
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
        </Col> */}
      </Row>
    </Form>
  )
}
