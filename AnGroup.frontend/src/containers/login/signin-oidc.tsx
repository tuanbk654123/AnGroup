import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { signinRedirectCallback } from '~/services/auth/loginService'
import { RouterHelper } from '~/utils/routes'

function SigninOidc() {
  // const history = Navigate;
  useEffect(() => {
    async function signinAsync() {
      const obj = await signinRedirectCallback();
      return <Navigate to={RouterHelper.home} />
    }
    signinAsync()
  }, [])

  return (
    <Navigate to={RouterHelper.home} />
  )
}

export default SigninOidc
