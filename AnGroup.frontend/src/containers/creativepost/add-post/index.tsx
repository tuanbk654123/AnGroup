import { Avatar, Checkbox, Col, Form, FormInstance, Modal, Row,Radio } from 'antd'
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
import { creativePostCreateRequest, creativePostUploadFileRequest } from '~/redux/slices/creativepost/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { from } from 'rxjs'
import TextArea from 'antd/lib/input/TextArea'
import { categoryGetAllRequest } from '~/redux/slices/category/middleware'
import { Image, UploadProps } from 'antd';
import type { RadioChangeEvent } from 'antd';
import Upload from 'antd/lib/upload/Upload'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



type ImageResponse = {
  code: number
  data: string
}


export const CreateCreativePostModal = (props) => {
  const { showAdd, hideAdd, loadPage, setLoadPage } = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [avatarResponse, setAvatarResponse] = useState<ImageResponse>({} as any)
  const [value, setValue] = useState(1);


  const dataCategorysAll = useAppSelector((state) => state.category.dataCategorys)
  const[dataCategory,setDataCategory]=useState([])

  const getAllCategory = async () => {
    await dispatch(
      categoryGetAllRequest({
        onSuccess: ({ data, message }) => {
          if (data != null) {
            const _dataRole =
            data.map?.((item) => {
                return {
                  label: item.name, value: item.id
                }
              }) || []
            setDataCategory(_dataRole)
          }
        },
        onError: ({ message }) => {
          toast.error(t('message.error'))
        }
      }),
    )

  }

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
        title: null,
        description: null,
        contentHTML: null,
        categoryId: null ,
        author:null ,
        address:null ,
        tags:null ,
        comment:null ,
      })
      setImageUrl(null);
      setValue(1)
      getAllCategory()
    }
    console.log(1)


    // eslint-disable-next-line
  }, [showAdd]);

  const save = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      newsType:value,
      // parentId: values.parentId || null,
      //image : env.REACT_APP_BASE_API_MINIO_URL+ imageUrl,
      image: imageUrl
    }
    formRef.current.validateFields().then(() => {
      dispatch(
        creativePostCreateRequest({
          data: newValues,
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
            toast.error(t('message.error'))
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
          },
        }),
      )
    })
  }

  const pendding = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      status: 1,
      image: imageUrl,
      newsType:value
    }
    formRef.current.validateFields().then(() => {
      dispatch(
        creativePostCreateRequest({
          data: newValues,
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
            toast.error(t('message.error'))
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
          },
        }),
      )
    })
  }
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <Modal title={t("creativepost.web_title")} style={{ textAlign: "center" }}
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
              <Col span={24}>
                <FormItem
                  label={t('creativepost.code')}
                  name="title"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                    {
                      max: 255,
                      message: t('validation.validMaxLength255'),
                    },
                  ]}
                >
                  <TextInput placeholder={t('creativepost.title')} />
                </FormItem>
              </Col>
              {/* <Col span={12}>
                     <FormItem
                      label={t('creativepost.address')}
                      name="address"
                      required
                      rules={[
                        { required: true, message: t('validation.required') },
                        {
                          max: 10,
                          message: t('validation.validMaxLength10'),
                        },
                      ]}
                    >
                      <TextInput placeholder={t('creativepost.address')} />
                    </FormItem>
                  </Col> */}

            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <FormItem label={t('notification.description')} name="description"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                  ]}>
                  <TextInputArea placeholder={t('placeholder.description')} />
                </FormItem>
              </Col>
            </Row>


            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  label={t('creativepost.CategoryId')}
                  name="categoryId"
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <SelectBox
                    allowClear
                    placeholder={t('creativepost.CategoryId')}
                    options={dataCategory}
                    style={{ "textAlign": "initial" }}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem
                    label={t('creativepost.author')}
                    name="author"
                    required
                    rules={[
                      { required: true, message: t('validation.required') },
                      {
                        max: 255,
                        message: t('validation.validMaxLength255'),
                      },
                    ]}
                  >
                    <TextInput placeholder={t('creativepost.author')} />
                  </FormItem>


              </Col>

              <Col span={8}>
                  <FormItem
                    label={t('creativepost.address')}
                    name="address"
                  >
                    <TextInput placeholder={t('creativepost.address')} />
                  </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label={t('creativepost.Image')}
                  name="image"
                  required
                  rules={[{ required: true, message: t('validation.required') }]}
                >
                  <UploadImage
                    name="file"
                    onChange={handleChangeAvatar}
                    uploadUrl="/api/cms/file/UploadFile"
                  >
                    {imageUrl ? (
                      <Image src={imageUrl} width={150} preview = {false} />

                    ) : (
                      <>

                        <Image src="/assets/images/picture.png" width={150} preview = {false}  />
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
              <Col span={24}>
                <FormItem
                  label={t('creativepost.content')}
                  name="contentHTML"
                  required
                  rules={[{ required: true, message: t('validation.required') }]}

                >
                  <TextEditor placeholder={t('placeholder.content')} />
                  {/* <Editor
                   placeholder={t('placeholder.content')}
                  // editorState={editorState}
                  // toolbarClassName="toolbarClassName"
                  // wrapperClassName="wrapperClassName"
                  // editorClassName="editorClassName"
                  // onEditorStateChange={this.onEditorStateChange}
                /> */}
                </FormItem>
              </Col>

            </Row>
            {/* <Row gutter={24}>
                  <Col span={12}>
                  <FormItem
                      label={t('table.column.status')}
                      name="status"
                      rules={[{ required: true, message: t('validation.required') }]}
                    >
                      <SelectBox
                        options={[
                          { label: t('status.Draft'), value: 0 },
                          { label: t('status.Calendar'), value: 4 },
                          { label: t('status.Reject'), value: 3 },
                          { label: t('status.Approval'), value: 2 },
                          { label: t('status.Waiting'), value: 1 },
                  
                        ]}
                        placeholder={t('placeholder.Active/Inactive')}
                      />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                  <FormItem
                      label={t('table.column.type')}
                      name="type"
                      rules={[{ required: true, message: t('validation.required') }]}
                    >
                      <SelectBox
                        options={[
                          { label: t('createposttype.Internal'), value: 0 },
                          { label: t('createposttype.crawlWeb'), value: 1 },
                          { label: t('createposttype.Colaborator'), value: 2 },
                          { label: t('createposttype.crawFacebook'), value: 3 }
                        ]}
                        placeholder={t('placeholder.Active/Inactive')}
                      />
                    </FormItem>
                  </Col>
                </Row>
                 */}
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label={t('creativepost.tag')}
                  name="tags"
                  // required
                  rules={[
                    //{ required: true, message: t('validation.required') },
                    {
                      max: 512,
                      message: t('validation.validMaxLength512'),
                    },
                  ]}
                >
                  <TextInput placeholder={t('creativepost.tag')} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label={t('creativepost.newsType')}
                >
                  <Radio.Group onChange={onChange} style={{ "float": "left" }}  value={value}  defaultValue={value}>
                    <Radio value={1}>{t('creativepost.postText')}</Radio>
                    <Radio value={2}>{t('creativepost.postImage')}</Radio>
                    <Radio value={3}>{t('creativepost.postVideo')}</Radio>
                  </Radio.Group>

                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <FormItem
                  label={t('creativepost.comment')}
                  name="comment"
                  //required
                  //rules={[{ required: true, message: t('validation.required') }]}
                >
                  <TextInputArea placeholder={t('placeholder.comment')} />
                </FormItem>
              </Col>

            </Row>
          </Form>
        </div>

      </div>
      <div className="flex justify-center pb-6">
        <PappperButton variant="primary" className="mr-2" rounded="button" loading={false} >
          {t('button.preview')}
        </PappperButton>
        <PappperButton variant="primary" className="mr-2" rounded="button" loading={false} onClick={() => {
          save();
        }}>
          {t('button.save')}
        </PappperButton>

        <PappperButton variant="danger" className="mr-2" rounded="button" loading={false} onClick={() => {
          pendding();
        }}>
          {t('button.pendding')}
        </PappperButton>

        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
          hideAdd(false);
        }} >
          {t('button.cancel')}
        </PappperButton>
      </div>
    </Modal>

  )
}
