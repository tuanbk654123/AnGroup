import { Col, Form, FormInstance, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
// import { categoryParentRequest,categoryGetByIdRequest,categoryUpdateIdRequest } from '~/redux/slices/category/middleware'
import { configCategoryHomeCrawlGetByIdRequest, configCategoryHomeCrawlCreateRequest, configCategoryHomeCrawlUpdateIdRequest } from '~/redux/slices/configcategoryhomecrawl/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon, LoadingSelectIcon } from '~/components/common/icons/index'
import { categoryGetAllRequest } from '~/redux/slices/category/middleware'
import { PopupCreatiPostModal } from '~/containers/creativepost/popup'
import "~/components/common/loading/style.scss"

export const EditConfigCategotyCrawlModal = (props) => {
  const { id, showEdit, hideView, showCheckDataAdd, setShowCheckDataAdd, setCheckConfigCategory, checkConfigCategory } = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [showEditor, setShowEditor] = useState(false)
  const [profile, setProfile] = useState(null)
  const [showWarning, setShowWarning] = useState(false)
  const [warningText, setWarningText] = useState(null)

  const loading = useAppSelector((state) => state.configCategoryHomeCrawl.loading)
  //const { id } = useParams()

  const [dataCategory, setDataCategory] = useState([])

  const getConfigCategoryHomeCrawl = () => {
    dispatch(
      configCategoryHomeCrawlGetByIdRequest({
        data: { id },
        onSuccess({ data, message }) {
          if (!data) {
            toast.warning(message)
          } else {
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
    // if(dataCategorysAll !=null){
    //   console.log(dataCategorysAll)
    //   const _dataRole =
    //   dataCategorysAll.map?.((item) => {
    //       return {
    //         label: item.name, value: item.id
    //       }
    //     }) || []
    //     setDataCategory(_dataRole)
    // }
  }
  useEffect(() => {
    console.log(123)
    if (showEdit == true) {
      if (showCheckDataAdd?.checkCategoryData == true) {
        getConfigCategoryHomeCrawl()
      }
    }
    else {
      form.setFieldsValue({
        className: null,
        tagName: null,
      })
    }



  }, [checkConfigCategory])


  const save = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      LinkHomeCrawlId: id,
    }
    if (showCheckDataAdd.checkCategoryData == true) {
      formRef.current.validateFields().then(() => {
        dispatch(
          configCategoryHomeCrawlUpdateIdRequest({
            data: newValues,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
              } else {
                if (data?.checkNullLinhPage == false) {
                  setShowWarning(true)
                  setWarningText("warning.Check_data_edit_category_crawl")
                }
                else {
                  toast.success(t('message.updateSuccess'))
                  setShowCheckDataAdd({ ...showCheckDataAdd, checkPage: false, checkCategoryData: true })
                }
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
    else {
      formRef.current.validateFields().then(() => {
        dispatch(
          configCategoryHomeCrawlCreateRequest({
            data: newValues,
            onSuccess({ data, message }) {
              if (!data) {
                toast.warning(message)
                // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
              } else {
                toast.success(t('message.updateSuccess'))
                setShowCheckDataAdd({ ...showCheckDataAdd, checkPage: false, checkCategoryData: true })


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
      </Form>
      <div className="flex justify-center pb-6">
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
          hideView(false);
        }}>
          {t('button.cancel')}
        </PappperButton>
        <PappperButton variant="primary" rounded="button" loading={false} onClick={() => {
          save();
        }} disabled={showCheckDataAdd?.checkCategoryData}>
          {t('button.save')}
        </PappperButton>
      </div>
      <PopupCreatiPostModal showWarning={showWarning} hideShowWarning={setShowWarning} warning={warningText} />
    </div>
  )
}
