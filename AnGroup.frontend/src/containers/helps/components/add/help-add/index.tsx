import { Col, Form, FormInstance, Input, Row, Tag, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
import { useAppDispatch } from '~/redux/hooks'
import { createHelps } from '~/redux/slices/helps/middleware'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'

export default function HelpAddForm() {
  const formRef = useRef<FormInstance>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()

  const handleSave = () => {
    // const formValues = formRef.current.getFieldsValue()
    formRef.current.validateFields().then((values) => {
      const dataSubmit = {
        ...values,
        avatar: '',
        // status: 'A',
        tags: tags.toString(),
        description: values?.description?.replace(/  +/g, ' ') || '',
        title: values.title.replace(/  +/g, ' '),
      }

      dispatch(
        createHelps({
          helps: dataSubmit,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(t('message.createSuccess'))
              setTimeout(() => {
                navigate({
                  pathname: RouterHelper.cms_help,
                })
              }, 1000)
            }
          },
          onError({ message }) {
            toast.error(t('message.error'))
          },
        }),
      )
    })
  }

  const [tags, setTags] = useState([])

  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)
  const editInputRef = useRef(null)

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])
  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }

  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.cms_help,
      search: createSearchParams(currentParams).toString(),
    })
  }

  return (
    <div>
      <Form ref={formRef} layout="vertical">
        <Row gutter={24}>
          <Col span={24}>
            <FormItem
              label="Title "
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 100,
                  message: t('validation.validMaxLength100'),
                },
              ]}
              name="title"
            >
              <TextInput placeholder="Input your title" />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <FormItem
              label="Description"
              name="description"
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 100,
                  message: t('validation.validMaxLength100'),
                },
              ]}
            >
              <TextInputArea placeholder="Input your description" />
            </FormItem>
          </Col>

          {/* <Col span={8}>
            <FormItem label="Create time">
              <TextInput disabled />
            </FormItem>
            <FormItem label="Modify time">
              <TextInput disabled />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="Create by">
              <TextInput disabled />
            </FormItem>
            <FormItem label="Update by">
              <TextInput disabled />
            </FormItem>
          </Col> */}
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              label={t('table.column.status')}
              name="status"
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <SelectBox
                placeholder={t('placeholder.Active/Inactive')}
                options={[
                  { label: t('select.active'), value: 'A' },
                  { label: t('select.inActive'), value: 'D' },
                ]}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="Tag" name="tags">
              {/* <TextInput placeholder="tag, tag1, tag2" /> */}
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20
                const tagElem = (
                  <Tag className="edit-tag" key={tag} closable={true} onClose={() => handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                )
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                )
              })}

              {inputVisible && (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  className="tag-input w-16"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="flex items-center mb-2">
              <div>
                <span className="text-[#ff4d4f]">*</span> Content
              </div>
            </div>
            <FormItem name="content" required rules={[{ required: true, message: t('validation.required') }]}>
              <TextEditor />
            </FormItem>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <PappperButton variant="cancel" rounded="large" className="mr-4" onClick={handleCancel}>
              {t('button.cancel')}
            </PappperButton>
            {/* <PapperPopupConfirm title="Do you want save this data?" onConfirm={handleSave}> */}
            <PappperButton className="btn-primary" rounded="large" htmlType="submit" onClick={handleSave}>
              {t('button.save')}
            </PappperButton>
            {/* </PapperPopupConfirm> */}
          </Col>
        </Row>
      </Form>
    </div>
  )
}
