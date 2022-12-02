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
import { categoryParentRequest,categoryGetByIdRequest,categoryUpdateIdRequest } from '~/redux/slices/category/middleware'
import { RouterHelper } from '~/utils'
import { CloseIcon } from '~/components/common/icons/index'

export const PopupCreatiPostModal = (props) => {
  const {showWarning,hideShowWarning,warning} = props;
  
  const { t } = useAppTranslation()

 
  return (
    <Modal title={t("warning.warning")} style={{textAlign:"center"}}
          visible={showWarning}
          onCancel={() => {
            hideShowWarning(false);
          }}
          footer={null}
          >
       <div>
      <p>{t(warning)}</p>
          </div>
          <div className="flex justify-center pb-6" style={{"marginTop":"30px"}}>
        <PappperButton variant="cancel" className="mr-2" rounded="button" onClick={() => {
            hideShowWarning(false);
          }} >
          {t('button.cancel')}
        </PappperButton>
        <PappperButton variant="primary" rounded="button" loading={false} onClick={() => {
            hideShowWarning(false);
          }}>
          {t('button.ok')}
        </PappperButton>
      </div>
        </Modal>


    
  )
}
