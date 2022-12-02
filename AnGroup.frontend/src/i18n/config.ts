import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import { Languages, LanguageSource, LanguageKey } from '../types/languages'
import enSource from './languages/en.json'
import viSource from './languages/vi.json'

export const defaultLanguage = Languages.En
export const defaultSource = enSource

export interface SupportedLanguages {
  key: string
  translationSource: LanguageSource
  label: LanguageKey
}

export const SUPPORTED_LANGUAGES: SupportedLanguages[] = [
  {
    key: Languages.En,
    translationSource: enSource,
    label: 'languages.english',
  },
  {
    key: Languages.Vi,
    translationSource: viSource,
    label: 'languages.vietnamese',
  },
]

export const resources = (() => {
  const result = {}
  SUPPORTED_LANGUAGES.forEach((languageConfig) => {
    result[languageConfig.key] = {
      translation: languageConfig.translationSource,
    }
  })
  return result
})()

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
})
