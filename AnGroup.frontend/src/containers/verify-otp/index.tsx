import { useEffect, useState } from 'react'
import { Form, Image } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
import OTPInput, { ResendOTP } from 'otp-input-react'
import { RouterHelper } from '~/utils'
import { useCurrentParams } from '~/hooks'
import { forgotPasswordRequest, verifyOTPRequest } from '~/redux/slices/auth/middleware'
import { toast } from 'react-toastify'
import { useAppDispatch } from '~/redux/hooks'
import { ChangeLanguage } from '~/components/common'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const VerifyOTPContainer = () => {
  const [OTP, setOTP] = useState('')
  const param: any = useCurrentParams()
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  // const [reload, setReload] = useState(false)

  console.log(param?.email)

  const navigate = useNavigate()

  // if (lengthOTP === 6) {
  //   dispatch(
  //     verifyOTPRequest({
  //       data: {
  //         email: param?.email,
  //         otp: OTP
  //       },
  //       onSuccess: ({ data, message }) => {
  //         console.log({ data })
  //         if (!data) {
  //           toast.warning(message)
  //         } else {
  //           toast.success(message)
  //           setTimeout(() => {
  //             navigate({
  //               pathname: RouterHelper.reset_password,

  //             })
  //           }, 1000)
  //         }
  //       },
  //     })
  //   )
  // }

  useEffect(() => {
    if (OTP.length === 6) {
      dispatch(
        verifyOTPRequest({
          data: {
            email: param?.email,
            otp: OTP,
          },
          onSuccess: ({ status, data, message }) => {
            if (status === 1) {
              toast.success(message)
              setTimeout(() => {
                navigate({
                  pathname: RouterHelper.reset_password,
                  search: createSearchParams({ ...param, email: param?.email, OTP: OTP }).toString(),
                })
              }, 1000)
            }
          },
        }),
      )
    }
  }, [OTP, dispatch, navigate, param])

  const renderButton = (buttonProps) => {
    const handleClick = () => {
      dispatch(
        forgotPasswordRequest({
          data: {
            email: param.email,
            verifyType: 0,
          },
          onSuccess: ({ data, message }) => {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(message)
              buttonProps.onClick()
            }
          },
        }),
      )

      // console.log("handleClick");
      // buttonProps.onClick();
      // console.log(buttonProps)
    }

    return (
      <button {...buttonProps} onClick={handleClick} className="text-red-600">
        {t('forgotPassword.resend')}
      </button>
    )
  }
  const renderTime = (remainingTime) => {
    return (
      <span>
        {remainingTime}
        {t('forgotPassword.secondsRemaining')}
      </span>
    )
  }

  return (
    <div className="bg-backgroundLogin bg-no-repeat bg-cover flex justify-center items-center h-screen">
      <div className="w-[504px] bg-[#fff] rounded-xl relative">
        <Form layout="vertical">
          <div className="py-12 px-20">
            <div className="flex justify-center mb-11">
              <div>
                <div className="flex justify-center mb-[18.5px]">
                  <Image preview={false} width={222} height={100} src={'/assets/login/logo.png'} />
                </div>
                <div>
                  <span className="text-[22px] font-bold leading-[30px] text-[#6F7271]">
                    {t('forgotPassword.verifyOTP')}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-8">
              <ChangeLanguage className="my-6 w-full" />
            </div>
            <div className="mb-[15px]">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                secure={false}
                style={{ 'justify-content': 'center', 'padding-bottom': '10px' }}
                inputStyles={{ border: '2px solid', 'border-radius': '3px' }}
              />
              <ResendOTP renderButton={renderButton} renderTime={renderTime} />
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
