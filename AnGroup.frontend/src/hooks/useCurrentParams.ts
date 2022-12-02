import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useCurrentParams = () => {
  const [searchParams] = useSearchParams()

  const result = useMemo(() => {
    const _params = {}
    searchParams.forEach((value, key) => {
      _params[key] = value
    })
    return _params
  }, [searchParams])

  return result
}
