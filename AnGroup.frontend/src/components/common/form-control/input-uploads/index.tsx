import { ReactNode } from 'react'
import { Upload, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/lib/upload/interface'
import './styles.scss'

export interface IInputUploadsProps extends UploadProps {
  value?: UploadFile[]
  uploadElement?: ReactNode
  buttonFull?: boolean
}

export const InputUploads = ({
  value = [],
  buttonFull,
  onChange,
  beforeUpload,
  uploadElement,
  ...props
}: IInputUploadsProps) => {
  const handleBeforeUpload = (file, _fileList) => {
    if (beforeUpload) {
      return beforeUpload(file, _fileList)
    }
    return false
  }
  const handleChange = ({ fileList }) => {
    onChange(fileList)
  }
  const uploadButton = <PlusOutlined />

  return (
    <div>
      <Upload
        className={`papper-input-upload ${buttonFull ? 'width-full' : ''}`}
        listType="picture-card"
        fileList={value}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
        showUploadList={{
          showPreviewIcon: false,
        }}
        {...props}
      >
        {uploadElement || uploadButton}
      </Upload>
    </div>
  )
}
