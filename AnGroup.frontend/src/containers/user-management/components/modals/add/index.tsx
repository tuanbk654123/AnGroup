import { Avatar, Checkbox, Col, Form, FormInstance, Modal, Row, Radio } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, InputUploads, MultipleSelect, PapperCheckbox, PappperButton, SelectBox, TextInput, TextInputArea, UploadImage } from '~/components/common'
import { TextEditor } from '~/components/common/form-control/text-editor'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { createUser } from '~/redux/slices/user/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { from } from 'rxjs'
import TextArea from 'antd/lib/input/TextArea'
import { categoryGetAllRequest } from '~/redux/slices/category/middleware'
import { Image, UploadProps } from 'antd';
import type { RadioChangeEvent } from 'antd';
import Upload from 'antd/lib/upload/Upload'
import { PopupCreatiPostModal } from '~/containers/creativepost/popup'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



type ImageResponse = {
  code: number
  data: string
}


export const CreateUserModal = (props) => {
  const { showAdd, hideAdd, loadPage, setLoadPage } = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [avatarResponse, setAvatarResponse] = useState<ImageResponse>({} as any)
  const [value, setValue] = useState("M");
  const [showWarning, setShowWarning] = useState(false)
  const [warningText, setWarningText] = useState(null)


  const handleChangeAvatar: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      console.log("TUAN" + JSON.stringify(info.file?.response));
    }
    if (info.file.status === 'done') {
      console.log("TUAN" + JSON.stringify(info.file.response.data));
      setImageUrl(process.env.REACT_APP_BASE_API_MINIO_URL + info.file.response.data);
    }

  }

  useEffect(() => {

    if (showAdd == true) {
      form.setFieldsValue({
        userName: null,
        fullName: null,
        password: null,
        repeatPassword: null,
        phone:null,
        email: null,
        ddress:null
      })
      setImageUrl(null);
      setValue("M")
    }
    console.log(1)


    // eslint-disable-next-line
  }, [showAdd]);

  const save = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      // parentId: values.parentId || null,
      //image : env.REACT_APP_BASE_API_MINIO_URL+ imageUrl,
      image: imageUrl,
      gender:value
    }
    formRef.current.validateFields().then(() => {
      console.log(newValues)
      if (newValues.repeatPassword == newValues.password) {
        dispatch(
          createUser({
            user: newValues,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
              } else {
                toast.success(t('message.createSuccess'))

                setLoadPage(!loadPage)
                hideAdd(false)

                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'success', message }))
              }
            },
            onError({ data, message }) {
              console.log(data)
              toast.error(t('message.error'))
              // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
            },
          }),
        )
      }
      else {
        setShowWarning(true)
        setWarningText("warning.Check_repeatPassword")
      }

    })
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <Modal title={t("user.addNew")} style={{ textAlign: "center" }}
      visible={showAdd} width={1400}
      // onOk={() => {
      //   save();
      // }}
      onCancel={() => {
        hideAdd(false);
      }}
      footer={null}
    >
      <div>

        <div className="pt-6">
          <Form layout="vertical" ref={formRef} form={form}>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label={t('user.userName')}
                  name="userName"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                    {
                      max: 50,
                      message: t('validation.validMaxLength50'),
                    },
                  ]}
                >
                  <TextInput placeholder={t('user.userName')} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={t('user.fullName')}
                  name="fullName"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                    {
                      max: 50,
                      message: t('validation.validMaxLength50'),
                    },
                  ]}
                >
                  <TextInput placeholder={t('user.fullName')} />
                </FormItem>
              </Col>

            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label={t('user.password')} name="password"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                    {
                      max: 50,
                      message: t('validation.validMaxLength50'),
                    },
                  ]}>
                  <TextInput placeholder={t('user.password')} type="password" />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={t('user.repeatPassword')} name="repeatPassword"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                    {
                      max: 50,
                      message: t('validation.validMaxLength50'),
                    },
                  ]}>
                  <TextInput placeholder={t('user.repeatPassword')} type="password" />
                </FormItem>
              </Col>
            </Row>


            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label={t('user.phone')}
                  name="phone"
                  rules={[
                    {
                      max: 10,
                      message: t('validation.validMaxLength10'),
                    },
                  ]}
                >
                  <TextInput placeholder="0xxx-xxx-xxx" type='number' />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={t('user.email')}
                  name="email"
                >
                  <TextInput placeholder={t('placeholder.email')} />
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label={t('user.image')}
                  name="image"
                >
                  <UploadImage
                    name="file"
                    onChange={handleChangeAvatar}
                    uploadUrl="/api/cms/file/UploadFile"
                  >
                    {imageUrl ? (
                      <Image src={imageUrl} width={150} preview={false} />

                    ) : (
                      <>

                        <Image src="/assets/images/picture.png" width={150} preview={false} />
                      </>


                    )}
                  </UploadImage>

                </FormItem>
              </Col>
              {/* <Col span={12}>
                <FormItem
                  label={t('creativepost.Image')}
                  name="image"
                >
                  <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </FormItem>
              </Col> */}

            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label={t('user.address')}
                  name="address"
                >
                  <TextInput placeholder={t('user.address')} />

                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={t('user.gender')}
                >
                  <Radio.Group onChange={onChange} style={{ "float": "left" }}   value={value}  defaultValue={value}>
                    <Radio value={"M"}>{t('user.male')}</Radio>
                    <Radio value={"F"}>{t('user.female')}</Radio>
                    <Radio value={"O"}>{t('user.other')}</Radio>
                  </Radio.Group>

                </FormItem>
              </Col>
            </Row>


          </Form>
        </div>

      </div>
      <div className="flex justify-center pb-6">
        <PappperButton variant="primary" className="mr-2" rounded="button" loading={false} onClick={() => {
          save();
        }}>
          {t('button.save')}
        </PappperButton>

        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
          hideAdd(false);
        }} >
          {t('button.cancel')}
        </PappperButton>
      </div>
      <PopupCreatiPostModal showWarning={showWarning} hideShowWarning={setShowWarning} warning={warningText} />
    </Modal>

  )
}
