import { Form } from 'antd'
import { useMemo, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IPaperCreateEditModalProps, PaperCreateEditModal, PapperTabs } from '~/components/common'
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
import { SupperAdminCreateLayer01 } from './create-layer-01'
import { SupperAdminCreateLayer02 } from './create-layer-02'

const _tabs = [
  {
    key: EOrganizationListLayer.layer_01,
    label: 'Layer 1',
  },
  {
    key: EOrganizationListLayer.layer_02,
    label: 'Layer 2',
  },
]

interface ICreateSupperAdminOrgModalProps extends IPaperCreateEditModalProps {}

export const CreateSupperAdminOrganizationModal = (props: ICreateSupperAdminOrgModalProps) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const [searchParams] = useSearchParams()
  const { t } = useAppTranslation()
  const layerClicked = searchParams.get('layer')?.split('-')[0]

  const handleLayerChange = (key: TOrganizationListLayer) => {
    setLayer(key)
    form.resetFields(['name', 'code', 'parentId', 'userid', 'fatherId'])
  }
  const tabs = useMemo(() => {
    return _tabs.map((tab) => {
      if (isEmpty(layerClicked)) {
        return { ...tab, disabled: false }
      }
      if (tab.key === layerClicked) {
        return { ...tab, disabled: false }
      }
      return { ...tab, disabled: true }
    })
  }, [layerClicked])

  const [layer, setLayer] = useState<TOrganizationListLayer>(() => {
    if (isEmpty(layerClicked)) {
      return 'layer_01'
    }
    return layerClicked as TOrganizationListLayer
  })

  const [loading, setLoading] = useState<boolean>(false)
  const renderModalContent = (form) => {
    switch (layer) {
      case EOrganizationListLayer.layer_01:
        return <SupperAdminCreateLayer01 formRef={form} />
      case EOrganizationListLayer.layer_02:
        return <SupperAdminCreateLayer02 formRef={form} />
      default:
        return <SupperAdminCreateLayer01 formRef={form} />
    }
  }

  const handleCreateSupperAdmin = () => {
    form.validateFields().then((values) => {
      const { parentId } = values
      const _parentId: DepartmentTree = !isEmpty(parentId) && JSON.parse(parentId)
      const expanedParams = `${_parentId ? _parentId.key : ''}`
      // return
      const { code, name } = values
      setLoading(true)
      departmantServices
        .create({ code, name, departmentType: '1', UserIds: values.userid, parentId: _parentId?.id || 0, status: 'A' })
        .then((res) => {
          if (isEmpty(res.data.data)) {
            toast.warning(res.data.message, {
              autoClose: 1000,
            })
            setLoading(false)
            return
          } else {
            toast.success(t('message.updateSuccess'), {
              autoClose: 1000,
            })
            setTimeout(() => {
              navigate({
                pathname: RouterHelper.administrator_organization_management,
                search: createSearchParams({
                  type: currentParams['type'] || EOrganizationListType.supper_admin,
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
        type: EOrganizationListType.supper_admin,
      }).toString(),
    })
  }

  return (
    <PaperCreateEditModal
      titleText={t('organizationManagement.CreatenewgroupofSUPPERADMIN')}
      {...props}
      onOk={handleCreateSupperAdmin}
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
