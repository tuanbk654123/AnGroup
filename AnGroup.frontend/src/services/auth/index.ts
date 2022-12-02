import { httpService } from '../http'

// import { UserManager } from 'oidc-client';

// const config = {
//   authority: "http://localhost:5001/",
//   client_id: "apectravele",
//   redirect_uri: "http://localhost:3000/signin-oidc",
//   response_type: "id_token token",
//   scope: "openid profile ApiApecTravele",
//   post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
// };

// const userManager = new UserManager(config)

// export async function getUser() {
//   return  await userManager.getUser()
// }

// export async function signinRedirect() {
//   return await userManager.signinRedirect()
// }

// export function signinRedirectCallback() {
//   return userManager.signinRedirectCallback()
//   .then((user) => {
//     console.log(`user loaded: ${user}`)

//     // window.location.href = 'http://localhost:3000';
//   })   
// }

// export function signoutRedirect() {
//   userManager.clearStaleState()
//   userManager.removeUser()
//   return userManager.signoutRedirect()
// }

// export function signoutRedirectCallback() {
//   userManager.clearStaleState()
//   userManager.removeUser()
//   return userManager.signoutRedirectCallback()
// }

// export default userManager

export const authServices = {
  login: async (data) => {
    const dataBody = new URLSearchParams(data)
    const response = await httpService.post('/api/cms/user/login', data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },

  logout: async () => {
    const response = await httpService.post('/api/users/logout', {}, {})
    return response
  },
  forgot_password: async (data) => {
    const response = await httpService.post('/api/users/verifyUser/reset-password', data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },
  verifyOTP: async (data) => {
    const response = await httpService.post('/api/users/verifyUser/valid-otp', data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },
  reset_password: async (data) => {
    const response = await httpService.post('/api/users/reset-password', data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },
  change_password: async (data) => {
    const response = await httpService.post(`/api/docs/user/profile/change-password/${data.id}`, data, {
      headers: {
        'Content-type': 'application/json',
      },
    })
    return response
  },

}
