import { useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { IPaperCreateEditModalProps, PaperCreateEditModal, PapperTabs } from '~/components/common'
import { PaperConfirmModal, TConfirmModalListType } from '~/components/common/confirm-modal'
import { EProductListType, TProductListType } from '~/containers/product-management/index.types'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
import { CreateProductManagementBody } from './body'

interface ICreateProductManagementProps extends IPaperCreateEditModalProps {}

type ModalConfirm = {
  isOpen: boolean
  status: TConfirmModalListType | ''
  message: string
}

export const CreateProductModal = (props: ICreateProductManagementProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || EProductListType.product
  const { t } = useAppTranslation()

  const tabs = [
    {
      key: EProductListType.product,
      label: t('product.Product'),
      disabled: id !== undefined,
    },
    {
      key: EProductListType.productGroup,
      label: t('product.groupProgram'),
      disabled: id !== undefined,
    },
    {
      key: EProductListType.productName,
      label: t('product.programName'),
      disabled: id !== undefined,
    },
  ]

  const [modalConfirm, setModalConfirm] = useState<ModalConfirm>({
    isOpen: false,
    status: '',
    message: '',
  })

  const handleChangeTab = (key: TProductListType) => {
    navigate({
      pathname: RouterHelper.product_management_create,
      search: createSearchParams({
        type: key,
      }).toString(),
    })
  }

  return (
    <>
      <PaperCreateEditModal titleText={t('product.createNew')} width={'70vw'} hiddenFooter={true} {...props}>
        <PapperTabs centered tabs={tabs} defaultActiveKey={type} onChange={handleChangeTab} />
        <CreateProductManagementBody />
      </PaperCreateEditModal>

      <PaperConfirmModal
        type={modalConfirm.status as TConfirmModalListType}
        message={modalConfirm.message}
        visible={modalConfirm.isOpen}
        onOk={() => setModalConfirm((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  )
}
