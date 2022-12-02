import { useState } from 'react'
import { Form, Image } from 'antd'
import { TextInput, PappperButton, ChangeLanguage } from '~/components/common'
import { useAppDispatch } from '~/redux/hooks'
import { forgotPasswordRequest } from '~/redux/slices/auth/middleware'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RouterHelper } from '~/utils'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const ForgotPasswordContainer = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    verifyType: 0,
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const currentParams = useCurrentParams()
  const handleChangeForm = (changeValues, values) => {
    setFormValues({ ...formValues, ...changeValues })
  }

  const onFinish = async (values) => {
    await dispatch(
      forgotPasswordRequest({
        data: formValues,
        onSuccess: ({ data, message }) => {
          if (!data) {
            toast.warning(message)
          } else {
            toast.success(message)
            setTimeout(() => {
              navigate({
                pathname: RouterHelper.verify_otp,
                // search: `?email=${values.email}`
                search: createSearchParams({ ...currentParams, email: values.email }).toString(),
              })
            }, 1000)
          }
        },
      }),
    )
  }
  const handleClickBackLogin = () => {
    navigate({
      pathname: RouterHelper.login,
    })
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
                    {t('forgotPassword.forgotPassword')}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-8">
              <ChangeLanguage className="my-6 w-full" />
            </div>
            <div className="mb-[15px]">
              <Form.Item
                className="mb-[20px] text-[#344054]"
                label={t('forgotPassword.email')}
                name={'email'}
                rules={[
                  {
                    required: true,
                    message: t('validation.checkEmail'),
                  },
                  // {
                  //   pattern: new RegExp(/^[\w-\.]+@shinhan\.com$/),
                  //   message:
                  //     'Enter a valid email address!',
                  // },
                  {
                    type: 'email',
                    message: t('validation.validEmail'),
                  },
                ]}
              >
                <TextInput withoutSpace className="h-[50px] rounded-[8px]" placeholder={t('placeholder.email')} />
              </Form.Item>
            </div>
            <div className="flex justify-end mb-[10px]">
              <div className="text-[13px] text-[#3266e9] cursor-pointer" onClick={handleClickBackLogin}>
                {t('forgotPassword.login')}
              </div>
            </div>
            <PappperButton htmlType="submit" variant="primary" rounded="button" className="w-full h-[50px]">
              <span className="text-white">{t('button.submit')} </span>
            </PappperButton>
          </div>
        </Form>
      </div>
    </div>
  )
}
