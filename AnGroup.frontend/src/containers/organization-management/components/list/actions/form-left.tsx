import { createSearchParams, useNavigate } from 'react-router-dom'
import { TextInputSearch } from '~/components/common'
// import { TextInputSearch } from '~/components/common/form-control'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

export const ActionFormLeft = () => {
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const handleSearchChange = (value: string) => {
    navigate({
      pathname: RouterHelper.administrator_organization_management,
      search: createSearchParams({
        ...currentParams,
        querySearch: value.trim(),
        pageIndex: '1',
      }).toString(),
    })
  }
  return (
    <div className="flex">
      <TextInputSearch
        className="mr-3 w-1/2"
        height="small"
        rounded="medium"
        defaultValue={currentParams['querySearch']}
        onSearch={handleSearchChange}
        allowClear
        placeholder={t('placeholder.search')}
      />
      {/* <SelectBox
        placeholder="Select"
        className="mr-3"
        height="small"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      />
      <SelectBox
        placeholder="Select"
        height="small"
        options={[
          { label: 'item 1', value: '001' },
          { label: 'item 2', value: '002' },
        ]}
      /> */}
    </div>
  )
}
