import { Col, Form, Row } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormItem, TextInput, TextInputArea } from '~/components/common'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch } from '~/redux/hooks'
import { userLogworkGetByIdRequest } from '~/redux/slices/logwork/middleware'
import { formatTimeInTable } from '~/utils'

const userLogworkKey = {
  '1': 'Get',
  '2': 'Post',
  '3': 'Put',
  '4': 'Delete',
}

export default function UserLogworkDetailContainer() {
  const [form] = Form.useForm()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  const fetchUserLogworkDetail = useCallback(() => {
    dispatch(
      userLogworkGetByIdRequest({
        userLogworkId: +id,
        onSuccess: (userLogwork) => {
          form.setFieldsValue({
            action: userLogwork.action,
            menu: userLogwork.menu,
            method: userLogworkKey[userLogwork.method],
            endpoint: userLogwork.endpoint,
            data: userLogwork.data,
            createdBy: userLogwork.createdBy,
            createdDate: userLogwork.createdDate && formatTimeInTable(userLogwork.createdDate),
            modifiedBy: userLogwork.modifiedBy,
            modifiedDate: userLogwork.modifiedDate && formatTimeInTable(userLogwork.modifiedDate),
          })
        },
      }),
    )
  }, [dispatch, id, form])

  useEffect(() => {
    fetchUserLogworkDetail()
  }, [fetchUserLogworkDetail])
  return (
    <div className="p-4">
      <Form layout="vertical" form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('table.column.action')} name="action">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userLogwork.Menu')} name="menu">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('userLogwork.Method')} name="method">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('userLogwork.Endpoint')} name="endpoint">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.createDate')} name="createdDate">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.createBy')} name="createdBy">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label={t('userLogwork.Data')} name="data">
              <TextInputArea />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
