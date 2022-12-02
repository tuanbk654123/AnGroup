import { createSearchParams, useNavigate } from 'react-router-dom'
import { PaperPageHeaderForList } from '~/components/layout'
import { useAppTranslation } from '~/hooks'
import { RouterHelper } from '~/utils'

export const UserLogworkHeaderForList = () => {
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const handleChangeTab = (key: string) => {
    navigate({
      pathname: RouterHelper.administrator_user_management,
      search: createSearchParams({
        type: key,
      }).toString(),
    })
  }

  return <PaperPageHeaderForList title={t('userLogwork.title')} onTabChange={handleChangeTab} />
}
