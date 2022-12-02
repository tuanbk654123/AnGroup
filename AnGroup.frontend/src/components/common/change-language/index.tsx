import i18next from 'i18next'
import { useMemo } from 'react'
import { storageKeys } from '~/constants/storageKeys'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { SUPPORTED_LANGUAGES } from '~/i18n/config'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { appActions } from '~/redux/slices'
import { saveDataToStorage } from '~/utils/storage.utils'
import { ISelectBoxProps, SelectBox } from '../form-control'

export interface ChangeLanguageProps extends ISelectBoxProps {}

export const ChangeLanguage = (props: ChangeLanguageProps) => {
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch()
  const currentLanguage = useAppSelector((state) => state.app.currentLanguage)

  const languageOptions = useMemo(() => {
    return SUPPORTED_LANGUAGES.map((item) => ({
      label: t(item.label),
      value: item.key,
    }))
  }, [t])

  const handleChangeLanguage = (value) => {
    saveDataToStorage(storageKeys.LANGUAGE, value)
    i18next.changeLanguage(value)
    dispatch(appActions.updateLanguage(value))
  }

  return (
    <SelectBox
      rounded="small"
      value={currentLanguage}
      options={languageOptions}
      onChange={handleChangeLanguage}
      {...props}
    />
  )
}
