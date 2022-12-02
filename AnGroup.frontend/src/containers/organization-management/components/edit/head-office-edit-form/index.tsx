import { Col, Form, Row } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormItem, PappperButton, SelectBox, TextInput } from '~/components/common'
import { Option } from '~/components/common/form-control/select-box'
import { message } from '~/constants/message'
import { EOrganizationListType } from '~/containers/organization-management/index.types'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { selectUsers } from '~/redux/slices'
import { departmantServices, userServices } from '~/services'
import { Department, User } from '~/types'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { flatten, isEmpty } from '~/utils/helper'
import ORGEditTable from '../edit-table'

export default function ORGHeadOfficeEditForm() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const sales = useAppSelector(selectUsers)
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const [department, setDepartment] = useState<Department>()
  const departmentId = department?.id
  const departmentparentId = department?.parentId
  const currentParams: any = useCurrentParams()
  const layer = currentParams.layer
  let salesPIC
  if (layer === '1') {
    salesPIC = sales.filter((sale) => sale.positionId === 3 && sale.departmentId !== departmentId)
  } else if (layer === '2') {
    salesPIC = sales.filter((sale) => (sale.positionId === 2) && sale.departmentId !== departmentId && sale.departmentId !== departmentparentId)
  } else if (layer === '3') {
    salesPIC = sales.filter((sale) => sale.positionId === 2 && sale.departmentId !== departmentparentId)
  }
  const [users, setUsers] = useState<User[]>([])
  const fetchUserInDepartment = useCallback(async () => {
    const res = await userServices.getAll({
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
      filter: {
        userType: '1',
        departmentId: `${id}`,
      },
    })
    setUsers(res.data.data.result)
  }, [id])

  const fetchDepartment = useCallback(async () => {
    try {
      const res = await departmantServices.getById(+id)
      if (res.kind === 'ok') {
        const { createdDate, createdBy, modifiedBy, modifiedDate, code, name, userIds } = res.data.data
        setDepartment(res.data.data)
        const format: any[] = await flatten(res.data.data.root)

        let fatherGroup = ''
        let group = ''
        if (format.length === 0) {
          fatherGroup = 'Head Office'
          group = ''
        }
        if (format.length === 1) {
          fatherGroup = 'Head Office'
          group = format[0].text
        }
        if (format.length === 2) {
          fatherGroup = format[0].text
          group = format[1].text
        }

        form.setFieldsValue({
          createdDate: createdDate && formatTimeInTable(createdDate),
          createdBy,
          modifiedBy,
          modifiedDate: modifiedDate && formatTimeInTable(modifiedDate),
          code,
          name,
          userIds: userIds ?? [],
          fatherGroup,
          group,
        })
      }
    } catch (error) {
      toast.error(t('message.error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, form])

  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.administrator_organization_management,
      search: createSearchParams({
        type: EOrganizationListType.head_office,
      }).toString(),
    })
  }

  const handleEditDepartment = async (values) => {
    const res = await departmantServices.edit({
      ...department,
      name: values.name,
      userIds: values.userIds,
      id: +id,
    })
    if (res.kind === 'ok' && !isEmpty(res.data.data)) {
      toast.success('Edit department success', { autoClose: 1000 })
    }

    //@ts-ignore
    if (res?.error.response.data.message === 'Department name already exist') {
      form.setFields([
        {
          name: 'name',
          errors: [t('organizationManagement.duplicateName')],
        },
      ])
      return
    } else {
      toast.error('Edit department faild, please try again', { autoClose: 1000 })
    }
  }

  const handleDeleteUser = async (user: User) => {
    const res = await userServices.delete(+user.id)
    if (res.kind === 'ok' && res.data.message === 'Delete success') {
      const newUsers = users.filter((item) => +item.id !== +user.id)
      setUsers(newUsers)
    } else {
      toast.error(message.errorApi, { autoClose: 1000 })
    }
  }
  function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  useEffect(() => {
    fetchDepartment()
  }, [fetchDepartment])

  useEffect(() => {
    fetchUserInDepartment()
  }, [fetchUserInDepartment])

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={handleEditDepartment}>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label={t('organizationManagement.fatherGroup')} name="fatherGroup">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={t('organizationManagement.group')} name="group">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
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
          <Col span={8}>
            <FormItem label={t('table.column.createDate')} name="createdDate">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.createBy')} name="createdBy">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('organizationManagement.branchCode')} name="code">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.modifyBy')} name="modifiedBy">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.modifyDate')} name="modifiedDate">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        {layer === '3' ? null :
          <Row gutter={24}>
            <Col span={24}>
              <FormItem label={t('organizationManagement.PIC')} name="userIds">
                <SelectBox
                  optionLabelProp="label"
                  mode="multiple"
                  // filterOption={true}
                  placeholder={t('placeholder.PIC')}
                  placement="topLeft"
                  showSearch
                  filterOption={(input, option) => removeAccents(option.props.label).toLowerCase().indexOf(removeAccents(input.toLowerCase())) >= 0}
                >
                  {salesPIC.map((sale) => (
                    <Option key={sale.id} label={sale.username} value={sale.id}>
                      <div className="flex flex-col">
                        <span>{sale.username} - {sale.fullname}</span>
                        <span>{sale.email}</span>
                      </div>
                    </Option>
                  ))}
                </SelectBox>
              </FormItem>
            </Col>
          </Row>}


        <div className="mb-9">
          <ORGEditTable title={t('organizationManagement.member')} onDeleteUser={handleDeleteUser} data={users} />
        </div>
        <Row justify="center">
          <Col>
            <PappperButton variant="cancel" rounded="large" className="mr-4" onClick={handleCancel}>
              {t('button.cancel')}
            </PappperButton>
            <PappperButton variant="primary" rounded="large" htmlType="submit">
              {t('button.save')}
            </PappperButton>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
