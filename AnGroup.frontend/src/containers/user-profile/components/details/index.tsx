import { Avatar, Col, Form, Row, Spin, UploadProps } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { FormItem, Option, PappperButton, SelectBox, TextInput, TreeSelectBox, UploadImage } from '~/components/common'
import { UserOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload'
import { getBase64, getImageBlob, isEmpty } from '~/utils/helper'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getDepartments } from '~/redux/slices/department/middleware'
import { selectListDepartment, selectListPosition } from '~/redux/slices'
import { editUser, fetchUserById } from '~/redux/slices/user/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { roleGetAllRequest } from '~/redux/slices/role/middleware'
import { User } from '~/types'
import { toast } from 'react-toastify'
import { getPositions } from '~/redux/slices/position/middleware'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import arrayToTree from 'array-to-tree'
import { userServices } from '~/services'
// import { fetchUserById } from '~/redux/slices/user/middleware';

type ImageResponse = {
  code: number
  data: string
}

const UserProfileForm = () => {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [avatarObj, setAvatarObj] = useState()
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const { t } = useAppTranslation()
  const [customer, setCustomer] = useState<User>()
  const [sales, setSale] = useState<any>()
  const [avatarResponse, setAvatarResponse] = useState<ImageResponse>({} as any)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const departments = useAppSelector(selectListDepartment)
  const positions = useAppSelector(selectListPosition)
  const roles = useAppSelector((state) => state.role.dataRole)
  const treeData = arrayToTree(departments, {
    parentProperty: 'parentId',
    customID: 'id',
  })

  const fetchSales = useCallback(async () => {
    const res = await userServices.getAll({
      forSelect: true,
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        isAll: true,
      },
      filter: {
        userType: '1',
      },
    })
    if (res.data) {
      const options = res.data.data.result.filter((item) => item.status === 'A')
      setSale(options)
    }
  }, [])

  const fetchDepartments = useCallback(() => {
    dispatch(
      getDepartments({
        forSelect: true,
        departmentFilter: {
          pagination: {
            pageIndex: 1,
            pageSize: 1000,
          },
          filter: {
            type: currentUser.Usertype === '1' ? '0' : '1',
          },
        },
      }),
    )
  }, [dispatch, currentUser.Usertype])

  const fetchRoles = useCallback(() => {
    dispatch(roleGetAllRequest({ forSelect: true }))
  }, [dispatch])
  const fetchPosition = useCallback(() => {
    dispatch(
      getPositions({
        forSelect: true,
        positionFilter: {
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            isAll: true
          },
        },
      }),
    )
  }, [dispatch])

  const handleChangeAvatar: UploadProps['onChange'] = (info) => {
    setAvatarObj(null)
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      console.log({ info })
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url)
      })
      setAvatarResponse(info.file.response)
    }
  }

  const fetchCustomerDetail = useCallback(() => {
    setLoading(true)
    dispatch(
      fetchUserById({
        userId: currentUser.Id,
        onSuccess: async (customer) => {
          form.setFieldsValue({
            // ipDevice: customer.ipDevice,
            fullname: customer.fullname,
            username: customer.username,
            email: customer.email,
            phone: customer.phone,
            employeeCode: customer.employeeCode,
            createdBy: customer.createdBy,
            createdDate: customer.createdDate && formatTimeInTable(customer.createdDate),
            modifiedBy: customer.modifiedBy,
            modifiedDate: customer.modifiedDate && formatTimeInTable(customer.modifiedDate),
            status: customer.status,
            saleCode: Number(customer.saleCode),
            userCanAccess: customer.userCanAccess,
            positionId: customer.positionId,
            departmentId: customer.departmentId,
            role: customer.userRoles.length ? customer.userRoles[0].roleId : '',
          })
          setCustomer(customer)
          setLoading(false)

          if (customer.profileImageUrl) {
            const res = await getImageBlob(customer.profileImageUrl)
            if (res) {
              setAvatarObj(res as any)
              //   setLoading(false)
            }
          }
        },
      }),
    )
  }, [dispatch, form, currentUser.Id])

  const callImg = async (data) => {
    const res = await getImageBlob(data)
    if (res) {
      console.log(res)
      localStorage.setItem('imgAvt', res as any)
    }
  }

  const onFinish = (values: any) => {
    const { fullname, username, phone, status, email, role, departmentId, userCanAccess, positionId, saleCode } = values
    const newPosition = positions.filter(item => item.id === positionId)
    dispatch(
      editUser({
        user: {
          ...customer,
          saleCode,
          fullname,
          username,
          email,
          phone,
          status,
          userCanAccess,
          userRoles: [{ roleId: `${role}`, userId: `${currentUser.Id}` }],
          position: newPosition[0],
          positionId,
          departmentId,
          profileImageUrl: isEmpty(avatarResponse) ? customer.profileImageUrl : avatarResponse.data,
        },
        onSuccess: ({ data, message }) => {
          if (!data) {
            toast.warning(message)
          } else {
            toast.success(message, { autoClose: 500 })
            callImg(data.profileImageUrl)
            localStorage.setItem('fullName', data?.fullname)
            navigate({
              pathname: RouterHelper.user_profile,
              search: createSearchParams({
                name: currentUser.Username,
                fullname: data?.fullname,
                type: currentUser.Usertype,
              }).toString(),
            })
          }
        },
      }),
    )
  }

  const handleCancel = () => {
    navigate({
      pathname: '/',
    })
  }

  useEffect(() => {
    fetchRoles()
    fetchDepartments()
    fetchPosition()
    fetchSales()
  }, [fetchRoles, fetchDepartments, fetchPosition, fetchSales])

  useEffect(() => {
    fetchCustomerDetail()
  }, [fetchCustomerDetail, fetchDepartments])

  return (
    <div className="px-5 pb-5">
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <Spin size="large"></Spin>
        </div>
      ) : (
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={24} className="flex justify-center pb-6">
              <UploadImage
                name="file"
                onChange={handleChangeAvatar}
                uploadUrl="/api/file/image/upload?folder=UserProfile"
              >
                {imageUrl ? (
                  <Avatar src={imageUrl} size={150} />
                ) : (
                  <>
                    {avatarObj ? <Avatar src={avatarObj} size={150} /> : <Avatar size={150} icon={<UserOutlined />} />}
                  </>
                )}
              </UploadImage>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                rules={[{ required: true, message: t('validation.required') }]}
                name="fullname"
                label={t('userManagement.fullName')}
              >
                <TextInput />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem name="username" label={t('userManagement.userName')}>
                <TextInput disabled />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                rules={[
                  { type: 'email', message: 'The input is not valid E-mail' },
                  { required: true, message: 'Please input your E-mail!' },
                ]}
                name="email"
                label={t('userManagement.email')}
              >
                <TextInput />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                rules={[
                  {
                    pattern: new RegExp(/([0-9])\b/),
                    message: 'Wrong phone number format!',
                  },
                ]}
                name="phone"
                label={t('userManagement.phone')}
              >
                <TextInput />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem name="createdDate" label={t('table.column.createDate')}>
                <TextInput disabled />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem name="createdBy" label={t('table.column.createBy')}>
                <TextInput disabled />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              {currentUser.Usertype === '0' && (
                <FormItem name="saleCode" label={t('userManagement.saleCode')}>
                  <SelectBox
                    placeholder={t('placeholder.saleCode')}
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    filterOption={(input, option) => option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <>
                      {sales?.map((option) => (
                        <Option
                          key={option.id}
                          label={
                            <div>
                              {' '}
                              {option.employeeCode}-{option.username}
                            </div>
                          }
                          value={option.id}
                        >
                          <div className="flex flex-col">
                            <span className="flex">
                              <span>{option.employeeCode}</span>-<span>{option.username}</span>
                            </span>
                            <span>{option.fullname}</span>
                          </div>
                        </Option>
                      ))}
                    </>
                  </SelectBox>
                </FormItem>
              )}
              {currentUser.Usertype === '1' && (
                <FormItem
                  name="saleCode"
                  label={t('userManagement.saleCode')}
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <TextInput disabled />
                </FormItem>
              )}
              {currentUser.Usertype === '2' && (
                <FormItem
                  name="employeeCode"
                  label={t('userManagement.employeeCode')}
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <TextInput disabled />
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              <FormItem name="modifiedDate" label={t('table.column.modifyDate')}>
                <TextInput disabled />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem name="modifiedBy" label={t('table.column.modifyBy')}>
                <TextInput disabled />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                name="status"
                label={t('table.column.status')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <SelectBox
                  placeholder="Status"
                  options={[
                    { label: t('select.active'), value: 'A' },
                    { label: t('select.inActive'), value: 'D' },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                name="userCanAccess"
                label={t('userManagement.userCanAccess')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <SelectBox
                  placeholder="User can access"
                  options={[
                    { label: t('select.app'), value: '0' },
                    { label: t('select.web'), value: '1' },
                    { label: t('select.all'), value: '2' },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                name="role"
                label={t('userManagement.role')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <SelectBox placeholder="Role" options={roles.map((role) => ({ label: role.name, value: role.id }))} />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              {currentUser.Usertype === '0' && (
                <FormItem name="employeeCode" label={t('userManagement.customerCode')}>
                  <TextInput disabled />
                </FormItem>
              )}
              {currentUser.Usertype === '1' && (
                <FormItem
                  name="positionId"
                  label={t('userManagement.position')}
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <SelectBox
                    placeholder="Position"
                    options={positions?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                </FormItem>
              )}
              {currentUser.Usertype === '2' && (
                <FormItem
                  name="departmentId"
                  label={t('userManagement.department')}
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <TreeSelectBox treeData={treeData} />
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              {currentUser.Usertype === '1' && (
                <FormItem
                  name="departmentId"
                  label={t('userManagement.department')}
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <TreeSelectBox treeData={treeData} />
                </FormItem>
              )}
            </Col>
          </Row>

          <Row justify="center">
            <Col>
              <PappperButton variant="cancel" rounded="large" className="mr-4" onClick={handleCancel}>
                {t('button.cancel')}
              </PappperButton>
              <PappperButton variant="primary" rounded="large" type="primary" htmlType="submit">
                {t('button.save')}
              </PappperButton>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  )
}

export default UserProfileForm
