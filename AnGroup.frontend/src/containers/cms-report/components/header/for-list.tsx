import { createSearchParams, useNavigate } from 'react-router-dom'
import { PaperPageHeaderForList } from '~/components/layout'
import { RouterHelper } from '~/utils'

export const CmsReportHeaderForList = () => {
  const navigate = useNavigate()

  const handleChangeTab = (key: string) => {
    navigate({
      pathname: RouterHelper.administrator_user_management,
      search: createSearchParams({
        type: key,
      }).toString(),
    })
  }

  return <PaperPageHeaderForList title="Report" onTabChange={handleChangeTab} />
}
