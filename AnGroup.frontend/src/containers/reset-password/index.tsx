import { useState } from 'react'
import { Form, Image } from 'antd'
import { ChangeLanguage, PappperButton, TextInputPassword } from '~/components/common'
import { useAppDispatch } from '~/redux/hooks'
import { resetPasswordRequest } from '~/redux/slices/auth/middleware'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RouterHelper } from '~/utils'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
// import { validMessage } from '~/constants/message'
export const ResetPasswordContainer = () => {
  const [formValues, setFormValues] = useState({
    password: '',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const param: any = useCurrentParams()
  const handleChangeForm = (changeValues, values) => {
    setFormValues({ ...formValues, ...changeValues })
  }

  const onFinish = async (values) => {
    await dispatch(
      resetPasswordRequest({
        data: {
          email: param.email,
          ...formValues,
          otp: param.OTP,
        },
        onSuccess: ({ status, data, message }) => {
          // if (!data) {
          //   toast.warning(message)
          // } else {
          //   toast.success(message)
          //   setTimeout(() => {
          //     navigate({
          //       pathname: RouterHelper.login,
          //     })
          //   }, 1000)
          // }
          if (status === 1) {
            toast.success(message)
            setTimeout(() => {
              navigate({
                pathname: RouterHelper.login,
              })
            }, 1000)
          }
        },
      }),
    )
  }

  return (
    <div className="bg-backgroundLogin bg-no-repeat bg-cover flex justify-center items-center h-screen">
      <div className="w-[504px] bg-[#fff] rounded-xl relative">
        <Form layout="vertical" initialValues={formValues} onFinish={onFinish} onValuesChange={handleChangeForm}>
          <div className="py-12 px-20">
            <div className="flex justify-center mb-11">
              <div>
                <div className="flex justify-center mb-[18.5px]">
                  <Image preview={false} width={222} height={100} src={'/assets/login/logo.png'} />
                </div>
                <div>
                  <span className="text-[22px] font-bold leading-[30px] text-[#6F7271]">
                    {t('forgotPassword.resetPassword')}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-8">
              <ChangeLanguage className="my-6 w-full" />
            </div>
            <div className="mb-[15px]">
              <Form.Item
                className="mb-0 text-[#344054]"
                label={t('forgotPassword.newPassword')}
                name={'password'}
                rules={[
                  {
                    pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i),
                    message: t('validation.validPassword'),
                  },
                  {
                    required: true,
                    message: t('validation.checkPassword'),
                  },
                ]}
                hasFeedback
              >
                <TextInputPassword
                  withoutSpace
                  className="h-[50px] rounded-[8px]"
                  placeholder={t('placeholder.password')}
                />
              </Form.Item>
            </div>
            <div className="mb-[15px]">
              <Form.Item
                className="mb-0 text-[#344054]"
                name="confirm"
                label={t('forgotPassword.confirmPassword')}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t('validation.checkPassword'),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }

                      return Promise.reject(new Error(t('validation.validTwoPasswords')))
                    },
                  }),
                ]}
              >
                <TextInputPassword
                  withoutSpace
                  className="h-[50px] rounded-[8px]"
                  placeholder={t('placeholder.repeatPassword')}
                />
              </Form.Item>
              <div className="pt-2.5 text-xs text-center">
                <i>{t('changePassword.note')}</i>
              </div>
            </div>

            <PappperButton htmlType="submit" variant="primary" rounded="button" className="w-full h-[50px]">
              <span className="text-white">{t('button.submit')}</span>
            </PappperButton>
          </div>
        </Form>
      </div>
    </div>
  )
}
