import { matchRoutes, useLocation } from 'react-router-dom'
import { routes } from '~/routes/config'
import { flattenRoutes } from '~/utils'

export const useCurrentPath = () => {
  const _routes = flattenRoutes(routes).map((item) => ({
    path: item.path,
  }))

  const location = useLocation()
  const [{ route }] = matchRoutes(_routes, location)

  return route.path
}
