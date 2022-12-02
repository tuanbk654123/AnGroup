import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCurrentPath } from '~/hooks'
import { useAppDispatch } from '~/redux/hooks'
import { getDepartments } from '~/redux/slices/department/middleware'

import { EOrganizationListType } from '../../index.types'
import ORGHeadOfficeList from './head-office-list'
import ORGSupperAdminList from './supper-admin-list'

export const ORGManagementList = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const listType = searchParams.get('type')
  const querySearch = searchParams.get('querySearch')
  const path = useCurrentPath()

  const fetchDepartmentTrees = useCallback(() => {
    const pathCreate = path.includes('create')
    if (pathCreate) {
      dispatch(
        getDepartments({
          forSelect: true,
          departmentFilter: {
            pagination: {
              pageIndex: 1,
              pageSize: 1000,
            },
            filter: {
              type: listType === EOrganizationListType.supper_admin ? '1' : '0',
              querySearch,
            },
          },
        }),
      )
    } else {
      dispatch(
        getDepartments({
          departmentFilter: {
            pagination: {
              pageIndex: 1,
              pageSize: 1000,
            },
            filter: {
              type: listType === EOrganizationListType.supper_admin ? '1' : '0',
              querySearch,
            },
          },
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, listType, querySearch])

  useEffect(() => {
    fetchDepartmentTrees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDepartmentTrees])

  const renderList = () => {
    switch (listType) {
      case EOrganizationListType.head_office:
        return <ORGHeadOfficeList />
      case EOrganizationListType.supper_admin:
        return <ORGSupperAdminList />

      default:
        return <ORGHeadOfficeList />
    }
  }

  return renderList()
}
