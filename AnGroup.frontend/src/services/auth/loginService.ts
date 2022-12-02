import { UserManager } from 'oidc-client';
import { Navigate } from 'react-router-dom'
import { RouterHelper } from '~/utils/routes';

const config = {
  authority: "http://localhost:5001",
  client_id: "apectravele",
  redirect_uri: "http://localhost:3000/signin-oidc",
  response_type: "id_token token",
  scope: "openid profile ApiApecTravele",
  post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
};


const userManager = new UserManager(config)

export async function loadUserFromStorage(store) {
  const userdata = await userManager.getUser()
}

// export async function signoutRedirect(store) {
//   try {
//     let user = await userManager.getUser()
//     if (!user) { return store.dispatch(storeUserError()) }
//     store.dispatch(storeUser(user))
//   } catch (e) {
//     console.error(`User not found: ${e}`)
//     store.dispatch(storeUserError())
//   }
// }
export async function getUser() {
  return await userManager.getUser()
}

export async function signinRedirect() {
  console.log(`user loaded: ${process.env.AUTHORITY}`)
  return await userManager.signinRedirect()
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback()
    .then((user) => {
      console.log("signinRedirectCallback success", user);
    })
    .catch((error) => {
      console.log("signinRedirectCallback error", error);
      Navigate({ to: RouterHelper.login });
    })
  console.log(`user loaded3`)
}

export function signoutRedirect() {
  //const navigate = useNavigate()
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirect()
  // .then(() => {
  //   navigate({
  //     pathname: RouterHelper.login,
  //   });
  // })   
}

export function signoutRedirectCallback() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirectCallback().then((success) => {
    console.log("signoutRedirectCallback success", success);
  })
    .catch((error) => {
      console.log("signoutRedirectCallback error", error);

    }).finally(() => {
      Navigate({ to: RouterHelper.login });
    });
}

export default userManager