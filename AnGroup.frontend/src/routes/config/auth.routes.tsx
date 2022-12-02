import { AppLayout } from '~/components/layout'
import SigninOidc from '~/containers/login/signin-oidc'
import SignoutOidc from '~/containers/login/signout-oidc'
import { ChangePasswordPage } from '~/pages/change-password'
import { ForgotPasswordPage } from '~/pages/forgot-password'
import { LoginPage } from '~/pages/login'
import { ResetPasswordPage } from '~/pages/reset-password'
import { VerifyOTPPage } from '~/pages/verify-otp'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout
export const authRoutes: RoutesItem[] = [
  {
    key: RouterHelper.login,
    label: 'Login',
    path: RouterHelper.login,
    element: LoginPage,
    showOnMenu: false,
    layout: null,
    isPrivate: false,
  },
  {
    key: RouterHelper.signinoidc,
    label: 'signin-oidc',
    path: RouterHelper.signinoidc,
    element: SigninOidc,
    showOnMenu: false,
    layout: null,
    isPrivate: false,
  },
  {
    key: RouterHelper.signoutoidc,
    label: 'signout-oidc',
    path: RouterHelper.signoutoidc,
    element: SignoutOidc,
    showOnMenu: false,
    layout: null,
    isPrivate: false,
  },
  {
    key: RouterHelper.forgot_password,
    label: 'Forgot Password',
    path: RouterHelper.forgot_password,
    element: ForgotPasswordPage,
    showOnMenu: false,
    layout: null,
    isPrivate: false,
  },
  {
    key: RouterHelper.verify_otp,
    label: 'Verify OTP',
    path: RouterHelper.verify_otp,
    element: VerifyOTPPage,
    showOnMenu: false,
    layout: null,
    isPrivate: false,
  },
  {
    key: RouterHelper.reset_password,
    label: 'Reset Password',
    path: RouterHelper.reset_password,
    element: ResetPasswordPage,
    showOnMenu: false,
    layout: null,
    isPrivate: false,
  },
  {
    key: RouterHelper.change_password,
    label: 'Change Password',
    path: RouterHelper.change_password,
    element: ChangePasswordPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
]
