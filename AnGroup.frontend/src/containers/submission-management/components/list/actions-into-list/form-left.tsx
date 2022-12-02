import { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { SelectBox } from '~/components/common'
import { TextInputSearch } from '~/components/common'
import { useCurrentParams } from '~/hooks'

const demo = true

export interface ISubmissionFilterValues {
  name?: string
}

export const SubmissionActionFormLeft = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentParams = useCurrentParams()

  const [filterValues, setFilterValues] = useState<ISubmissionFilterValues>({
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
        rounded="medium"
        value={filterValues?.name}
        onChange={(e) => setFilterValues({ ...filterValues, name: e.target.value })}
        placeholder={'SEARCH'}
        onSearch={handleSearch}
      />
      {!demo && (
        <>
          <SelectBox
            defaultValue="002"
            className="mr-3"
            size="large"
            options={[
              { label: 'item 1', value: '001' },
              { label: 'item 2', value: '002' },
            ]}
          />
          <SelectBox
            className="mr-3"
            defaultValue="002"
            size="large"
            options={[
              { label: 'item 1', value: '001' },
              { label: 'item 2', value: '002' },
            ]}
          />
        </>
      )}
    </div>
  )
}
