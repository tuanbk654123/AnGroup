import { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { TextInputSearch } from '~/components/common'
import { useCurrentParams } from '~/hooks'

export interface ISubmissionFilterValues {
  search?: string
}

export const ActionFormLeft = () => {
  const [filterValues, setFilterValues] = useState<ISubmissionFilterValues>({
    search: '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const currentParams = useCurrentParams()

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
        placeholder="Input search title"
        className="mr-3 w-1/2"
        height="small"
        value={filterValues?.search}
        onChange={(e) => setFilterValues({ ...filterValues, search: e.target.value })}
        onSearch={handleSearch}
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
