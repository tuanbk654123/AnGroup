import i18next from 'i18next'
import { useEffect } from 'react'
import { storageKeys } from './constants/storageKeys'
import { useAppDispatch } from './redux/hooks'
import { appActions } from './redux/slices'
import { AppRoutes } from './routes'
import { Languages } from './types'
import { getDataFromStorage } from './utils/storage.utils'
import userManager, { loadUserFromStorage } from './services/auth/loginService'
import { store } from './redux/store'
import AuthProvider from './utils/authProvider';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    loadUserFromStorage(store);
    const currentLanguage = getDataFromStorage(storageKeys.LANGUAGE) || Languages.En
    i18next.changeLanguage(currentLanguage)
    dispatch(appActions.updateLanguage(currentLanguage))
  }, [dispatch])

  return (
    <AppRoutes />
  )
}

export default App
