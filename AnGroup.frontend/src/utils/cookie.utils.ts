import Cookie from 'js-cookie'
import { storageKeys } from '~/constants/storageKeys'

const keyStoredCookie = [storageKeys.TOKEN]

export const deleteAllDataCookie = () => {
  keyStoredCookie.forEach((key) => {
    Cookie.remove(key)
  })
}

export const saveDataToCookie = (key: string, data: string) => {
  Cookie.set(key, data)
}

export const getDataFromCookie = (key: string) => {
  try {
    return Cookie.get(key)
  } catch {
    return null
  }
}
