import { DeleteOutlined } from '@ant-design/icons'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { ReactNode } from 'react'
import { ImageCountSelectData } from '..'

import '../styles.scss'

interface IImageCountSelectItemProps {
  iconButton?: ReactNode
  showDelete?: boolean
  showInput?: boolean
  data?: ImageCountSelectData
  onClickButton?: () => void
  onInput?: (dataInput: ImageCountSelectData) => void
  onDelete?: (dataDelete?: ImageCountSelectData) => void
}

export const ImageCountSelectItem = ({
  iconButton,
  showDelete,
  showInput = true,
  data,
  onClickButton,
  onInput,
  onDelete,
}: IImageCountSelectItemProps) => {
  const handleChange = (e) => {
    const newValue: ImageCountSelectData = {
      ...data,
      inputValue: e.target.value,
    }
    onInput?.(newValue)
  }

  const handleCheck = (e) => {
    // if (data.isOther) {
    //   return
    // }
    const newValue: ImageCountSelectData = {
      ...data,
      selected: e.target.checked,
    }
    onInput?.(newValue)
  }

  return (
    <div className="count-select-item-container">
      <div className="count-select-item-button" onClick={onClickButton}>
        {iconButton || <Checkbox checked={data.selected} onChange={handleCheck} />}
        {showDelete && (
          <button type="button" className="btn-delete" onClick={() => onDelete?.(data)}>
            <DeleteOutlined />
          </button>
        )}
      </div>
      {showInput && (
        <input
          className="count-select-item-input"
          value={data?.inputValue}
          placeholder="value"
          onChange={handleChange}
          disabled={data?.disabled}
        />
      )}
    </div>
  )
}
