import { Col, Form, Row, Spin } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormItem, MultipleSelect, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
import { Option } from '~/components/common/form-control/select-box'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { selectListMenu } from '~/redux/slices'
import { editMenu, menuGetByIdRequest } from '~/redux/slices/menu/middleware'
import { menuServices } from '~/services'
// import { menuServices } from '~/services'
import { Menu } from '~/types/menu'
import { formatTimeInTable, RouterHelper } from '~/utils'

import { MenuHeaderForDetails } from '../header/for-edit'

export const EditMenuConfigContainer = () => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const params = useCurrentParams()
  const [menu, setMenu] = useState<Menu>()
  const [loading, setLoading] = useState<boolean>(false)
  const [menuDataAction, setMenuDataAction] = useState<any>([])
  const dataMenu = useAppSelector(selectListMenu)
  const currentLanguage = useAppSelector((state) => state.app.currentLanguage)
  // const [routerConfig, setRouterConfig] = useState(null)
  const { t } = useAppTranslation()
  const fetchMenuDetail = useCallback(() => {
    setLoading(true)
    dispatch(
      menuGetByIdRequest({
        menuId: +id,
        onSuccess: (menu) => {
          form.setFieldsValue({
            code: menu.code,
            name: menu.name,
            nameEn: menu.nameEn,
            url: menu.url,
            icon: menu.icon,
            parentId: menu.parentId ? menu.parentId : '',
            orderNumber: menu.orderNumber,
            menuPosition: menu.menuPosition ? 1 : 0,
            showOnMenu: menu.showOnMenu ? 1 : 0,
            description: menu.description,
            menuActions: menu.menuActions.map((action) => action.actionId),
            createdBy: menu.createdBy,
            createdDate: menu.createdDate && formatTimeInTable(menu.createdDate),
            modifiedBy: menu.modifiedBy,
            modifiedDate: menu.modifiedDate && formatTimeInTable(menu.modifiedDate),
            status: menu.status,
          })
          setMenu(menu)
          setLoading(false)
        },
      }),
    )
  }, [dispatch, id, form])

  useEffect(() => {
    fetchMenuDetail()
    // getPageRouterConfig().then((x) => {
    //   const result = x?.data?.data?.result?.map((x) => ({ label: x?.pageName, value: x?.pageId }))
    //   setRouterConfig(result)
    // })
    const getAllMenuDataAction = async () => {
      const res = await menuServices.getAllMenuDataAction()
      const result = (res?.data?.data?.result as Array<any>).map((x) => ({ label: x?.name, value: x?.id }))
      setMenuDataAction(result)
    }
    getAllMenuDataAction().catch((x) => {
      return new Error(t('message.error'))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMenuDetail])

  // const getPageRouterConfig = async () => {
  //   return await menuServices.getPageRouterConfig()
  // }

  const onFinish = (values: any) => {
    const {
      code,
      name,
      nameEn,
      url,
      icon,
      parentId,
      orderNumber,
      status,
      menuActions,
      menuPosition,
      description,
      showOnMenu,
    } = values

    const newData = menuActions.map((item) => {
      const itemMenu = menu.menuActions.find((action) => action.actionId === item)
      if (itemMenu) {
        return itemMenu
      }
      return {
        actionId: item,
      }
    })
    dispatch(
      editMenu({
        menu: {
          ...menu,
          code,
          name,
          nameEn,
          url,
          icon,
          parentId,
          orderNumber,
          status,
          menuPosition,
          showOnMenu,
          description,
          menuActions: newData,
        },
        onSuccess: ({ data, message }) => {
          if (!data) {
            toast.warning(message)
          } else {
            toast.success(t('message.updateSuccess'), { autoClose: 500 })
          }
        },
      }),
    )
  }
  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.configuration_menu,
      search: createSearchParams({
        ...params,
      }).toString(),
    })
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <Spin />
        </div>
      ) : (
        <div>
          <MenuHeaderForDetails />
          <Form layout="vertical" className="px-5" form={form} onFinish={onFinish}>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label={t('configuration.Code')} name="code">
                  <TextInput disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={t('configuration.NameEn')} name="nameEn">
                  <TextInput placeholder={t('placeholder.Text')} />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={t('configuration.NameVn')} name="name">
                  <TextInput placeholder={t('placeholder.Text')} />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label={t('configuration.parentMenu')} name="parentId">
                  <SelectBox placeholder={t('placeholder.parentMenu')}>
                    <Option value="">
                      <span>{t('configuration.parentMenu')}</span>
                    </Option>
                    {dataMenu.map((menu) => (
                      <Option label={menu.nameEn} value={menu.id}>
                        {currentLanguage === 'En' ? <span>{menu.nameEn}</span> : <span>{menu.name}</span>}
                      </Option>
                    ))}
                  </SelectBox>
                </FormItem>
              </Col>
              {/* <Col span={8}>
                <FormItem label={t('configuration.Icon')} name="icon">
                  <TextInput placeholder={t('placeholder.Icon')} />
                </FormItem>
              </Col> */}
              <Col span={8}>
                <FormItem label={t('configuration.Url')} name="url">
                  <TextInput placeholder={t('placeholder.Url')} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={t('configuration.menuPosition')} name="menuPosition">
                  <SelectBox
                    placeholder={t('placeholder.menuPosition')}
                    options={[
                      { label: 'Category', value: 0 },
                      { label: 'Child', value: 1 },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label={t('configuration.showOnMenu')} name="showOnMenu">
                  <SelectBox
                    options={[
                      { label: 'Yes', value: 1 },
                      { label: 'No', value: 0 },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={t('configuration.orderNumber')} name="orderNumber">
                  <TextInput placeholder={t('placeholder.orderNumber')} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={t('configuration.menuAction')} name="menuActions">
                  <MultipleSelect placeholder={t('placeholder.menuAction')} options={menuDataAction} disabled />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={t('configuration.description')} name="description">
                  <TextInputArea placeholder={t('placeholder.description')} />
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
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
              <Col span={8}>
                <FormItem label={t('table.column.status')} name="status">
                  <SelectBox
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
                <FormItem label={t('table.column.modifyDate')} name="modifiedDate">
                  <TextInput disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={t('table.column.modifyBy')} name="modifiedBy">
                  <TextInput disabled />
                </FormItem>
              </Col>
            </Row>

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
      )}
    </>
  )
}
