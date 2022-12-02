import { Col, Form, FormInstance, Row } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  FormItem,
  IPaperCreateEditModalProps,
  MultipleSelect,
  PapperTable,
  PappperButton,
  SelectBox,
  TextInput,
  TextInputArea,
} from '~/components/common'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { selectListMenu, selectMenuTrees } from '~/redux/slices'
import { getMenu } from '~/redux/slices/menu/middleware'
import { roleCreateRequest } from '~/redux/slices/role/middleware'
import { menuServices } from '~/services'
import { RouterHelper } from '~/utils'
import { RoleManagementHeaderForDetails } from '../header/for-create'

interface ICreateRoleManagementProps extends IPaperCreateEditModalProps { }

export const CreateRoleManagementContainer = (props: ICreateRoleManagementProps) => {
  const formRef = useRef<FormInstance>(null)
  const checkStrictly = false
  const [menuSelected, setMenuSelected] = useState([])
  const [menuActionsSelected, setMenuActionsSelected] = useState([])
  const [formValues, setFormValues] = useState({
    code: '',
    name: '',
    note: '',
    roleMenus: [],
  })
  const [menuDataAction, setMenuDataAction] = useState<any>([])
  const [selectedKeys, setSelectedKeys] = useState<any>([1001])
  const [valueAction, setValueAction] = useState<any>([{ menuId: 1001, actionValue: [1] }])
  const [loadings, setLoadings] = useState(false)
  const [rowsAll, setRowsAll] = useState<any>()
  const dataMenu = useAppSelector(selectMenuTrees)

  const dataMenuList = useAppSelector(selectListMenu)
  const loading = useAppSelector((state) => state.menu.loading)
  const currentLanguage = useAppSelector((state) => state.app.currentLanguage)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const [onChoose, setOnChoose] = useState<boolean>(true)
  const valueIdRemoveAction = [1003, 1004, 1005, 1007]

  const fetchMenuTrees = useCallback(() => {
    dispatch(getMenu({ forSelect: true }))
  }, [dispatch])

  useEffect(() => {
    if (dataMenu) {
      const newActionValue = dataMenu.find(item => item.id === 1001)
      setValueAction((state) => {
        const actionHome = [{ menuId: 1001, actionValue: newActionValue?.menuActions?.map(el => el.actionId) }]
        return actionHome
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMenu])

  useEffect(() => {
    fetchMenuTrees()
    const getAllMenuDataAction = async () => {
      const res = await menuServices.getAllMenuDataAction()
      const result = (res?.data?.data?.result as Array<any>).map((x) => ({ label: x?.name, value: x?.id }))
      setMenuDataAction(result)
    }
    getAllMenuDataAction().catch((x) => {
      return new Error(t('message.error'))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMenuTrees])

  const handleChangeForm = (changeValues, values) => {
    setFormValues({ ...formValues, ...changeValues })
  }

  const columns: ColumnsType<any> = [
    {
      title: t('roleManagement.chooseFeature'),
      dataIndex: 'name',
      key: 'name',
      render: (value, record, index) => {
        return <>{currentLanguage === 'En' ? <span>{record.nameEn}</span> : <span>{record.name}</span>}</>
      },
    },
    {
      title: t('roleManagement.chooseAction'),
      dataIndex: 'menuActions',
      key: 'menuActions',
      width: '60%',
      render: (text, record, index) => {

        const handleDeSelect = (value, record) => {
          console.log('xóaaaaaaaaaaa', value)
          console.log(record)

          setFormValues((state) => {
            console.log(state)
            if (state.roleMenus.length) {
              const index = state?.roleMenus?.findIndex((x) => x.menuId === record.id)
              const newRoleMenus = [...state.roleMenus]
              const newRoleMenuActions = newRoleMenus[index]?.roleMenuActions.filter((item) => item.actionId !== value)
              state.roleMenus[index].roleMenuActions = newRoleMenuActions
              return state
            } else {
              // const newRoleMenu = {
              //   menuId: record.id,
              //   actionValue: record.menuActions.map(item => item.actionId)
              // }
              // console.log({...state, roleMenus: newRoleMenu})
              return state
            }
          })

          setValueAction((state) => {
            const objIndex = state?.findIndex((obj) => `${obj.menuId}` === `${record.id}`)
            const newActionValue = state[objIndex].actionValue.filter((el) => el !== value)
            state[objIndex].actionValue = newActionValue

            // const actionValueHome = state.filter(item => item.menuId === 1001)
            // console.log(actionValueHome)
            // if(record.id === 1001 && actionValueHome[0]?.actionValue.length === 0){
            //   setOnChoose(false)
            // }
            return [...state]
          })
        }

        const handleChange = (values, option, record) => {
          console.log('thêmmmmmmmm', values)
          console.log(record)
          console.log(valueAction)

          setValueAction((state) => {
            const objIndex = state?.findIndex((obj) => `${obj.menuId}` === `${record.id}`)
            state[objIndex].actionValue = values
            return [...state]
          })

          setMenuActionsSelected((state) => {
            const existMenuAction = state.find((x) => x.menuId === record.id)
            let newState = [...state]
            if (!existMenuAction) {
              newState = [...state, { menuId: record.id, menuActions: values }]
            } else {
              const index = newState.findIndex((x) => x.menuId === record.id)
              if (index !== -1) {
                newState.splice(index, 1)
              }
              newState = [...newState, { menuId: record.id, menuActions: values }]
            }
            const existMenu = menuSelected?.find((x) => x.menuId === record.id)
            const dataAction = newState?.find((x) => x.menuId === record.id)
            const roleMenus = {
              menuId: record.id,
              roleMenuActions: dataAction?.menuActions?.map((x) => ({ actionId: x })),
            }
            if (existMenu) {
              setMenuSelected((state) => {
                let newMenuSelected = [...state]
                const index = newMenuSelected.findIndex((x) => x.menuId === record.id)
                if (index !== -1) {
                  newMenuSelected.splice(index, 1)
                }
                const newItems = { menuId: record.id, dataAction: dataAction }
                newMenuSelected = [...newMenuSelected, { ...newItems }]
                const newState = [...state, { ...newMenuSelected }]
                return [...newState]
              })

              setFormValues((state) => {
                let newRoleMenus = [...state.roleMenus]
                const index = newRoleMenus.findIndex((x) => x.menuId === record.id)
                if (index !== -1) {
                  newRoleMenus.splice(index, 1)
                }
                newRoleMenus = [...newRoleMenus, { ...roleMenus }]
                const newState = { ...state, roleMenus: newRoleMenus }
                return newState
              })
            }
            return newState
          })
        }

        let temps = []
        temps = menuDataAction.filter((item: any) =>
          (record?.menuActions as Array<any>)?.find((t) => t?.actionId === item?.value),
        )

        let defaultSelected = []
        defaultSelected = valueAction.filter((el) => {
          return el.menuId === record.id
        })

        const idRow = rowsAll?.find((ol) => ol.id === record.id)
        const defautHome = () => {
          if (record.id === idRow?.id) {
            return defaultSelected[0]?.actionValue
          } else if (record.id === 1001) {
            if (!onChoose) {
              return []
            } else {
              return [...temps]
            }
          } else {
            return []
          }
        }

        const active = menuSelected?.find((x) => x?.menuId === record.key)
        const isCategory = (dataMenuList as Array<any>)?.find((x) => x?.id === active?.menuId)
        const resultChooseActionDisable = valueIdRemoveAction.indexOf(record?.id) >= 0

        const checkDisableSelected =
          (record.id === 1001 && !onChoose) ||
            (active && isCategory?.menuPosition && isCategory?.id !== 1001) ? false : true

        if (record.children === null && !resultChooseActionDisable) {
          return (
            <MultipleSelect
              value={defautHome()}
              disabled={checkDisableSelected}
              onChange={(val, option) => handleChange(val, option, record)}
              options={temps ?? []}
              onDeselect={(value) => handleDeSelect(value, record)}
            />
          )
        }
        return true
      },
    },
  ]

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const uniqueArray = newSelectedRowKeys.filter(function (item, pos, self) {
      return self.indexOf(item) === pos
    })
    setSelectedKeys([...uniqueArray])
  }
  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.id === 1001,
    }),
    selectedRowKeys: selectedKeys || [1001],
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selectedRows)
      setRowsAll(selectedRows)

      setFormValues((state) => {
        console.log(state)
        // const dataFilter = [1002, 1008, 1013, 1019]
        const newRoleMenus = selectedRows.map((item) => {
          if (item.id === 1002 || item.id === 1008 || item.id === 1013 || item.id === 1019) {
            return { menuId: item.id }
          }
          return {
            menuId: item.id,
            roleMenuActions: item.menuActions.map((el) => {
              return { actionId: el.actionId }
            }),
          }
        })
        // const results = newRoleMenus.filter(({ menuId: id1 }) => !dataFilter.some(({ menuId: id2 }) => id2 === id1))
        console.log({ ...state, roleMenus: [...newRoleMenus] })
        return { ...state, roleMenus: [...newRoleMenus] }
      })

      setValueAction((state) => {
        const newValueAction = selectedRows.map((item) => {
          return { menuId: item.id, actionValue: item.menuActions.map((el) => el.actionId) }
        })
        return [...newValueAction]
      })

      setMenuSelected((state) => {
        const newMenuSelected = selectedRows.map((item) => {
          return { menuId: item.id, dataAction: null }
        })
        if (newMenuSelected.length) {
          setOnChoose(true)
        } else {
          setOnChoose(false)
        }
        return [...newMenuSelected]
      })
    },
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      console.log(record)
      console.log(selectedRows)
      console.log(selected)

      setRowsAll(selectedRows)
      const recordChildren = []
      if (record.children && selected === true) {
        for (const item of record.children) {
          recordChildren.push({ menuId: item.id, dataAction: null })
        }
      }

      if (selected) {
        const existMenu = menuSelected?.find((x) => x.menuId === record.id)
        const dataAction = menuActionsSelected?.find((x) => x.menuId === record.id)

        if (!existMenu) {
          console.log('select')
          if (record.children) {
            console.log('record children')

            console.log(formValues)
            setFormValues((state) => {
              if (state.roleMenus.length) {
                const addRole = record.children.map((item) => {
                  return {
                    menuId: item.id,
                    roleMenuActions: item.menuActions.map((el) => {
                      return { actionId: el.actionId }
                    }),
                  }
                })
                const roleRecord = {
                  menuId: record.id,
                  // roleMenuActions: record.menuActions.map(el => {return {actionId: el.actionId}})
                }
                state.roleMenus = [...state.roleMenus, ...addRole, { ...roleRecord }]
                const newRoleMenus = state.roleMenus.filter(
                  (v, i, a) => a.findIndex((v2) => v2.menuId === v.menuId) === i,
                )
                // console.log({...state, roleMenus: [...state.roleMenus, ...addRole, {...roleRecord}]})

                console.log({ ...state, roleMenus: [...newRoleMenus] })
                return { ...state, roleMenus: [...newRoleMenus] }
              } else {
                const newRoleMenus = selectedRows.map((item) => {
                  if (item.id === 1002 || item.id === 1008 || item.id === 1013 || item.id === 1019) {
                    return { menuId: item.id }
                  }
                  return {
                    menuId: item.id,
                    roleMenuActions: item.menuActions.map((el) => {
                      return { actionId: el.actionId }
                    }),
                  }
                })
                // newRoleMenus.splice(newRoleMenus.findIndex((item) => item.menuId === record.id),1,)
                console.log({ ...state, roleMenus: newRoleMenus })
                return { ...state, roleMenus: newRoleMenus }
              }
            })
            setValueAction((state) => {
              // const result = selectedRows.map((el) => {
              //   return { menuId: el.id, actionValue: el?.menuActions?.map((el) => el.actionId) }
              // })
              const addState = record.children.map((item) => {
                return { menuId: item.id, actionValue: item.menuActions.map((el) => el.actionId) }
              })
              return [...state, ...addState]
            })
          } else {
            console.log('record null')
            // console.log(formValues);

            setFormValues((state) => {
              if (state.roleMenus.length) {
                const addRole = {
                  menuId: record.id,
                  roleMenuActions: record.menuActions.map((el) => {
                    return { actionId: el.actionId }
                  }),
                }
                if (record.parentId) {
                  const roleRecord = { menuId: record.parentId }
                  state.roleMenus = [...state.roleMenus, { ...roleRecord }]
                  state.roleMenus = state.roleMenus.filter((v, i, a) => a.findIndex(v2 => (v2.menuId === v.menuId)) === i)
                }
                console.log({ ...state, roleMenus: [...state.roleMenus, { ...addRole }] })
                return { ...state, roleMenus: [...state.roleMenus, { ...addRole }] }
              } else {
                const newRoleMenus = selectedRows.map((item) => {
                  return {
                    menuId: item.id,
                    roleMenuActions: item.menuActions.map((el) => {
                      return { actionId: el.actionId }
                    }),
                  }
                })
                // console.log({ ...state, roleMenus: newRoleMenus })

                if (record.parentId) {
                  const roleRecord = {
                    menuId: record.parentId,
                    // roleMenuActions: [{actionId: 1}]
                  }
                  console.log({ ...state, roleMenus: [...newRoleMenus, { ...roleRecord }] })
                  return { ...state, roleMenus: [...newRoleMenus, { ...roleRecord }] }
                }
                console.log({ ...state, roleMenus: [...newRoleMenus] })
                return { ...state, roleMenus: [...newRoleMenus] }
              }
            })

            setValueAction((state) => {
              if (state) {
                return [...state, { menuId: record.id, actionValue: record?.menuActions?.map((el) => el.actionId) }]
              }
              return [{ menuId: record.id, actionValue: record?.menuActions?.map((el) => el.actionId) }]
            })

          }

          setMenuSelected((state) => {
            const newMenuSelected = { menuId: record.id, dataAction: dataAction }
            const newState = [...state, { ...newMenuSelected }]
            return [...newState, ...recordChildren]
          })
        } else {
          console.log('cccccccccc')

          setMenuSelected((state) => {
            const filterChildren = recordChildren.filter(
              ({ menuId: id1 }) => !state.some(({ menuId: id2 }) => id2 === id1),
            )
            return [...state, ...filterChildren]
          })
        }
      } else {
        console.log('unselect')
        if (record.children) {

          setFormValues((state) => {
            const valueRolesMenus = [...record.children]
            const results = state.roleMenus.filter(
              ({ menuId: id1 }) => !valueRolesMenus.some(({ id: id2 }) => id2 === id1),
            )
            const newRole = results.filter((item) => {
              return item.menuId !== record.id
            })
            console.log({ ...state, roleMenus: newRole })
            return { ...state, roleMenus: newRole }
          })
        } else {

          setFormValues((state) => {
            const index = state?.roleMenus?.findIndex((x) => x.menuId === record.id)
            // const indexRecord = state?.roleMenus?.findIndex((x) => x.menuId === record.parentId)
            if (index !== -1) {
              state.roleMenus.splice(index, 1)
              const idParent = record.parentId
              const parentData = selectedRows.filter(item => item.parentId === idParent)
              if (parentData.length === 0) {
                const idxParent = state.roleMenus.findIndex(el => el.menuId === idParent)
                state.roleMenus.splice(idxParent, 1)
              }
            }
            console.log(state)
            return state
          })
        }
        setMenuSelected((state) => {
          const newMenuSelected = selectedRows.map((item) => {
            return { menuId: item.id, dataAction: null }
          })
          if (record.id === 1001) {
            setOnChoose(false)
          }
          return [...newMenuSelected]
        })
      }
    },
  }
  const handleOnSubmit = () => {
    console.log(formValues)
    const newRoleMenus = formValues.roleMenus.map(el => {
      const idx = valueIdRemoveAction.indexOf(el?.menuId)
      if (idx >= 0) {
        return { menuId: el.menuId }
      }
      return el
    })
    formValues.roleMenus = newRoleMenus

    if (formValues.roleMenus.length) {
      formRef.current.validateFields().then((values) => {
        setLoadings(true)
        dispatch(
          roleCreateRequest({
            data: formValues,
            onSuccess: ({ data, message }) => {
              if (!data) {
                toast.warning(message)
              } else {
                toast.success(message, { autoClose: 1000 })
                setTimeout(() => {
                  setLoadings(false)
                  navigate({
                    pathname: RouterHelper.administrator_role_management,
                  })
                }, 1000)
              }
            },
          }),
        )
      })
    } else {
      const newRoleMenus = {
        menuId: 1001,
        roleMenuActions: [{ actionId: 1 }, { actionId: 3 }],
      }
      console.log({ ...formValues, roleMenus: [newRoleMenus] })
      formRef.current.validateFields().then((values) => {
        setLoadings(true)
        dispatch(
          roleCreateRequest({
            data: { ...formValues, roleMenus: [newRoleMenus] },
            onSuccess: ({ data, message }) => {
              if (!data) {
                toast.warning(message)
              } else {
                toast.success(t('message.createSuccess'), { autoClose: 500 })
                setLoadings(false)
                navigate({
                  pathname: RouterHelper.administrator_role_management,
                })
              }
            },
          }),
        )
      })
    }
  }

  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.administrator_role_management,
    })
  }
  return (
    <div>
      <RoleManagementHeaderForDetails />
      <Form
        layout="vertical"
        className="px-5"
        ref={formRef}
        initialValues={formValues}
        onValuesChange={handleChangeForm}
      >
        <Row>
          <Col span={24}>
            <FormItem
              label={t('roleManagement.code')}
              name={'code'}
              required
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <TextInput placeholder={t('placeholder.code')} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              label={t('roleManagement.Tittle')}
              name={'name'}
              required
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <TextInput placeholder={t('placeholder.title')} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={t('roleManagement.notes')} name={'note'}>
              <TextInputArea placeholder={t('placeholder.notes')} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              label={t('table.column.status')}
              name="status"
              required
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <SelectBox
                placeholder={t('placeholder.Active/Inactive')}
                options={[
                  { label: t('select.active'), value: 1 },
                  { label: t('select.inActive'), value: 0 },
                ]}
              />
            </FormItem>
          </Col>
        </Row>
        <h2>{t('roleManagement.chooseMenu')}</h2>
        {dataMenu && menuDataAction.length > 0 ? (
          <PapperTable
            rowSelection={{ ...rowSelection, checkStrictly }}
            columns={columns}
            dataSource={dataMenu}
            loading={loading}
          />
        ) : null}
        <Row justify="center">
          <Col>
            <PappperButton variant="cancel" rounded="large" className="mr-4" onClick={handleCancel}>
              {t('button.cancel')}
            </PappperButton>
            <PappperButton onClick={handleOnSubmit} variant="primary" rounded="large" loading={loadings}>
              {t('button.save')}
            </PappperButton>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
