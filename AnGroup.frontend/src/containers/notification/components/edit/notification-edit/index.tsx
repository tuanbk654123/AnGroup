import { Col, Form, FormInstance, Row } from 'antd'
import { useCallback, useEffect, useRef } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { FormItem, PappperButton, SelectBox, TextEditor, TextInput, TextInputArea } from '~/components/common'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { notificationGetAllRequest, updateNotification } from '~/redux/slices/notification/middleware'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { toast } from 'react-toastify'

export default function NotificationEditForm() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  const formRef = useRef<FormInstance>(null)
  // const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

  const dataNotification = useAppSelector((state) => state.notification.dataNotification)

  const convertData = useCallback(() => {
    formRef.current?.setFieldsValue?.({
      ...dataNotification?.result?.[0],
      createdDate:
        dataNotification?.result?.[0]?.createdDate && formatTimeInTable(dataNotification?.result?.[0]?.createdDate),
      modifiedDate:
        dataNotification?.result?.[0]?.modifiedDate && formatTimeInTable(dataNotification?.result?.[0]?.modifiedDate),
    })
  }, [formRef, dataNotification?.result])

  const getData = useCallback(() => {
    dispatch(
      notificationGetAllRequest({
        notificationFilters: {
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
      title: formValues.title.replace(/  +/g, ' '),
      description: formValues?.description?.replace(/  +/g, ' ') || '',
      content: formValues.content || '',
      avatar: '',
      banner: '',
      isall: 'Y',
      topic: '',
      userId: '',
      token: '',
      route: '',
      exdata: '',
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        updateNotification({
          notification: dataSubmit,
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

  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.cms_notification,
      search: createSearchParams().toString(),
    })
  }

  return (
    <div>
      <Form ref={formRef} layout="vertical">
        <Row gutter={24}>
          <Col span={24}>
            <FormItem
              label={t('notification.title')}
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
              <TextInput placeholder={t('notification.inputTitle')} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <FormItem
              label={t('notification.description')}
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
              <TextInputArea className="!h-[118px]" placeholder={t('placeholder.description')} />
            </FormItem>
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

        <Row>
          <Col span={24}>
            <div className="flex items-center mb-2">
              <span>{t('product.content')}</span>
            </div>
            <FormItem name="content">
              <TextEditor placeholder={t('placeholder.content')} />
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
