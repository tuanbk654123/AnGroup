import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { useAppDispatch } from '~/redux/hooks'
import { fetchUsers } from '~/redux/slices/user/middleware'

import { EOrganizationListType } from '../../index.types'
import ORGHeadOfficeEditForm from './head-office-edit-form'
import ORGSupperAdminEditForm from './supper-admin-edit-form'

export default function ORGEditManagement() {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const currentParams = useCurrentParams()

  const typeParam = currentParams['type'] || EOrganizationListType.head_office

  const fetchCustomerList = useCallback(() => {
    dispatch(
      fetchUsers({
        userFilters: {
          pagination: {
            pageIndex: 1,
            pageSize: 10000,
          },
          filter: {
            userType: typeParam === EOrganizationListType.supper_admin ? '2' : '1',
          },
        },
      }),
    )
  }, [dispatch, typeParam])

  useEffect(() => {
    fetchCustomerList()
  }, [fetchCustomerList])

  const listType = searchParams.get('type')
  const renderFormEdit = () => {
    switch (listType) {
      case EOrganizationListType.head_office:
        return <ORGHeadOfficeEditForm />
      case EOrganizationListType.supper_admin:
        return <ORGSupperAdminEditForm />

      default:
        return <ORGHeadOfficeEditForm />
    }
  }
  return renderFormEdit()
}
