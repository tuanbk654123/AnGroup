import { Form } from 'antd'
import { useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IPaperCreateEditModalProps, PaperCreateEditModal, PapperTabs, TabPaneItem } from '~/components/common'
// import { message } from '~/constants/message'
import {
  EOrganizationListLayer,
  EOrganizationListType,
  TOrganizationListLayer,
} from '~/containers/organization-management/index.types'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { departmantServices } from '~/services'
import { DepartmentTree } from '~/types'
import { RouterHelper } from '~/utils'
import { isEmpty } from '~/utils/helper'
import { CreateLayer01 } from './create-layer-01'
import { CreateLayer02 } from './create-layer-02'
import { CreateLayer03 } from './create-layer-03'

interface ICreateHeadOfficeOrgModalProps extends IPaperCreateEditModalProps { }

const _tabs: TabPaneItem[] = [
  {
    key: EOrganizationListLayer.layer_01,
    label: 'Layer 1',
  },
  {
    key: EOrganizationListLayer.layer_02,
    label: 'Layer 2',
  },
  {
    key: EOrganizationListLayer.layer_03,
    label: 'Layer 3',
  },
]

export const CreateHeadOfficeOrganizationModal = (props: ICreateHeadOfficeOrgModalProps) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const [searchParams] = useSearchParams()
  const { t } = useAppTranslation()
  const layerClicked = searchParams.get('layer')?.split('-')[0]

  const [tabs] = useState<TabPaneItem[]>(() => {
    return _tabs.map((tab) => {
      if (isEmpty(layerClicked)) {
        return { ...tab, disabled: false }
      }
      if (tab.key === layerClicked) {
        return { ...tab, disabled: false }
      }
      return { ...tab, disabled: true }
    })
  })

  const [layer, setLayer] = useState<TOrganizationListLayer>(() => {
    if (isEmpty(layerClicked)) {
      return 'layer_01'
    }
    return layerClicked as TOrganizationListLayer
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handleLayerChange = (key: TOrganizationListLayer) => {
    setLayer(key)
    form.resetFields(['name', 'code', 'parentId', 'userid', 'fatherId'])
  }

  const renderModalContent = (form) => {
    switch (layer) {
      case EOrganizationListLayer.layer_01:
        return <CreateLayer01 formRef={form} />
      case EOrganizationListLayer.layer_02:
        return <CreateLayer02 formRef={form} />
      case EOrganizationListLayer.layer_03:
        return <CreateLayer03 formRef={form} />
      default:
        return <CreateLayer01 formRef={form} />
    }
  }

  const handleCreateDapartment = () => {
    form.validateFields().then((values) => {
      const { parentId, fatherId } = values
      const _parentId: DepartmentTree = !isEmpty(parentId) && JSON.parse(parentId)
      const _fatherId: DepartmentTree = !isEmpty(fatherId) && JSON.parse(fatherId)
      const expanedParams = `${!_fatherId ? '' : _fatherId.key}-${!_parentId ? '' : _parentId.key}`

      const { code, name } = values

      setLoading(true)
      // return
      departmantServices
        .create({ code, name, departmentType: '0', UserIds: values.userid, parentId: _parentId?.id || 0, status: 'A' })
        .then((res) => {
          if (isEmpty(res.data.data)) {
            toast.warning(res.data.message, {
              autoClose: 1000,
            })
            setLoading(false)
            return
          } else {
            toast.success(res.data.message, {
              autoClose: 1000,
            })
            setTimeout(() => {
              navigate({
                pathname: RouterHelper.administrator_organization_management,
                search: createSearchParams({
                  type: currentParams['type'] || EOrganizationListType.head_office,
                  expaned: expanedParams,
                }).toString(),
              })
            }, 1500)
            setLoading(false)
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(t('message.error'), { autoClose: 1000 })
        })
    })
  }

  const handleCancle = () => {
    navigate({
      pathname: RouterHelper.administrator_organization_management,
      search: createSearchParams({
        type: EOrganizationListType.head_office,
      }).toString(),
    })
  }

  return (
    <PaperCreateEditModal
      titleText={t('organizationManagement.CreatenewgroupofHeadOffice')}
      {...props}
      onOk={handleCreateDapartment}
      onCancel={handleCancle}
      btnOkLoading={loading}
    >
      <div className="mb-6">
        <PapperTabs centered tabs={tabs} defaultActiveKey={layerClicked ?? tabs[0].key} onChange={handleLayerChange} />
      </div>
      {renderModalContent(form)}
    </PaperCreateEditModal>
  )
}
