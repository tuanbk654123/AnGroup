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
import { categoryParentUpdateRequest,categoryGetByIdRequest,categoryUpdateIdRequest } from '~/redux/slices/category/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'

export const EditCategoryModal = (props) => {
  const {showEdit, hideEdit,loadPage,setLoadPage,id,checkTable,total} = props;
  const initialSelectEdit = new Array(total).fill(false)
  const formRef = useRef<FormInstance>(null)
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()
  const [profile, setProfile] = useState(null)


   const dataCategoryParentList = useAppSelector((state) => state.category.dataCategorys)
   const dataCategoryDetail = useAppSelector((state) => state.category.dataCategoryDetails)
  const[dataCategoryParent,setDataCategoryParent]=useState([])

  const getCategoryParent = () => {
    dispatch(
      categoryParentUpdateRequest({
        data:{id:id},
        onSuccess({ data, message }) {
          if (!data) {
            toast.warning(message)
          } else {
            const _dataRole =
      data.map?.((item,index) => {
        // if(index==0){
        //   return {
        //     label: null, value: 0
        //   }
        // }
          return {
            label: item.name, value: item.id
          }
        }) || []
         setDataCategoryParent(_dataRole)
          }
        },
        onError({ message }) {
          toast.error(t('message.error'))
        },
      }),
    )
    // if(dataCategoryParentList !=null){
    //   const _dataRole =
    //   dataCategoryParentList.map?.((item,index) => {
    //     // if(index==0){
    //     //   return {
    //     //     label: null, value: 0
    //     //   }
    //     // }
    //       return {
    //         label: item.name, value: item.id
    //       }
    //     }) || []
    //      setDataCategoryParent(_dataRole)
    // }
    }

  
  const getCategoryById = () => {
    console.log(id)
    dispatch(
      categoryGetByIdRequest({
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
      if(showEdit==true){
       
        getCategoryParent()
        getCategoryById()
        
       
      }
      else{
        form.setFieldsValue({
          code:null,
          name:null,
          parentId:null,
          description:null,
          position:0,
          order:0,
          status:null
        })
      }
      
    }, [showEdit])

  const save = () => {
    const formValues = formRef.current.getFieldsValue()
    formValues.id=id
    const newPublic = formValues.isPublic ? 'Y' : 'N'
    const dataSubmit = {
      ...formValues,
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        categoryUpdateIdRequest({
          data: dataSubmit,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(t('message.updateSuccess'))
              checkTable(initialSelectEdit)
              setLoadPage(!loadPage)
              hideEdit(false)
            }
          },
          onError({ message }) {
            toast.error(t('message.error'))
          },
        }),
      )
    })
    }
 

  return (
    <Modal title={t("category.editCategory")} style={{textAlign:"center"}}
          visible={showEdit} width={770}
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
