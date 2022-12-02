import { Spin } from 'antd'
import { useMemo, useRef, useState, useCallback } from 'react'
import ReactQuill from 'react-quill'
import { productServices } from '~/services'
import { getImageUrlWithToken } from '~/utils/helper'
import './styles.scss'

export interface ITextEditorProps {
  value?: string
  placeholder?: string
  onChange?: (value: any) => void
}

export const TextEditor = ({ value, placeholder, onChange }: ITextEditorProps) => {
  const quillRef = useRef(null)

  const [uploading, setUploading] = useState<boolean>(false)

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'

  ]

  const selectFile = useCallback(() => {
    return new Promise<File | null>((resolve) => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()
      document.body.onfocus = () => {
        setTimeout(() => {
          resolve(input.files?.[0])
        }, 100)
      }
    })
  }, [])

  const imageHandler = useCallback(
    async (image, callback) => {
      try {
        const file = await selectFile()
        if (!file) return
        setUploading(true)
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()
        const response = await productServices.upload(file)
        if (response.kind === 'ok') {
  
          editor.insertEmbed(range.index, 'image', process.env.REACT_APP_BASE_API_MINIO_URL +response?.data?.data);
        }
      } finally {
        setUploading(false)
      }
    },
    [setUploading, selectFile],
  )

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    [imageHandler],
  )

  return (
    <div className="w-full relative">
      {uploading && (
        <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black opacity-50">
          <Spin tip="Uploading..."></Spin>
        </div>
      )}
      <ReactQuill
        ref={quillRef}
        className="papper-text-editor"
        modules={modules}
        formats={formats}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
