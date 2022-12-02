import { useCallback, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { useCurrentParams } from '~/hooks'
import { useAppDispatch } from '~/redux/hooks'
import { fetchUsers } from '~/redux/slices/user/middleware'
import { RouterHelper } from '~/utils'
import { EOrganizationListType } from '../../index.types'
import { CreateHeadOfficeOrganizationModal } from './head-office-create-org'
import { CreateSupperAdminOrganizationModal } from './supper-admin-create-org'

const modalByTypeParams = {
  [EOrganizationListType.head_office]: CreateHeadOfficeOrganizationModal,
  [EOrganizationListType.supper_admin]: CreateSupperAdminOrganizationModal,
}

export const OrganizationManagementModal = () => {
  const currentParams = useCurrentParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const typeParam = currentParams['type'] || EOrganizationListType.head_office

  const CurrentModal = modalByTypeParams[typeParam]

  const handleClose = () => {
    navigate({
      pathname: RouterHelper.administrator_organization_management,
      search: createSearchParams(currentParams).toString(),
    })
  }

  const fetchCustomerList = useCallback(() => {
    dispatch(
      fetchUsers({
        forSelect: true,
        userFilters: {
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            isAll: true
          },
          filter: {
            userType: typeParam === EOrganizationListType.supper_admin ? '2' : '1',
            status: 'A',
          },
        },
      }),
    )
  }, [dispatch, typeParam])

  useEffect(() => {
    fetchCustomerList()
  }, [fetchCustomerList])

  return (
    <div>
      <CurrentModal maskClosable visible={true} onCancel={() => handleClose()} onOk={() => handleClose()} />
    </div>
  )
}
