import { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { TextInputSearch } from '~/components/common/form-control'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
export interface IRoleFilterValues {
  name?: string
}
export const ActionFormLeft = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [filterValues, setFilterValues] = useState<IRoleFilterValues>({
    name: '',
  })

  useEffect(() => {
    setFilterValues((prevFilter) => ({
      ...prevFilter,
      ...currentParams,
    }))
  }, [currentParams])

  const handleSearch = () => {
    const searchParams = createSearchParams({
      ...currentParams,
      ...filterValues,
    }).toString()
    navigate(`${location.pathname}?${searchParams}`, { replace: true })
  }
  return (
    <div className="flex">
      <TextInputSearch
        className="mr-3 w-1/2"
        height="small"
        rounded="small"
        value={filterValues?.name}
        onChange={(e) => setFilterValues({ ...filterValues, name: e.target.value })}
        onSearch={handleSearch}
        placeholder={t('placeholder.search')}
      />
      {/* <SelectBox
        defaultValue="002"
        className="mr-3"
        height="small"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      />
      <SelectBox
        className="mr-3"
        defaultValue="002"
        height="small"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      /> */}
    </div>
  )
}
