import enSource from '../i18n/languages/en.json'

export enum Languages {
  Vi = 'Vi',
  En = 'En',
}

export type LanguagesType = keyof typeof Languages

export type LanguageSource = {
  [key: string]: LanguageSource | string
}

type RecursiveKeyOf<Source extends LanguageSource> = {
  [Key in keyof Source & string]: Source[Key] extends LanguageSource
    ? // @ts-ignore
      `${Key}` | `${Key}.${RecursiveKeyOf<Source[Key]>}`
    : `${Key}`
}[keyof Source & string]

export type LanguageKey = RecursiveKeyOf<typeof enSource>
