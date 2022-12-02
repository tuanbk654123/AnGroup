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
import { creativePostUpdateListIdShowRequest} from '~/redux/slices/creativepost/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'
import { ECreativePostTypeValue } from '../search/index.types'

export const PopupShowHideModal = (props) => {
  const {showHide,hideShowHide,showText,data,loadPage,setLoadPage,ids, setIds} = props;
  
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch();
  const[dataDate,setDataDate]=useState(null)
  const save = () => {
    dispatch(
      creativePostUpdateListIdShowRequest({
        data: {id:ids.length>0?ids:data},
        onSuccess({ data, message }) {
          if (!data) {
            toast.warning(message)
            // setModalConfirm((prev) => ({ ...prev, isOpen: true, status: 'warning', message }))
          } else {
            toast.success(t('message.updateSuccess'))
            
            setLoadPage(!loadPage)
            hideShowHide(false)
            
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
    };
    useEffect(() => {
    
      if(showHide==true){
      }
      else{
        
        setIds([])
      }
      
      
  
  
      // eslint-disable-next-line
    }, [showHide]);
  return (
    <Modal title={t("notification.notification")} style={{textAlign:"center"}}
          visible={showHide}
          onCancel={() => {
            hideShowHide(false);
          }}
          footer={null}
          >
      <p>{t(showText)}</p>
          <div className="flex justify-center pb-6" style={{"marginTop":"30px"}}>
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
            hideShowHide(false);
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
