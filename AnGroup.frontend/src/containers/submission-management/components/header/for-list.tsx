import { useAppTranslation } from '~/hooks/useAppTranslation'

export const SubmissionHeaderForList = () => {
  const { t } = useAppTranslation()
  return <p className="text-primary text-[22px] font-body-bold mb-4">{t('submissionManagement.title')}</p>
}
