import React from 'react'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { Navigate } from 'react-router-dom'
import { RouterHelper } from '~/utils'

type Props = {
  layout?: React.ComponentType<any>
  isPrivate?: boolean
  component: React.ComponentType<any>
  label?: string
}

export const RouteLayout = ({ layout: Layout, component: Component, isPrivate, ...props }: Props) => {
  const currentUser = useCurrentUser()

  if (isPrivate && !currentUser) {
    return <Navigate to={RouterHelper.login} />
  }

  if (Layout) {
    return (
      //@ts-ignore
      <Layout>
        {/* @ts-ignore */}
        <Component {...props} />
      </Layout>
    )
  } else {
    //@ts-ignore
    return <Component {...props} />
  }
}

RouteLayout.defaultProps = {
  isPrivate: true,
}
