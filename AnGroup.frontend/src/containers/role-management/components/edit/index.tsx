import { Col, Form, Row, Spin } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { RoleManagementHeaderForDetails } from '../header/for-edit'
import { getMenu } from '~/redux/slices/menu/middleware'
import { selectListMenu, selectMenuTrees } from '~/redux/slices'
import { roleServices } from '~/services/role'
import { toast } from 'react-toastify'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { menuServices } from '~/services'
import { useAppTranslation } from '~/hooks/useAppTranslation'
interface RecordDataType {
  key: number
  feature: string
  action?: number[]
  father?: string
  children?: RecordDataType[]
  parentId?: number
  nameEn: string
  name: string
  menuActions: any
  id: number
}

interface IEditRoleManagementProps extends IPaperCreateEditModalProps {}

export const EditRoleManagementContainer = (props: IEditRoleManagementProps) => {
  const checkStrictly = false
  const [selectedKeys, setSelectedKeys] = useState([])
  const [defaultSelectedAction, setDefaultSelectedAction] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [menuDataAction, setMenuDataAction] = useState<any>([])
  const [dataRoleDetails, setDataRoleDetails] = useState<any>(null)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { id } = useParams()
  const { t } = useAppTranslation()
  const menuList = useAppSelector(selectMenuTrees)
  const dataMenuList = useAppSelector(selectListMenu)
  const currentLanguage = useAppSelector((state) => state.app.currentLanguage)
  const navigate = useNavigate()
  const [loadings, setLoadings] = useState(false)
  // const [cancelReCall, setCancelReCall] = useState(false)
  const valueIdRemoveAction = [1003, 1004, 1005, 1007]

  const getDataById = useCallback(
    async () => {
      // isReCall=true
      await dispatch(getMenu({ forSelect: true }))
      // setLoading(true)
      // setCancelReCall(isReCall)
      const response = await roleServices.getById(id)

      const temp = response?.data?.data?.roleMenus as Array<any>
      temp?.map((x) => {
        x.selected = true
        if (Array.isArray(x.roleMenuActions) && x.roleMenuActions?.length) {
          x.roleMenuActions?.map((t) => {
            t.selected = true
            return t
          })
        }
        return x
      })
      setDataRoleDetails(response?.data?.data)
      setLoading(false)
      // setCancelReCall(false)
    },

    [id, dispatch, setDataRoleDetails, setLoading],
  )

  useEffect(() => {
    form.setFieldsValue({
      name: dataRoleDetails?.name,
      code: dataRoleDetails?.code,
      status: dataRoleDetails?.status === true ? 1 : 0,
      note: dataRoleDetails?.note,
      createdDate: formatTimeInTable(dataRoleDetails?.createdDate),
      createdBy: dataRoleDetails?.createdBy,
      modifiedDate: formatTimeInTable(dataRoleDetails?.modifiedDate),
      modifiedBy: dataRoleDetails?.modifiedBy,
    })
  }, [dataRoleDetails, form])

  useEffect(() => {
    getDataById()
    // getDataById(false)
    setLoading(true)
    const getAllMenuDataAction = async () => {
      const res = await menuServices.getAllMenuDataAction()
      const result = (res?.data?.data?.result as Array<any>).map((x) => ({ label: x?.name, value: x?.id }))
      setMenuDataAction(result)
    }
    getAllMenuDataAction().catch((x) => {
      return new Error(t('message.error'))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDataById])

  useEffect(() => {
    if (selectedKeys.length === 0) {
      setSelectedKeys((state) => {
        if (
          dataRoleDetails?.roleMenus &&
          Array.isArray(dataRoleDetails?.roleMenus) &&
          dataRoleDetails?.roleMenus?.length > 0
        ) {
          const newState = dataRoleDetails?.roleMenus?.filter((t) => t.selected)?.map((x) => x.menuId)
          const myFinalArray = Array.from(new Set(newState.concat(state)))
          const dataKeyDeleted = [1002, 1008, 1013, 1019]
          const filteredArray = myFinalArray.filter((id1) => !dataKeyDeleted.some((id2) => id2 === id1))
          return [...filteredArray]
        }
        return state
      })
      setDefaultSelectedAction((state) => {
        if (
          dataRoleDetails?.roleMenus &&
          Array.isArray(dataRoleDetails?.roleMenus) &&
          dataRoleDetails?.roleMenus?.length > 0
        ) {
          let newState = []
          dataRoleDetails?.roleMenus?.forEach((item) => {
            const newItem = { menuId: item.menuId, roleMenuActions: item?.roleMenuActions?.map((x) => x.actionId) }
            newState = [...newState, { ...newItem }]
          })
          return newState
        }
        return state
      })
    }
  }, [dataRoleDetails, selectedKeys.length])

  const changeInputValue = (e) => {
    const code = form.getFieldValue('code')
    const name = form.getFieldValue('name')
    const note = form.getFieldValue('note')
    const status = form.getFieldValue('status')
    console.log(status)
    //1-active;0-inactive

    setDataRoleDetails((state) => {
      return { ...state, code, name, note, status: status === 1 ? true : false }
    })
  }

  const handleSave = async (values: any) => {
    setLoadings(true)
    const { name, code, status, note } = values
    let data = { ...dataRoleDetails }
    const newRoleMenus = (data?.roleMenus as Array<any>)?.filter((x) => x?.selected)

    newRoleMenus?.forEach((t) => {
      delete t.selected
      if (Array.isArray(t.roleMenuActions) && t?.roleMenuActions?.length) {
        const temp = (t.roleMenuActions as Array<any>)?.filter((x) => x?.selected)
        temp?.forEach((z) => {
          delete z.selected
        })
        t.roleMenuActions = temp
      }
    })

    const roleMenusRemoveActions = newRoleMenus.map((el) => {
      const idx = valueIdRemoveAction.indexOf(el?.menuId)
      if (idx >= 0) {
        return { ...el, roleMenuActions: [] }
      }
      return el
    })

    data = { ...data, roleMenus: roleMenusRemoveActions, name, code, note, status }
    const dataSubmit = {
      id,
      ...data,
    }

    console.log(dataSubmit)

    const res = await roleServices.update(dataSubmit)

    if (res.kind === 'ok') {
      getDataById()
      setTimeout(() => {
        setLoadings(false)
        toast.success(res.data.message)
      }, 2000)
    } else {
      setLoadings(false)
      toast.error(t('message.error'))
    }
  }

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
    selectedRowKeys: selectedKeys || [],
    onChange: onSelectChange,
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        setDataRoleDetails((state) => {
          for (const el of selectedRows) {
            for (const [idx, ol] of state.roleMenus.entries()) {
              if (ol.menuId === el.id) {
                state.roleMenus[idx].selected = true
                state.roleMenus[idx].roleMenuActions = ol.roleMenuActions.map((item) => {
                  return { ...item, selected: true }
                })

                const differenceRoleAction = el.menuActions.filter(
                  ({ actionId: id1 }) => !ol.roleMenuActions.some(({ actionId: id2 }) => id2 === id1),
                )
                if (ol.menuId !== 1002 && ol.menuId !== 1008 && ol.menuId !== 1013 && ol.menuId !== 1019) {
                  const plusRoleAction = differenceRoleAction?.map((item) => {
                    return { actionId: item.actionId, selected: true }
                  })
                  state.roleMenus[idx].roleMenuActions = [...state.roleMenus[idx].roleMenuActions, ...plusRoleAction]
                }
              }
            }
          }

          const newDataRoleMenus = selectedRows.filter(
            ({ id: id1 }) => !state.roleMenus.some(({ menuId: id2 }) => id2 === id1),
          )

          if (newDataRoleMenus.length > 0) {
            const addRoleMenus = newDataRoleMenus.map((item) => {
              return {
                menuId: item.id,
                roleId: state.id,
                selected: true,
                roleMenuActions: item.menuActions.map((el) => {
                  return { actionId: el.actionId, selected: true }
                }),
              }
            })
            state.roleMenus = [...state.roleMenus, ...addRoleMenus]
          }
          return state
        })
      } else {
        setDataRoleDetails((state) => {
          for (const idRecords of changeRows) {
            const idxs = state.roleMenus.findIndex((el) => el.menuId === idRecords.id)
            state.roleMenus[idxs].selected = false
          }
          return state
        })
      }

      setDefaultSelectedAction((state) => {
        const newDataAction = selectedRows.map((item) => {
          return { menuId: item.id, roleMenuActions: item.menuActions.map((el) => el.actionId) }
        })
        return [...newDataAction]
      })
    },
    onSelect: (record, selected, selectedRows) => {
      const finalArray = selectedRows.map(({ id }) => id)

      if (selected) {
        // console.log('select true')
        setSelectedKeys((state) => {
          const myFinalArray = Array.from(new Set(finalArray.concat(state)))
          return [...myFinalArray]
        })

        if (record.children) {
          // console.log('record children')
          setDefaultSelectedAction((state) => {
            let newStateRecordChildren = []
            record?.children?.forEach((item) => {
              const newItem = { menuId: item.id, roleMenuActions: item?.menuActions?.map((x) => x.actionId) }
              newStateRecordChildren = [...newStateRecordChildren, { ...newItem }]
            })
            if (state) {
              return [...state, ...newStateRecordChildren]
            } else {
              return [...newStateRecordChildren]
            }
          })

          setDataRoleDetails((state) => {
            let newState = { ...state }
            const newRoleMenus = newState.roleMenus
            const existMenu = newRoleMenus.find((x) => x?.menuId === record.key)

            if (existMenu !== undefined) {
              // console.log('undefined')
              existMenu.selected = true

              for (const idRecords of record.children) {
                const idxs = newState.roleMenus.findIndex((el) => el.menuId === idRecords.id)
                if (newState.roleMenus[idxs]) {
                  newState.roleMenus[idxs].selected = true
                  newState.roleMenus[idxs].roleMenuActions = newState.roleMenus[idxs].roleMenuActions.map((item) => {
                    return { ...item, selected: true }
                  })
                }
              }
              const newDataRoleAdd = selectedRows.filter(
                ({ id: id1 }) => !newState.roleMenus.some(({ menuId: id2 }) => id2 === id1),
              )

              if (newDataRoleAdd.length) {
                const roleAdd = newDataRoleAdd.map((item) => {
                  return {
                    roleId: state.id,
                    menuId: item.id,
                    selected: true,
                    roleMenuActions: item.menuActions.map((item) => {
                      return { actionId: item.actionId, selected: true }
                    }),
                  }
                })
                newState = { ...newState, roleMenus: [...newState.roleMenus, ...roleAdd] }
              }
            } else {
              const filterMenu = record.children.filter(
                ({ id: id1 }) => !newRoleMenus.some(({ menuId: id2 }) => id2 === id1),
              )

              const roleMenusNew = filterMenu.map((el) => {
                const menuAction = el.menuActions.map((ol) => {
                  return { actionId: ol.actionId, selected: true }
                })
                return { menuId: el.key, roleId: state.id, roleMenuActions: menuAction, selected: true }
              })
              const roleRecord = {
                menuId: record.id,
                // roleId: state.id,
                selected: true,
              }
              newState = { ...newState, roleMenus: [...newRoleMenus, ...roleMenusNew, { ...roleRecord }] }
            }

            return newState
          })
        } else {
          // console.log('record null')
          setDataRoleDetails((state) => {
            const idRecord = record.id
            const idx = state.roleMenus.findIndex((item) => item.menuId === idRecord)
            const idxRecord = state.roleMenus.findIndex((item) => item.menuId === record.parentId)
            if (idx >= 0) {
              state.roleMenus[idx].selected = true
              state.roleMenus[idx].roleMenuActions = state.roleMenus[idx].roleMenuActions.map((item) => {
                return { ...item, selected: true }
              })
              if (idxRecord >= 0) {
                state.roleMenus[idxRecord].selected = true
              }
              return state
            } else {
              const newRoleMenus = {
                menuId: record.id,
                roleId: state.id,
                selected: true,
                roleMenuActions: record.menuActions.map((el) => {
                  return { actionId: el.actionId, selected: true }
                }),
              }
              const roleRecord = {
                menuId: record.parentId,
                // roleId: state.id,
                selected: true,
              }
              if (record.parentId) {
                state.roleMenus = [...state.roleMenus, { ...newRoleMenus }, { ...roleRecord }]
              } else {
                state.roleMenus = [...state.roleMenus, { ...newRoleMenus }]
              }

              state.roleMenus = state.roleMenus.filter((v, i, a) => a.findIndex((v2) => v2.menuId === v.menuId) === i)
              return state
            }
          })

          setDefaultSelectedAction((state) => {
            let newStateActions = []
            const newItem = { menuId: record.id, roleMenuActions: record?.menuActions?.map((x) => x.actionId) }
            newStateActions = [...newStateActions, { ...newItem }]
            if (state) {
              return [...state, ...newStateActions]
            } else {
              return [...newStateActions]
            }
          })
        }
      } else {
        // console.log('select false')
        setSelectedKeys((state) => {
          const duplicates = state.filter(function (val) {
            return finalArray.indexOf(val) !== -1
          })
          return [...duplicates]
        })

        setDataRoleDetails((state) => {
          const idRecord = record.id
          const idx = state.roleMenus.findIndex((item) => item.menuId === idRecord)

          const idParent = record.parentId
          if (idParent) {
            const parentData = selectedRows.filter((item) => item.parentId === idParent)
            if (parentData.length === 0) {
              const idxParent = state.roleMenus.findIndex((el) => el.menuId === idParent)
              state.roleMenus[idxParent].selected = false
            }
          }

          if (record.children) {
            for (const idRecords of record.children) {
              const idxs = state.roleMenus.findIndex((el) => el.menuId === idRecords.id)
              state.roleMenus[idxs].selected = false
            }
            if (idx >= 0) {
              state.roleMenus[idx].selected = false
            }
            return state
          } else {
            if (idx >= 0) {
              state.roleMenus[idx].selected = false
            }
            return state
          }
        })

        if (record.children) {
          // console.log('record.children off')
          setDefaultSelectedAction((state) => {
            const findAction = state.filter((item) => {
              return selectedRows.find((el) => el.id === item.menuId)
            })
            return [...findAction]
          })
        } else {
          setDefaultSelectedAction((state) => {
            const arr = state.filter((item) => item?.menuId !== record?.id)
            return [...arr]
          })
        }
      }
    },
  }

  const getColumns = (): ColumnsType<RecordDataType> => {
    return [
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
          const handleClick = (value, record) => {
            console.log('click xóa')

            setDataRoleDetails((state) => {
              const idDelete = record.id
              const idx = state.roleMenus.findIndex((item) => item.menuId === idDelete)
              const idxItemAction = state.roleMenus[idx].roleMenuActions.findIndex((el) => el.actionId === value)
              state.roleMenus[idx].roleMenuActions[idxItemAction].selected = false
              return state
            })

            setDefaultSelectedAction((state) => {
              const filterState = state.filter((el) => el.menuId === record.id)
              const changeState = filterState[0]?.roleMenuActions.filter((item) => item !== value)
              const objIndex = state.findIndex((obj) => `${obj.menuId}` === `${record.id}`)
              state[objIndex].roleMenuActions = changeState
              return [...state]
            })
          }

          const handleSelect = (value, record) => {
            setDataRoleDetails((state) => {
              const idDelete = record.id
              const idx = state.roleMenus.findIndex((item) => item.menuId === idDelete)
              const idxItemAction = state.roleMenus[idx].roleMenuActions.findIndex((el) => el.actionId === value)

              if (idxItemAction >= 0) {
                state.roleMenus[idx].roleMenuActions[idxItemAction].selected = true
              } else {
                state.roleMenus[idx].roleMenuActions = [
                  ...state.roleMenus[idx].roleMenuActions,
                  { actionId: value, selected: true },
                ]

                const ids = state.roleMenus[idx].roleMenuActions.map((o) => o.actionId)
                const filtered = state.roleMenus[idx].roleMenuActions.filter(
                  ({ actionId }, index) => !ids.includes(actionId, index + 1),
                )
                state.roleMenus[idx].roleMenuActions = [...filtered]
              }

              return state
            })
          }

          const handleChange = (values, option, record) => {
            setDefaultSelectedAction((state) => {
              const objIndex = state.findIndex((obj) => `${obj.menuId}` === `${record.id}`)
              state[objIndex].roleMenuActions = values
              return [...state]
            })
          }

          let defaultSelected = []
          if (
            Array.isArray(defaultSelectedAction) &&
            defaultSelectedAction?.length > 0 &&
            defaultSelectedAction?.find((x) => x.menuId === record.key) !== undefined
          ) {
            const temp = defaultSelectedAction?.find((x) => x.menuId === record.key)
            if (temp) {
              defaultSelected = temp?.roleMenuActions?.sort()
            }
          }

          const temps = menuDataAction.filter((item: any) =>
            (record?.menuActions as Array<any>)?.find((t) => t?.actionId === item?.value),
          )

          const isCategory = (dataMenuList as Array<any>)?.find((x) => x?.id === record.key)
          const checkDisableSelected =
            record.key !== 1001 && selectedKeys?.find((x) => x === record.key) && isCategory?.menuPosition
              ? false
              : true
          const resultChooseActionDisable = valueIdRemoveAction.indexOf(record?.id) >= 0

          if (record.children === null && !resultChooseActionDisable) {
            return (
              <MultipleSelect
                value={defaultSelected || []}
                disabled={checkDisableSelected}
                onChange={(val, option) => handleChange(val, option, record)}
                options={temps ?? []}
                onDeselect={(value) => handleClick(value, record)}
                onSelect={(value) => handleSelect(value, record)}
              />
            )
          }
          return true
        },
      },
    ]
  }
  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.administrator_role_management,
    })
  }
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <Spin size="large" tip="Loading..."></Spin>
        </div>
      ) : (
        <div>
          <RoleManagementHeaderForDetails />
          <Form layout="vertical" className="px-5" form={form} onFinish={handleSave}>
            <Row>
              <Col span={24}>
                <FormItem
                  label={t('roleManagement.code')}
                  name="code"
                  required
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <TextInput placeholder={t('placeholder.code')} onChange={(value) => changeInputValue(value)} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  label={t('roleManagement.Tittle')}
                  name="name"
                  required
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <TextInput placeholder={t('placeholder.title')} onChange={(value) => changeInputValue(value)} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={t('roleManagement.notes')} name="note">
                  <TextInputArea placeholder={t('placeholder.notes')} onChange={(value) => changeInputValue(value)} />
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
                <FormItem
                  label={t('table.column.status')}
                  name="status"
                  required
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <SelectBox
                    onChange={(value) => changeInputValue(value)}
                    options={[
                      { label: t('select.active'), value: 1 },
                      { label: t('select.inActive'), value: 0 },
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
            {/* {dataRoleDetails != null && defaultSelectedAction && (
              <PapperTable rowSelection={{ ...rowSelection }} columns={getColumns()} dataSource={menuList} />
            )} */}
            <h2>{t('roleManagement.chooseMenu')}</h2>
            <PapperTable
              rowSelection={{ ...rowSelection, checkStrictly }}
              columns={getColumns()}
              dataSource={menuList}
            />

            <Row justify="center">
              <Col>
                <PappperButton variant="cancel" rounded="large" className="mr-4" onClick={handleCancel}>
                  {t('button.cancel')}
                </PappperButton>
                <PappperButton variant="primary" rounded="large" type="primary" htmlType="submit" loading={loadings}>
                  {t('button.save')}
                </PappperButton>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </div>
  )
}
