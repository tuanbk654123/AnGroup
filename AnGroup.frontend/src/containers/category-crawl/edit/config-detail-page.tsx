import { Col, Form, FormInstance, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState,useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
// import { categoryParentRequest,categoryGetByIdRequest,categoryUpdateIdRequest } from '~/redux/slices/category/middleware'
import { configDetailPageCrawlGetByIdRequest,configDetailPageCrawlCreateRequest,configDetailPageCrawlUpdateIdRequest } from '~/redux/slices/configdetailpagecrawl/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { categoryGetAllRequest } from '~/redux/slices/category/middleware'
import "~/components/common/loading/style.scss"

export const EditConfigDetailPageCrawlModal = (props) => {
  const { id ,showEdit,hideView,showCheckDataAdd,setShowCheckDataAdd} = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [showEditor, setShowEditor] = useState(false)
  const [profile, setProfile] = useState(null)


  const loading = useAppSelector((state) => state.configPageCategoryCrawl.loading)
  const[dataCategory,setDataCategory]=useState([])


  
  const getConfigDetailPageCrawl = () => {
    console.log(id)
    dispatch(
      configDetailPageCrawlGetByIdRequest({
        data: {id},
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              console.log(data)
    
                setProfile({
                  ...data,
                })
                formRef.current?.setFieldsValue?.({
                  ...data,
                })
            }
          },
          onError({ message }) {
            toast.error(t('message.error'))
          },
      }),
    )


    }
    
    useEffect(() => {
      if (showEdit == true) {
        //có giá trị gọi get by id
        if (showCheckDataAdd?.checkDetailPageData == true) {
          getConfigDetailPageCrawl()
        }
      }
      else {
        form.setFieldsValue({
          className: null,
          tagName: null,
        })
      }
      
    }, [showEdit])

  const save = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      LinkHomeCrawlId: id,
      Domain:showCheckDataAdd.link,
    }
    //có dữ liệu update
    if(showCheckDataAdd.checkDetailPageData==true){
      formRef.current.validateFields().then(() => {
        dispatch(
          configDetailPageCrawlUpdateIdRequest({
            data: newValues,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
              } else {
                toast.success(t('message.updateSuccess'))
                setShowCheckDataAdd({...showCheckDataAdd,checkDetailPage:false,checkDetailPageData:true})
                
  
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
    //khong có dữ liệu thêm mới
    else{
      console.log(newValues)
      formRef.current.validateFields().then(() => {
        dispatch(
          configDetailPageCrawlCreateRequest({
            data: newValues,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
              } else {
                toast.success(t('message.updateSuccess'))
                setShowCheckDataAdd({...showCheckDataAdd,checkDetailPage:false,checkDetailPageData:true})
                
  
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
    } //hideAdd(true)

    }
 

  return (
    <div className="pt-6">
       {
        loading ?  <div id="loading"></div> : null
      }
<Form layout="vertical" ref={formRef} form={form}>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  label={t('configdetailpagecrawl.classData')}
                  name="classData"
                  
                >
                  <TextInput placeholder={t('configdetailpagecrawl.classData')}/>
                </FormItem>
              </Col>
              <Col span={12}>
                     <FormItem
                      label={t('configdetailpagecrawl.tagData')}
                      name="tagData"
                      required
                      rules={[
                        { required: true, message: t('validation.required') },
                        {
                          max: 500,
                          message: t('validation.validMaxLength500'),
                        },
                      ]}
                    >
                      <TextInput placeholder={t('configdetailpagecrawl.tagData')} />
                    </FormItem>
                  </Col>

            </Row>
            
            <Row gutter={24}>
                  <Col span={12}>
                  <FormItem
                      label={t('configdetailpagecrawl.classTitle')}
                      name="classTitle"
                    >
                     <TextInput placeholder={t('configdetailpagecrawl.classTitle')} />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                     <FormItem
                      label={t('configdetailpagecrawl.tagTitle')}
                      name="tagTitle"
                      required
                      rules={[
                        { required: true, message: t('validation.required') },
                        {
                          max: 500,
                          message: t('validation.validMaxLength500'),
                        },
                      ]}
                    >
                      <TextInput placeholder={t('configdetailpagecrawl.tagTitle')} />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                  <FormItem
                      label={t('configdetailpagecrawl.classDate')}
                      name="classDate"
                    >
                     <TextInput placeholder={t('configdetailpagecrawl.classDate')} />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                     <FormItem
                      label={t('configdetailpagecrawl.tagDate')}
                      name="tagDate"
                      required
                      rules={[
                        { required: true, message: t('validation.required') },
                        {
                          max: 500,
                          message: t('validation.validMaxLength500'),
                        },
                      ]}
                    >
                      <TextInput placeholder={t('configdetailpagecrawl.tagDate')} />
                    </FormItem>
                  </Col>
                </Row> 
                <Row gutter={24}>
                  <Col span={12}>
                  <FormItem
                      label={t('configdetailpagecrawl.classImage')}
                      name="classImages"
                    >
                     <TextInput placeholder={t('configdetailpagecrawl.classDate')} />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                     <FormItem
                      label={t('configpagecategorycrawl.tagImage')}
                      name="tagImages"
                      required
                      rules={[
                        { required: true, message: t('validation.required') },
                        {
                          max: 500,
                          message: t('validation.validMaxLength500'),
                        },
                      ]}
                    >
                      <TextInput placeholder={t('configpagecategorycrawl.tagImage')} />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
              <Col span={24}>
                <FormItem label={t('configpagecategorycrawl.tagContent')} name="tagContent"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                  ]}>
                  <TextInputArea placeholder={t('configpagecategorycrawl.tagContent')} />
                </FormItem>
              </Col>
            </Row> 
          </Form>
        

          <div className="flex justify-center pb-6">
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
            hideView(false);
          }} >
          {t('button.cancel')}
        </PappperButton>
        <PappperButton variant="primary" rounded="button" loading={false} onClick={() => {
            save();
          }} disabled={showCheckDataAdd?.checkDetailPageData}>
          {t('button.save')}
        </PappperButton>
        </div>
    </div>
          

    
  )
}
