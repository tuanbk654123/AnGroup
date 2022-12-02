import { useAppTranslation } from '~/hooks/useAppTranslation'

export const UserManagementHeaderForList = () => {
  const { t } = useAppTranslation()
 
  

  
  return (
    <div className="bg-white pt-5 px-4 mb-6">
      <p className="page-title my-2">{t('userManagement.title')}</p>
    </div>
  )
}
