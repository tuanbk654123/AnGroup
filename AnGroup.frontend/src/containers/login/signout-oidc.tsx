import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { signoutRedirectCallback } from '~/services/auth/loginService'
//  import { Redirect  } from 'react-router-dom'
//import {    history  } from '~/utils/history'
import { RouterHelper } from '~/utils/routes'
// import { useAppDispatch } from '../../../app/hooks';
// import { authAction } from '../../../features/auth/authSlice';

function SignoutOidc() {
  // const dispatch = useAppDispatch();
  useEffect(() => {
    async function signoutAsync() {
      await signoutRedirectCallback()
      //history.push('/');
    }
    signoutAsync()
  }, [])

  return (
        <Navigate to={RouterHelper.login} />
        // <div>Redirect...</div>
        // <Redirect to = "home" />
  )
}

export default SignoutOidc
