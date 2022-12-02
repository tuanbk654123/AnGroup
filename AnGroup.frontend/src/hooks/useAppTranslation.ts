import { useTranslation } from 'react-i18next'
import { LanguageKey } from '~/types'

export function useAppTranslation() {
  const { t, ...translationUltilities } = useTranslation()

  const translate = (key: LanguageKey) => t(key)

  return {
    ...translationUltilities,
    t: translate,
  }
}
