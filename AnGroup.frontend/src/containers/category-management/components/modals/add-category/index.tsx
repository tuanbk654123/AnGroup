import { Col, Form, FormInstance, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState,useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { categoryCreateRequest,categoryParentRequest } from '~/redux/slices/category/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { from } from 'rxjs'

export const CreateCategoryModal = (props) => {
  const {showAdd, hideAdd,loadPage,setLoadPage} = props;
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()

   const dataCategoryParentList = useAppSelector((state) => state.category.dataCategorys)
  const[dataCategoryParent,setDataCategoryParent]=useState([])

  

  
  const getCategoryParent = () => {
    dispatch(
      categoryParentRequest({
        onSuccess({ data, message }) {
          console.log(data)
          if (!data) {
            console.log(data)
            
            //toast.warning(message)
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
          } else {
            const _dataRole =
            data.map?.((item) => {
              return {
                label: item.name, value: item.id
              }
            }) || []
             setDataCategoryParent(_dataRole)
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'success', message }))
          }
        },
        onError({ data, message }) {
          // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
        },
      }),
    )
    // if(dataCategoryParentList !=null){
    //   const _dataRole =
    //   dataCategoryParentList.map?.((item) => {
    //       return {
    //         label: item.name, value: item.id
    //       }
    //     }) || []
    //      setDataCategoryParent(_dataRole)
    // }
    }
  useEffect(() => {
    
    if(showAdd==true){
      form.setFieldsValue({
        code:null,
        name:null,
        parentId:null,
        description:null,
        position:0,
        order:0,
        status:null
      })
      getCategoryParent()
    }
    console.log(1)


    // eslint-disable-next-line
  }, [showAdd]);

  const save = () => {
    const values = formRef.current.getFieldsValue()
    const newValues = {
      ...values,
      parentId: values.parentId==null?0 :values.parentId ,
    }
    formRef.current.validateFields().then(() => {
      dispatch(
        categoryCreateRequest({
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
    <Modal title={t("category.createdCategory")} style={{textAlign:"center"}}
          visible={showAdd} width={770}
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
                      label={t('category.Code')}
                      name="code"
                      required
                      rules={[
                        { required: true, message: t('validation.required') },
                        {
                          max: 10,
                          message: t('validation.validMaxLength10'),
                        },
                      ]}
                    >
                      <TextInput placeholder={t('category.Code')} />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label={t('category.Name')}
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
                      <TextInput placeholder={t('category.Name')} />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label={t('category.ParentName')}
                      name="parentId"
                    >
                       <SelectBox
                        allowClear
                        placeholder={t('category.ParentName')}
                        options={dataCategoryParent}
                        style={{"textAlign":"initial"}}
                      />
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
                      label={t('category.position')}
                      name="position"
                    >
                       <TextInput placeholder={t('category.Order')} type="Number" />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label={t('category.Order')}
                      name="order"
                    >
                      <TextInput placeholder={t('category.Order')} type="Number" />
                    </FormItem>
                    
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label={t('table.column.status')}
                      name="status"
                      rules={[{ required: true, message: t('validation.required') }]}
                    >
                      <SelectBox
                        options={[
                          { label: t('select.active'), value: 'A' },
                          { label: t('select.inActive'), value: 'I' },
                        ]}
                        placeholder={t('placeholder.Active/Inactive')}
                      />
                    </FormItem>
                  </Col>
                </Row>
                
              </Form>
            </div>
      
          </div>
          <div className="flex justify-center pb-6">
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
            hideAdd(false);
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

//     <Modal wrapClassName="papper-modal__custom"  width={770}
//     //@ts-ignore
//     closeIcon={<CloseIcon onClick={props.onCancel} />}>
// <div>
      
//       <div className="pt-6">
//         <Form layout="vertical" ref={formRef}  form={form}>
//           <Row gutter={24}>
//             <Col span={12}>
//               <FormItem
//                 label={t('category.Code')}
//                 name="code"
//                 required
//                 rules={[
//                   { required: true, message: t('validation.required') },
//                   {
//                     max: 100,
//                     message: t('validation.validMaxLength100'),
//                   },
//                 ]}
//               >
//                 <TextInput placeholder={t('category.Code')} />
//               </FormItem>
//             </Col>
//             <Col span={12}>
//               <FormItem
//                 label={t('category.Name')}
//                 name="name"
//                 required
//                 rules={[
//                   { required: true, message: t('validation.required') },
//                   {
//                     max: 100,
//                     message: t('validation.validMaxLength100'),
//                   },
//                 ]}
//               >
//                 <TextInput placeholder={t('category.Name')} />
//               </FormItem>
//             </Col>
//           </Row>
//           <Row gutter={24}>
//             <Col span={12}>
//               <FormItem
//                 label={t('category.Parent')}
//                 name="parent"
//                 required
//                 rules={[{ required: true, message: t('validation.required') }]}
//               >
//                  <SelectBox
//                   allowClear
//                   placeholder={t('placeholder.eformType')}
//                   options={dataProductType}
//                   disabled={dataProductType.length > 0 ? false : true}
//                 />
//               </FormItem>
//             </Col>
//           </Row>
          
//           <Row>
//             <Col span={24}>
//               <FormItem label={t('notification.description')} name="description">
//                 <TextInputArea placeholder={t('placeholder.description')} />
//               </FormItem>
//             </Col>
//           </Row>
//           <Row >
//             <Col span={24}>
//               <FormItem
//                 label={t('category.position')}
//                 name="formType"
//                 required
//                 rules={[{ required: true, message: t('validation.required') }]}
//               >
//                 <SelectBox
//                   placeholder={t('category.position')}
//                   options={[
//                     { label: t('select.UNSECUREDLOAN'), value: 1 },
//                     // { label: t('select.UNSECUREDLOANEFORM'), value: 11 },
//                     { label: t('select.CREDITCARD'), value: 2 },
//                     // { label: t('select.CREDITCARDEFORM'), value: 21 },
//                   ]}
//                   onChange={handleFormType}
//                 />
//               </FormItem>
//             </Col>

            
//           </Row>
//           <Row>
//           <Col span={24}>
//               <FormItem
//                 label={t('category.Order')}
//                 name="parentId"
//               // required
//               // rules={[{ required: true, message: t('validation.required') }]}
//               >
//               </FormItem>
//             </Col>
//           </Row>
//           <Row>
//             <Col span={24}>
//               <FormItem
//                 label={t('table.column.status')}
//                 name="status"
//                 rules={[{ required: true, message: t('validation.required') }]}
//               >
//                 <SelectBox
//                   options={[
//                     { label: t('select.active'), value: 'A' },
//                     { label: t('select.inActive'), value: 'I' },
//                   ]}
//                   placeholder={t('placeholder.Active/Inactive')}
//                 />
//               </FormItem>
//             </Col>
//           </Row>
//         </Form>
//       </div>

//       <div className="flex justify-center pb-6">
//         <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={handleClose}>
//           {t('button.cancel')}
//         </PappperButton>
//         <PappperButton variant="primary" rounded="button" onClick={handleSubmit} loading={false}>
//           {t('button.save')}
//         </PappperButton>
//       </div>

//       {/* <PaperConfirmModal
//         type={modalConfirm.status as TConfirmModalListType}
//         message={modalConfirm.message}
//         visible={modalConfirm.isOpen}
//         onOk={closePopup}
//         // onOk={() => setModalConfirm((prev) => ({ ...prev, isOpen: false }))}
//       /> */}
//     </div>
//       </Modal>
    
  )
}
