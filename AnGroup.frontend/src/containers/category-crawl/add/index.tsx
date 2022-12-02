import { Checkbox, Col, Form, FormInstance, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, MultipleSelect, PapperCheckbox, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
import { TextEditor } from '~/components/common/form-control/text-editor'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { categoryCrawlCreateRequest } from '~/redux/slices/categorycrawl/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { from } from 'rxjs'
import TextArea from 'antd/lib/input/TextArea'
import { categoryGetAllRequest } from '~/redux/slices/category/middleware'

export const CreateCategoryCrawlModal = (props) => {
  const { showAdd, hideAdd, loadPage, setLoadPage } = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()



 

  useEffect(() => {

    if (showAdd == true) {
      form.setFieldsValue({
        name: null,
        link: null,
        
      })
    }
    console.log(1)


    // eslint-disable-next-line
  }, [showAdd]);

  const save = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      // categoryCrawlDtos: [
      //   {}
      // ],
      // configCategoryHomeCrawlDtos: {},
      // parentId: values.parentId || null,
    }
    formRef.current.validateFields().then(() => {
      dispatch(
        categoryCrawlCreateRequest({
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

 
  return (
    <Modal title={t("creativepost.web_title")} style={{ textAlign: "center" }}
      visible={showAdd} width={1100}
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
                  label={t('configuration.Name')}
                  name="name"
                  required
                  rules={[
                    { required: true, message: t('validation.required') },
                    {
                      max: 255,
                      message: t('validation.validMaxLength255'),
                    },
                  ]}
                >
                  <TextInput placeholder={t('configuration.Name')} />
                </FormItem>
              </Col>
              <Col span={12}>
                  <FormItem
                    label={t('createpost.Link')}
                    name="link"
                    required
                    rules={[
                      { required: true, message: t('validation.required') },
                      {
                        max: 255,
                        message: t('validation.validMaxLength255'),
                      },
                    ]}
                  >
                    <TextInput placeholder={t('createpost.Link')} />
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
    </Modal>

  )
}
