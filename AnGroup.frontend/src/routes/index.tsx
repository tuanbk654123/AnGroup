import { useMemo } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { RouteLayout } from '~/components/router'
import { flattenRoutes } from '~/utils'
import { routes } from './config'
import { ToastContainer } from 'react-toastify'
import userManager from '~/services/auth/loginService'
import { store } from '~/redux/store'
import AuthProvider from '~/utils/authProvider';

export const AppRoutes = () => {
  const _flattenRoutes = useMemo(() => {
    console.log(flattenRoutes(routes))
    return flattenRoutes(routes)
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider userManager={userManager} store={store} >
        {/* <ToastContainer />  */}
        <Routes>
          {_flattenRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RouteLayout
                  component={route.element}
                  label={route.label}
                  layout={route.layout}
                  isPrivate={route.isPrivate}
                />
              }
            />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
