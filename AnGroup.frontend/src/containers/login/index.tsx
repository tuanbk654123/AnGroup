import { Form, Image, Checkbox } from 'antd'
import { useState } from 'react'
import { TextInput, FormItem, TextInputPassword, PappperButton, ChangeLanguage } from '~/components/common'
import { useAppDispatch } from '~/redux/hooks'
import { loginRequest } from '~/redux/slices/auth/middleware'
import { useNavigate } from 'react-router-dom'
import { RouterHelper } from '~/utils'
import { UserOutlined, LockFilled } from '@ant-design/icons'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'
import Env from '~/components/common/is-test-enviroment'
import { UserManager } from 'oidc-client';
import { signinRedirect } from '~/services/auth/loginService'


export const LoginContainer = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    password: ''
    // client_id: 'TouristPortalAPI',
    // client_secret: '123456',
    // scope: 'TouristPortalApp',
    // grant_type: 'password',
    // loginType: 'web',
  })
  const [loadings, setLoadings] = useState([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useAppTranslation()

  const handleChangeForm = (changeValues, values) => {
    setFormValues({ ...formValues, ...changeValues })
  }

  const onFinish = async (values) => {
    console.log("TTT", formValues)
    await dispatch(
      loginRequest({
        data: formValues,
        onSuccess: (data) => {
          localStorage.setItem('fullName', data.data.user)
          setTimeout(() => {
            navigate({
              pathname: RouterHelper.home,
            })
          }, 0)
        },
        onError(error?) {
          if (error?.message === 'Request failed with status code 500') {
            toast.error(t('message.loginFail'))
          } else if (error?.response?.data?.message === "Account can not access to web admin") {
            toast.error(t('message.notAccess'))
          }
          else {
            toast.error(t('message.error'))
          }
        },
      }),
    )
  }

  const handleClickForgotPassword = () => {
    navigate({
      pathname: RouterHelper.forgot_password,
    })
  }

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })



    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 3000)

  }
  const LoginWithApec = async () => {

    await signinRedirect()
    //await userManager.signinRedirect();
  }


  return (
    <div className="bg-backgroundLogin bg-no-repeat bg-cover flex justify-center items-center h-screen">
      <div className="w-[504px] bg-[#fff] rounded-xl relative" style={{ borderRadius: 20 }}>
        <Form layout="vertical" initialValues={formValues} onFinish={onFinish} onValuesChange={handleChangeForm}>
          <div className="pt-4 pb-2">
            <Env color="black" />
          </div>
          <div className="pb-2 px-20">
            <div className="flex justify-center mb-11">
              <div>
                <div className="flex justify-center mb-[10.5px]">
                  <Image preview={false} width={222} height={100} src={'/assets/login/logo.png'} />
                </div>
                <div className="text-center">
                  <span className="text-[22px] font-bold leading-[30px] text-[#6F7271]">{t('login.welcome')}</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-8">
              <ChangeLanguage className="my-6 w-full" />
            </div>
            <div className="mb-[15px]">
              <FormItem
                className="mb-[20px] text-[#344054]"
                label={
                  <div className="flex items-center gap-1">
                    <UserOutlined />
                    {t('login.userName')}
                  </div>
                }
                name={'name'}
                rules={[
                  {
                    required: true,
                    message: t('validation.checkUserName'),
                  },
                ]}
              >
                <TextInput className="h-[50px] rounded-[8px]" placeholder={t('placeholder.userName')} />
              </FormItem>
              <FormItem
                className="mb-0 text-[#344054]"
                label={
                  <div className="flex items-center gap-1">
                    <LockFilled />
                    {t('login.password')}
                  </div>
                }
                name={'password'}
                rules={[
                  {
                    required: true,
                    message: t('validation.checkPassword'),
                  },
                ]}
              >
                <TextInputPassword
                  withoutSpace
                  className="h-[50px] rounded-[8px]"
                  placeholder={t('placeholder.password')}
                />
              </FormItem>
            </div>

            <div className="flex justify-between mb-[40px]">
              <Checkbox>
                <span className="text-[13px] text-[#232440]">{t('login.savePassword')}</span>
              </Checkbox>
              <div className="text-[13px] text-[#FF4141] cursor-pointer" onClick={handleClickForgotPassword}>
                {t('forgotPassword.forgotPassword')}
              </div>
            </div>
            <PappperButton
              htmlType="submit"
              variant="primary"
              rounded="button"
              className="w-full h-[50px]"
              loading={loadings[0]}
              onClick={() => enterLoading(0)}
            >
              <span className="text-white">{t('button.login')}</span>
            </PappperButton>
          </div>
        </Form>
        <PappperButton
          htmlType="submit"
          variant="warning"
          className="w-full h-[50px]"
          style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
          onClick={() => LoginWithApec()}
        >
          <span className="text-white">{t('button.loginWithApecId')}</span>
        </PappperButton>
      </div>
    </div>
  )
}