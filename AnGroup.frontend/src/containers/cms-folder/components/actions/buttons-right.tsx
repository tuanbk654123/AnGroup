import { Row } from 'antd'
// import { PappperButton } from '~/components/common'

export interface IActionButtonsRightProps {
  onActions?: () => void
}

export const ActionButtonsRight = ({ onActions }: IActionButtonsRightProps) => {
  return (
    <Row className="justify-end">
      {/* <PappperButton className="px-8 ml-4" variant="cancel" rounded="button" onClick={onActions}>
        Export
      </PappperButton> */}
    </Row>
  )
}
