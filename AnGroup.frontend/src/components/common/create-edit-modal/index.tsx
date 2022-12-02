import { useAppTranslation } from '~/hooks/useAppTranslation'
import { PappperButton } from '../button'
import { IPapperModalProps, PapperModal } from '../modal'

export interface IPaperCreateEditModalProps extends IPapperModalProps {
  titleText?: string
  btnOkLoading?: boolean
  hiddenFooter?: boolean
}

export const PaperCreateEditModal = ({
  titleText,
  width = 770,
  okText = 'Save',
  cancelText = 'Cancel',
  btnOkLoading = false,
  hiddenFooter,
  ...props
}: IPaperCreateEditModalProps) => {
  const { t } = useAppTranslation()
  const renderFooter = () => {
    return (
      <div className="flex justify-center">
        <PappperButton variant="cancel" rounded="button" onClick={props.onCancel}>
          {t('button.cancel')}
        </PappperButton>
        <PappperButton variant="primary" rounded="button" onClick={props.onOk} loading={btnOkLoading}>
          {t('button.save')}
        </PappperButton>
      </div>
    )
  }

  return (
    <PapperModal
      width={width}
      title={<div className="text-black uppercase">{titleText}</div>}
      footer={!hiddenFooter && renderFooter()}
      {...props}
    />
  )
}
