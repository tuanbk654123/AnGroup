import { useState } from 'react'
import { toast } from 'react-toastify'
import { IPapperModalProps, PapperModal, PappperButton } from '~/components/common'
import { SelectboxInfinite } from '~/components/common/form-control/select-box-infinite'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export interface IAssignSaleModalProps extends IPapperModalProps {
  submissionIds: number[]
  onAssignSale?: (userId: number, submissionIds: number[]) => void
}

export const AssignSaleModal = ({ submissionIds, onAssignSale, ...modalProps }: IAssignSaleModalProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0)

  const handleAssignSale = () => {
    if (!selectedUserId) {
      toast.warning('Please select seller')
      return
    }
    onAssignSale?.(selectedUserId, submissionIds)
  }

  const ModalFooter = () => {
    const { t } = useAppTranslation()
    return (
      <div className="flex justify-center">
        <PappperButton variant="cancel" rounded="large" onClick={() => modalProps.onCancel?.(null)}>
          {t('button.cancel')}
        </PappperButton>
        <PappperButton variant="primary" rounded="large" onClick={handleAssignSale}>
          {t('button.assign')}
        </PappperButton>
      </div>
    )
  }
  const { t } = useAppTranslation()
  return (
    <PapperModal title="CHOOSE SALE FOR APPLICATION" footer={<ModalFooter />} {...modalProps}>
      <div className="mb-2">
        Choose Seller <span className="text-error">*</span>
      </div>
      <SelectboxInfinite
        searchOnlyActiveUser
        placeholder={t('placeholder.Sale')}
        className="w-full"
        onChange={setSelectedUserId}
      />
    </PapperModal>
  )
}
