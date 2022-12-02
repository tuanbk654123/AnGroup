import { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { TextInputSearch } from '~/components/common/form-control'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export interface ISubmissionFilterValues {
  name?: string
}

export const ActionFormLeft = () => {
  const [filterValues, setFilterValues] = useState<ISubmissionFilterValues>({
    name: '',
  })
  const currentParams = useCurrentParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useAppTranslation()

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
