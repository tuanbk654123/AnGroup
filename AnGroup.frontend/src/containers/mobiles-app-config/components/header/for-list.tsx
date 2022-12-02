import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { PaperPageHeaderForList } from '~/components/layout'
import { RouterHelper } from '~/utils'
import { EAppConfigListType } from '../../index.types'

const tabs = [
  {
    key: EAppConfigListType.logo,
    label: 'Logo',
  },
  {
    key: EAppConfigListType.onboarding_screen,
    label: 'Onboarding Screen',
  },
]

export const MobilesAppConfigHeaderForList = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const defaultActiveKey = searchParams.get('type') || tabs[0].key

  const handleChangeTab = (key: string) => {
    navigate({
      pathname: RouterHelper.configuration_mobile_app,
      search: createSearchParams({
        type: key,
      }).toString(),
    })
  }

  return (
    <PaperPageHeaderForList
      title="Mobile App Config"
      tabs={tabs}
      defaultActiveKey={defaultActiveKey}
      onTabChange={handleChangeTab}
    />
  )
}
