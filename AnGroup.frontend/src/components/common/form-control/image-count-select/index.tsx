import { PlusOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import { ImageCountSelectItem } from './count-item'

import './styles.scss'

export interface ImageCountSelectData {
  key?: number
  inputValue?: string
  disabled?: boolean
  selected?: boolean
  showDelete?: boolean
  isOther?: boolean
  id?: string | number
}

export interface IImageCountSelectProps {
  value?: ImageCountSelectData[]
  onChange?: (value: ImageCountSelectData[]) => void
  showAddbutton?: boolean
}

export const ImageCountSelect = ({ value: values = [], onChange, showAddbutton }: IImageCountSelectProps) => {
  const handleAdd = () => {
    const newItem = {
      key: (values[values.length - 1]?.key || 0) + 1,
      inputValue: 'page other',
      selected: true,
      isOther: true,
      showDelete: true,
    }
    const newValues: ImageCountSelectData[] = [...values, newItem]
    onChange?.(newValues)
  }

  const handleDelete = (dataDelete: ImageCountSelectData) => {
    const newValues: ImageCountSelectData[] = values.filter((item) => item.key !== dataDelete.key)
    onChange?.(newValues)
  }

  const handleInput = (dataInput: ImageCountSelectData) => {
    const newValues: ImageCountSelectData[] = values.map((item) => (item.key === dataInput.key ? dataInput : item))
    onChange?.(newValues)
  }

  const AddButton = (
    <ImageCountSelectItem
      iconButton={<PlusOutlined />}
      showDelete={false}
      showInput={false}
      onClickButton={handleAdd}
    />
  )

  return (
    <Row>
      {values.map((item, index) => (
        <ImageCountSelectItem
          key={item.key}
          data={item}
          showDelete={item.showDelete}
          onInput={handleInput}
          onDelete={handleDelete}
        />
      ))}
      {showAddbutton && AddButton}
    </Row>
  )
}
