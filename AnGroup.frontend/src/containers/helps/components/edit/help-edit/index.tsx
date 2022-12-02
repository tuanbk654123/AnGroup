import { Col, Form, FormInstance, Input, Row, Tag, Tooltip } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { helpsGetAllRequest, updateHelps } from '~/redux/slices/helps/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'

export default function HelpEditForm() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const formRef = useRef<FormInstance>(null)
  const [help, setHelp] = useState(null)

  const [tags, setTags] = useState([''])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)
  const editInputRef = useRef(null)
  const navigate = useNavigate()
  const { t } = useAppTranslation()

  const dataHelps = useAppSelector((state) => state.helps.dataHelps)

  const convertData = useCallback(() => {
    const ar = dataHelps.result[0]?.tags?.split(',')
    setHelp({ ...dataHelps?.result[0], tags: ar })
  }, [setHelp, dataHelps.result])

  const getData = useCallback(() => {
    dispatch(
      helpsGetAllRequest({
        helpsFilters: {
          pagination: {
            pageIndex: 1,
            pageSize: 10,
          },
          filter: {
            querySearch: '',
            queryData: {
              id: Number(id),
              querySearch: '',
            },
          },
        },
      }),
    )
  }, [id, dispatch])

  const handleSave = () => {
    const formValues = formRef.current.getFieldsValue()
    delete formValues.createdDate
    delete formValues.createdBy
    delete formValues.modifiedBy
    delete formValues.modifiedDate

    const dataSubmit = {
      ...formValues,
      id: id,
      // status: 'A',
      avatar: '',
      tags: tags?.toString() || '',
      description: formValues?.description?.replace(/  +/g, ' ') || '',
      title: formValues.title.replace(/  +/g, ' '),
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        updateHelps({
          helps: dataSubmit,
          onSuccess({ data, message }) {
            if (!data) {
              toast.warning(message)
            } else {
              toast.success(t('message.updateSuccess'))
            }
          },
          onError({ message }) {
            toast.error(t('message.error'))
          },
        }),
      )
    })
  }

  useEffect(() => {
    convertData()
  }, [convertData])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    setTags(help?.tags)
    formRef.current?.setFieldsValue?.({
      ...help,
      createdDate: help?.createdDate && formatTimeInTable(help?.createdDate),
      modifiedDate: help?.modifiedDate && formatTimeInTable(help?.modifiedDate),
    })
  }, [help])

  //tag
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

  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.cms_help,
    })
  }

  const handleInputConfirm = () => {
    if (inputValue && tags !== undefined && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    } else {
      setTags([inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }

  return (
    <div>
      <Form ref={formRef} layout="vertical">
        <Row gutter={24}>
          <Col span={24}>
            <FormItem
              label="Title "
              name="title"
              required
              rules={[
                { required: true, message: t('validation.required') },
                {
                  max: 100,
                  message: t('validation.validMaxLength100'),
                },
              ]}
            >
              <TextInput />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
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
              <TextInputArea className="!h-[118px]" />
            </FormItem>
            <FormItem
              label={t('table.column.status')}
              name="status"
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <SelectBox
                placeholder="Active/Inactive"
                options={[
                  { label: 'Active', value: 'A' },
                  { label: 'Inactive', value: 'D' },
                ]}
              />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label={t('table.column.createDate')} name="createdDate">
              <TextInput disabled />
            </FormItem>
            <FormItem label={t('table.column.modifyDate')} name="modifiedDate">
              <TextInput disabled />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label={t('table.column.createBy')} name="createdBy">
              <TextInput disabled />
            </FormItem>
            <FormItem label={t('table.column.modifyBy')} name="modifiedBy">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="Tag" name="tags">
              {/* <TextInput defaultValue="Your tag" /> */}
              {tags?.map((tag, index) => {
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
            <PappperButton className="btn-primary" rounded="large" onClick={handleSave}>
              {t('button.save')}
            </PappperButton>
            {/* </PapperPopupConfirm> */}
          </Col>
        </Row>
      </Form>
    </div>
  )
}
