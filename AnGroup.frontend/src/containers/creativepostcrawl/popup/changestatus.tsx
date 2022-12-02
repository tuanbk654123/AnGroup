import { Col, Form, FormInstance, Modal, Row,Space,DatePicker,DatePickerProps } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useMemo, useState,useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextInput, TextInputArea } from '~/components/common'
// import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { creativePostUpdateListIdStatusRequest} from '~/redux/slices/creativepost/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { ECreativePostTypeValue } from '../search/index.types'

export const PopupChangeStatusModal = (props) => {
  const {showStatus,hideShowStatus,showText,data,type,loadPage,setLoadPage} = props;
  
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch();
  const[checkError,setCheckError]=useState(true)
  const[checkType,setCheckType]=useState(true)
  const[dataDate,setDataDate]=useState(null)
  const[checkDate,setCheckDate]=useState(null)
  const save = () => {
    if(type==ECreativePostTypeValue.calendar){
      if(dataDate==null || dataDate==undefined){
        setCheckError(false)
        return
      }
      else{

      }
    }
    dispatch(
      creativePostUpdateListIdStatusRequest({
        data: {status:type,
          id:data,
          dateCalendar:dataDate
  
        },
        onSuccess({ data, message }) {
          if (!data) {
            toast.warning(message)
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
          } else {
            toast.success(t('message.createSuccess'))
            
            setLoadPage(!loadPage)
            hideShowStatus(false)
            
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'success', message }))
          }
        },
        onError({ data, message }) {
          toast.error(t('message.error'))
          // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
        },
      }),
    )
    }
    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
      console.log(dateString);
      setDataDate(dateString)
      setCheckDate(date)
    };
    useEffect(() => {
    
      if(showStatus==true){
        if(type==ECreativePostTypeValue.calendar){
          setCheckType(false)
        }
      }
      else{
        setCheckType(true)
        setCheckError(true)
        setDataDate(null)
        setCheckDate(null)
        console.log(1)
      }
      
  
  
      // eslint-disable-next-line
    }, [showStatus]);
  return (
    <Modal title={t("notification.notification")} style={{textAlign:"center"}}
          visible={showStatus}
          onCancel={() => {
            hideShowStatus(false);
          }}
          footer={null}
          >
       <div>
      <p>{t(showText)}</p>
      <div hidden={checkType}>
        <div className="pt-6">
        <label style={{"color":"red"}}>{"*"}</label>
        <label title={t("creativepost.appointment_date")}>{t("creativepost.appointment_date")+":   "}</label>
          
        <Space direction="vertical">
    <DatePicker  format="yyyy-MM-DD" placeholder="YYYY-MM-DD" onChange={onChange} value={checkDate}/>
  </Space>
        </div>
        <div role="alert" className="ant-form-item-explain-error" hidden={checkError}>{t("validation.required")}</div>
      
      </div>
      
          </div>
          <div className="flex justify-center pb-6" style={{"marginTop":"30px"}}>
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
            hideShowStatus(false);
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
