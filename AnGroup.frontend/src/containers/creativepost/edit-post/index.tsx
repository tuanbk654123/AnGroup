import { Col, Form, FormInstance, Modal, Row, UploadProps, Avatar, Image,Radio } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea, UploadImage } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
// import { categoryParentRequest,categoryGetByIdRequest,categoryUpdateIdRequest } from '~/redux/slices/category/middleware'
import { creativePostGetByIdRequest, creativePostUpdateIdRequest } from '~/redux/slices/creativepost/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { categoryGetAllRequest } from '~/redux/slices/category/middleware'
import type { RadioChangeEvent } from 'antd';

export const EditCreativePostModal = (props) => {
  const { showEdit, hideEdit, loadPage, setLoadPage, id, checkTable, total } = props;
  const initialSelectEdit = new Array(total).fill(false)
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [profile, setProfile] = useState(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [value, setValue] = useState(1);

  //const dataCategorysAll = useAppSelector((state) => state.category.dataCategorys)
  const [dataCategory, setDataCategory] = useState([])



  const getCreativePostById = () => {
    console.log(id)
    dispatch(
      creativePostGetByIdRequest({
        data: { id },
        onSuccess({ data, message }) {
          if (!data) {
            toast.warning(message)
          } else {
            console.log(data)

            setProfile({
              ...data,
            })
            setImageUrl(data.image);
            formRef.current?.setFieldsValue?.({
              ...data,
            })
            setValue(data.newsType)
          }
        },
        onError({ message }) {
          toast.error(t('message.error'))
        },
      }),
    )


  }
  const getAllCategory = () => {
    dispatch(
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
    // if (dataCategorysAll != null) {
    //   const _dataRole =
    //     dataCategorysAll.map?.((item) => {
    //       return {
    //         label: item.name, value: item.id
    //       }
    //     }) || []
    //   setDataCategory(_dataRole)
    // }
  }
  const handleChangeAvatar: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      console.log("TUAN" + JSON.stringify(info.file?.response));
    }
    if (info.file.status === 'done') {
      console.log("TUAN" + JSON.stringify(info));
      //setImageUrl(info.file.response.data);
      setImageUrl(process.env.REACT_APP_BASE_API_MINIO_URL + info.file.response.data);
    }
  }

  useEffect(() => {
    if (showEdit == true) {

      //getCreativePostParent()
      getCreativePostById()
      getAllCategory()

    }
    else {
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
    }

  }, [showEdit])
  

  const save = () => {
    const formValues = formRef.current.getFieldsValue()
    formValues.id = id
    const newPublic = formValues.isPublic ? 'Y' : 'N'
    const dataSubmit = {
      ...formValues,
      newsType:value,
      image: imageUrl
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        creativePostUpdateIdRequest({
          data: dataSubmit,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(t('message.updateSuccess'))
              checkTable(initialSelectEdit)
              setLoadPage(!loadPage)
              hideEdit(true)
            }
          },
          onError({ message }) {
            toast.error(t('message.error'))
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
    <Modal title={t("creativepost.editCreativePost")} style={{ textAlign: "center" }}
      visible={showEdit} width={1400}
      // onOk={() => {
      //   save();
      // }}
      onCancel={() => {
        hideEdit(false);
      }}
      footer={null}
    >
      <div>

        <div className="pt-6">
          <Form layout="vertical" ref={formRef} form={form}>
            <Row gutter={24}>
              <Col span={24}>
                <FormItem
                  label={t('creativepost.title')}
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
              <Col span={12} style={{ alignContent: 'flex-start' }} >
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
                      <Image src={imageUrl} width={150} preview={false} />

                    ) : (
                      <>
                        <Image src="/assets/images/picture.png" width={150} preview={false} />
                        {/* {avatarObj ? <Avatar src={avatarObj} size={150} /> : <Avatar size={150} icon={<UserOutlined />} />} */}
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
                  rules={[
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
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
          hideEdit(false);
        }} >
          {t('button.cancel')}
        </PappperButton>
        <PappperButton variant="primary" rounded="button" loading={false} onClick={() => {
          save();
        }}>
          {t('button.save')}
        </PappperButton>
      </div>
    </Modal>


  )
}
