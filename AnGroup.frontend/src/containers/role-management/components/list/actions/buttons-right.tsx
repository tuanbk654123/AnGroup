import { Row } from 'antd'
import { PappperButton } from '~/components/common'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export interface IActionButtonsRightProps {
  onActions?: () => void
}

export const ActionButtonsRight = ({ onActions }: IActionButtonsRightProps) => {
  const { t } = useAppTranslation()
  return (
    <Row className="justify-end">
      <PappperButton className="btn-primary" rounded="medium" onClick={onActions}>
        {t('button.addNew')}
      </PappperButton>
    </Row>
  )
}
