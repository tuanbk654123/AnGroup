import { Row } from 'antd'
import { PappperButton } from '~/components/common'

export interface IActionButtonsRightProps {
  onActions?: () => void
  title: string
}

export const ActionButtonsRight = ({ onActions, title }: IActionButtonsRightProps) => {
  return (
    <Row className="justify-end">
      <PappperButton className="px-8 ml-4" variant="cancel" rounded="button" onClick={onActions}>
        {title}
      </PappperButton>
    </Row>
  )
}
