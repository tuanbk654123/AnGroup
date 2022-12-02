import React from 'react'
import { Upload, UploadProps } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { getDataFromStorage } from '~/utils/storage.utils'
import { storageKeys } from '~/constants/storageKeys'

interface UploadFileProps extends UploadProps {
  onChange: (file: UploadChangeParam<UploadFile>) => void
  children: React.ReactNode
  name: string
  uploadUrl: string
  // limitSize?: number
  accept?: string
}

export const UploadImage = ({
  onChange,
  children,
  name,
  uploadUrl,
  // limitSize = 2,
  accept = '.png, .jpg',
  ...props
}: UploadFileProps) => {
  const accessToken = getDataFromStorage(storageKeys.TOKEN)
  const baseUrl = process.env.REACT_APP_BASE_API_URL
  const uploadProps = {
    name,
    accept,
    action: baseUrl + uploadUrl,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    onChange,
    showUploadList: false,
    // beforeUpload: (file: any) => {
    //   const limitedSize: boolean = file.size / 1024 / 1024 < Number(limitSize)
    //   if (!limitedSize) {
    //     message.error({
    //       content: `The picture should be in certain format (including PNG, JPG) and no larger than ${limitSize}MB`,
    //       style: {
    //         textAlign: 'right',
    //       },
    //     })
    //   }
    //   return limitedSize
    // },
  }

  return (
    <Upload {...uploadProps} {...props}>
      {children}
    </Upload>
  )
}
