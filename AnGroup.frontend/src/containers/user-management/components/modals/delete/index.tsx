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
import { deleteRequest,} from '~/redux/slices/user/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'

export const DeleteUserModal = (props) => {
  const {showDelete, hideDelete,loadPage,setLoadPage,ids} = props;
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()

//  useEffect(() => {
      
//  }, [showDelete])

  const save = () => {

      dispatch(
        deleteRequest({
          data: ids,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(t('message.updateSuccess'))
              setLoadPage(!loadPage)
              hideDelete(false)
            }
          },
          onError({ message }) {
            toast.error(t('message.error'))
          },
        }),
      )
    }
 

  return (
    <Modal title={t("category.deleteCategory")} style={{textAlign:"center"}}
          visible={showDelete} width={770}
          // onOk={() => {
          //   save();
          // }}
          onCancel={() => {
            hideDelete(false);
          }}
          footer={null}
          >
       <p>{t("confirm.delete")}</p>
       <div className="flex justify-center pb-6" style={{"marginTop":"30px"}}>
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
            hideDelete(false);
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
