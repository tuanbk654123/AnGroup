import { Col, Form, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FormItem,
  IPaperCreateEditModalProps,
  MultipleSelect,
  PaperCreateEditModal,
  SelectBox,
  TextInput,
} from '~/components/common'
import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { Option } from '~/components/common/form-control/select-box'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { selectListMenu } from '~/redux/slices'
import { createMenu } from '~/redux/slices/menu/middleware'
import { menuServices } from '~/services'
import { RouterHelper } from '~/utils'

interface ICreateMenuConfigModalProps extends IPaperCreateEditModalProps {}

type ModalConfirm = {
  isOpen: boolean
  status: TConfirmModalListType | ''
  message: string
}

export const CreateMenuConfigModal = (props: ICreateMenuConfigModalProps) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  const [modalConfirm, setModalConfirm] = useState<ModalConfirm>({
    isOpen: false,
    status: '',
    message: '',
  })
  const [menuAction, setMenuActions] = useState([])
  const navigate = useNavigate()
  const dataMenu = useAppSelector(selectListMenu)
  const [routerConfig, setRouterConfig] = useState(null)
  const handleAddMenu = () => {
    form.validateFields().then((values) => {
      dispatch(
        createMenu({
          menu: {
            ...values,
            MenuActions: menuAction,
          },
          onSuccess: ({ data, message }) => {
            if (!data) {
              setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
            } else {
              setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'success', message }))
              setTimeout(() => {
                navigate({
                  pathname: RouterHelper.configuration_menu,
                })
              }, 1000)
            }
          },
        }),
      )
    })
  }
  const handleChange = (values, option) => {
    const MenuActions = option?.map((x) => ({ actionId: x.value }))
    setMenuActions(MenuActions)
  }

  useEffect(() => {
    getPageRouterConfig().then((x) => {
      const result = x?.data?.data?.result?.map((x) => ({ label: x?.pageName, value: x?.pageId }))
      setRouterConfig(result)
    })
  }, [])
  const getPageRouterConfig = async () => {
    return await menuServices.getPageRouterConfig()
  }
  return (
    <>
      <PaperCreateEditModal centered titleText="CREATE MENU CONFIG " {...props} onOk={handleAddMenu}>
        <Form layout="vertical" form={form}>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="Code" name="code">
                <SelectBox options={routerConfig ?? []} />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Name *"
                name="name"
                required
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <TextInput placeholder="Name" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Parent Menu" name="parentId">
                <SelectBox defaultValue="">
                  <Option value="">
                    <span>Parent Menu</span>
                  </Option>
                  {dataMenu.map((menu) => (
                    <Option label={menu.name} value={menu.id}>
                      <span>{menu.name}</span>
                    </Option>
                  ))}
                </SelectBox>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                label="Icon"
                name="icon"
                required
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <TextInput placeholder="Icon" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Url" name="url" required rules={[{ required: true, message: t('validation.required') }]}>
                <TextInput placeholder="Url" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Order number"
                name="orderNumber"
                required
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <TextInput placeholder="Order number" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label={t('table.column.status')} name="status">
                <SelectBox
                  options={[
                    { label: 'Active', value: 'A' },
                    { label: 'InActive', value: 'I' },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Menu position" name="menuPosition">
                <SelectBox
                  options={[
                    { label: 'Category', value: 0 },
                    { label: 'Child', value: 1 },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Show on menu" name="showOnMenu">
                <SelectBox
                  options={[
                    { label: 'Yes', value: 1 },
                    { label: 'No', value: 0 },
                  ]}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Menu Action">
                <MultipleSelect
                  onChange={(val, option) => handleChange(val, option)}
                  options={[
                    { label: 'View', value: 1 },
                    { label: 'Insert', value: 2 },
                    { label: 'Update', value: 3 },
                    { label: 'Delete', value: 4 },
                    { label: 'Import', value: 5 },
                    { label: 'Export', value: 6 },
                    { label: 'Approve', value: 7 },
                    { label: 'Reject', value: 8 },
                  ]}
                />
              </FormItem>
            </Col>
          </Row>
          {/* <Row>
            <Col span={24}>
              <FormItem label="Description" name="description">
                <TextInputArea placeholder="Description" />
              </FormItem>
            </Col>
          </Row> */}
        </Form>
      </PaperCreateEditModal>
      <PaperConfirmModal
        type={modalConfirm.status as TConfirmModalListType}
        message={modalConfirm.message}
        visible={modalConfirm.isOpen}
        onOk={() => setModalConfirm((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  )
}
