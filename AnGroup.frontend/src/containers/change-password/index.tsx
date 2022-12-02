import { useState } from 'react'
import { Col, Form, Image, Row } from 'antd'
import { PappperButton, TextInputPassword } from '~/components/common'
import { useAppDispatch } from '~/redux/hooks'
import { changePasswordRequest } from '~/redux/slices/auth/middleware'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RouterHelper } from '~/utils'
import { useCurrentUser } from '~/hooks/useCurrentUser'
import { useAppTranslation } from '~/hooks/useAppTranslation'
// import { validMessage } from '~/constants/message'
export const ChangePasswordContainer = () => {
  const { t } = useAppTranslation()
  const [formValues, setFormValues] = useState({
    oldpassword: '',
    password: '',
  })
  const currentUser = useCurrentUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleChangeForm = (changeValues, values) => {
    setFormValues({ ...formValues, ...changeValues })
  }

  const onFinish = async (values) => {
    await dispatch(
      changePasswordRequest({
        data: {
          id: currentUser.Id,
          currentPassword: formValues.oldpassword,
          newPassword: formValues.password,
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
    <div className="p-4">
      <Form layout="vertical" initialValues={formValues} onFinish={onFinish} onValuesChange={handleChangeForm}>
        <Row gutter={24} className="justify-center">
          <Col span={16}>
            <div className="pb-8 px-20">
              <div className="flex justify-center mb-11">
                <div>
                  <div className="flex justify-center mb-[18.5px]">
                    <Image preview={false} width={222} height={100} src={'/assets/login/logo.png'} />
                  </div>
                  <div>
                    <span className="text-[22px] font-bold leading-[30px] text-[#6F7271]">
                      {t('changePassword.changePassword')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-[15px]">
                <Form.Item
                  className="mb-0 text-[#344054]"
                  label={t('changePassword.oldPassword')}
                  name={'oldpassword'}
                  rules={[
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
                  label={t('changePassword.newPassword')}
                  name={'password'}
                  rules={[
                    {
                      required: true,
                      message: t('validation.checkPassword'),
                    },
                    {
                      pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/i),
                      message: t('validation.validPassword'),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('oldpassword') !== value) {
                          return Promise.resolve()
                        }

                        return Promise.reject(new Error('The new password cannot be the same as the old password!'))
                      },
                    }),
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
                  label={t('changePassword.confirmPassword')}
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match!'))
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
                <div className="pt-2.5 px-11 text-center">
                  <i>{t('changePassword.note')}</i>
                </div>
              </div>
              <PappperButton htmlType="submit" variant="primary" rounded="button" className="w-full h-[50px]">
                <span className="text-white">{t('button.submit')}</span>
              </PappperButton>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
