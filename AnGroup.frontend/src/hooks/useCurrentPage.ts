import { useMemo } from 'react'
import { isEmpty } from '~/utils/helper'
import { useCurrentParams } from './useCurrentParams'

export const useCurrentPage = () => {
  const currentParams = useCurrentParams()

  const currentPage = useMemo(() => {
    return isEmpty(currentParams['pageIndex']) ? 1 : +currentParams['pageIndex']
  }, [currentParams])

  return currentPage
}
