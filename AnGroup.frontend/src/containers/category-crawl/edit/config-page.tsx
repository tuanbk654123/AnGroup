import { Checkbox, Col, Form, FormInstance, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
// import { categoryParentRequest,categoryGetByIdRequest,categoryUpdateIdRequest } from '~/redux/slices/category/middleware'
import { configPageCategoryCrawlGetByIdRequest,configPageCategoryCrawlCreateRequest,configPageCategoryCrawlUpdateIdRequest } from '~/redux/slices/configpagecategorycrawl/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { categoryGetAllRequest } from '~/redux/slices/category/middleware'
import "~/components/common/loading/style.scss"

export const EditConfigPageCrawlModal = (props) => {
  const { id, showEdit, hideView, showCheckDataAdd, setShowCheckDataAdd } = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [showEditor, setShowEditor] = useState(false)
  const [profile, setProfile] = useState(null)


  const loading = useAppSelector((state) => state.configDetailPageCrawl.loading)
  const [dataCategory, setDataCategory] = useState([])



  const getConfigPageCategoryCrawl = () => {
    console.log(id)
    dispatch(
      configPageCategoryCrawlGetByIdRequest({
        data: { id },
        onSuccess({ data, message }) {
          if (!data) {
            toast.warning(message)
          } else {
            console.log(data)

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
      if (showCheckDataAdd?.checkPageData == true) {
        getConfigPageCategoryCrawl()
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
    console.log(showCheckDataAdd)
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      LinkHomeCrawlId: id,
      Domain:showCheckDataAdd.Link,
    }
    //có dữ liệu update
    if(showCheckDataAdd.checkPageData==true){
      formRef.current.validateFields().then(() => {
        dispatch(
          configPageCategoryCrawlUpdateIdRequest({
            data: newValues,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
              } else {
                toast.success(t('message.updateSuccess'))
                setShowCheckDataAdd({...showCheckDataAdd,checkDetailPage:false,checkPageData:true})
                
  
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
      formRef.current.validateFields().then(() => {
        dispatch(
          configPageCategoryCrawlCreateRequest({
            data: newValues,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
              } else {
                toast.success(t('message.updateSuccess'))
                setShowCheckDataAdd({...showCheckDataAdd,checkDetailPage:false,checkPageData:true})
                
  
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
              label={t('configcategoryhomecrawl.className')}
              name="className"
            >
              <TextInput placeholder={t('configcategoryhomecrawl.className')} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={t('configcategoryhomecrawl.tagName')}
              name="tagName"
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 500,
                  message: t('validation.validMaxLength500'),
                },
              ]}
            >
              <TextInput placeholder={t('configcategoryhomecrawl.tagName')} />
            </FormItem>


          </Col>

        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              label={t('configpagecategorycrawl.tagContent')}
              name="tagContent"
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 500,
                  message: t('validation.validMaxLength500'),
                },
              ]}
            >
              <TextInput placeholder={t('configpagecategorycrawl.tagContent')} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={t('configpagecategorycrawl.tagImage')}
              name="tagImage"
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
          <Col span={12}>
            <FormItem
              label={t('configpagecategorycrawl.structCategory')}
              name="structCategory"
            >
              <TextInput placeholder={t('configpagecategorycrawl.structCategory')} />
            </FormItem>
          </Col>

          <Col span={12}>
              <FormItem
                label={t('configpagecategorycrawl.structMorePage')}
                name="structMorePage"
                required
                rules={[
                  { required: true, message: t('validation.required') },
                  {
                    max: 500,
                    message: t('validation.validMaxLength500'),
                  },
                ]}
              >
                <TextInput placeholder={t('configpagecategorycrawl.structMorePage')} />
              </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              label={t('configpagecategorycrawl.limitedPage')}
              name="limitedPage"
              rules={[
                { required: true, message: t('validation.required') },
              ]}
            >
              <TextInput placeholder={t('configpagecategorycrawl.limitedPage')} type="Number" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={t('configpagecategorycrawl.isCrawl')}
              name="isCrawl"
            >
              <Checkbox />
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
        }} disabled={showCheckDataAdd?.checkPageData}>
          {t('button.save')}
        </PappperButton>
      </div>
    </div>



  )
}
