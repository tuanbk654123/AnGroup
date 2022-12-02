import { Col, Form, FormInstance, Row } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormItem, PappperButton, SelectBox, TextInput } from '~/components/common'
import { DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useCurrentPage, useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getAtherConfig, updateAitherConfig } from '~/redux/slices/aither-config/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { AitherConfigHeaderForDetails } from '../header/for-details'

export default function AitherConnectionConfigDetailContainer() {
  const [aitherConfig, setAitherConfig] = useState(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formRef = useRef<FormInstance>(null)
  const param: any = useCurrentParams()
  const currentPage = useCurrentPage()
  const { t } = useAppTranslation()
  const dataAtherConfig = useAppSelector((state) => state.aitherConfig.dataAitherConfig)
  const fetchAtherConfig = useCallback(() => {
    dispatch(
      getAtherConfig({
        atherConfigFilter: {
          pagination: {
            pageIndex: currentPage,
            pageSize: DEFAULT_PAGE_SIZE,
          },
          filter: {
            querySearch: '',
            queryData: {
              varname: param.varname,
              vargroup: param.vargroup,
            },
          },
        },
      }),
    )
  }, [dispatch, currentPage, param.vargroup, param.varname])

  useEffect(() => {
    fetchAtherConfig()
  }, [fetchAtherConfig])

  const convertData = useCallback(() => {
    setAitherConfig({ ...dataAtherConfig?.result[0] })
  }, [setAitherConfig, dataAtherConfig])

  useEffect(() => {
    convertData()
  }, [convertData])

  useEffect(() => {
    formRef.current?.setFieldsValue?.({
      ...aitherConfig,
      modifiedDate: aitherConfig?.modifiedDate && formatTimeInTable(aitherConfig?.modifiedDate),
    })
  }, [aitherConfig])
  const handleSave = () => {
    const formValues = formRef.current.getFieldsValue()
    delete formValues.modifiedBy
    delete formValues.modifiedDate

    const dataSubmit = {
      vargroup: formValues.grname,
      varname: formValues.varname,
      varvalue: formValues.varvalue,
      description: formValues.vardesc,
      status: formValues.status,
    }

    formRef.current.validateFields().then(() => {
      dispatch(
        updateAitherConfig({
          aitherConfig: dataSubmit,
          onSuccess: ({ status, message }) => {
            if (status === 1) {
              toast.success(t('message.updateSuccess'), { autoClose: 500 })
            } else toast.error(t('message.error'))
          },
        }),
      )
    })
  }
  const handleCancel = () => {
    navigate({
      pathname: RouterHelper.configuration_aither_connection,
    })
  }
  return (
    <div>
      <AitherConfigHeaderForDetails />
      <Form layout="vertical" className="px-5" ref={formRef}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Grname" name="grname">
              <TextInput placeholder="Grname" disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Varname" name="varname">
              <TextInput placeholder="Varname" disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Vardesc" name="vardesc">
              <TextInput placeholder="Vardesc" />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Varvalue" name="varvalue">
              <TextInput placeholder="Varvalue" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.modifyDate')} name="modifiedDate">
              <TextInput disabled />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={t('table.column.modifyBy')} name="modifiedBy">
              <TextInput disabled />
            </FormItem>
          </Col>
        </Row>
        {/* <Row>
              <Col span={24}>
                <FormItem label="Description" name="description">
                  <TextInputArea placeholder="Description" />
                </FormItem>
              </Col>
            </Row> */}
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={t('table.column.status')} name="status">
              <SelectBox
                options={[
                  { label: 'Active', value: 'A' },
                  { label: 'InActive', value: 'I' },
                ]}
              />
            </FormItem>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <PappperButton variant="cancel" rounded="large" className="mr-4" onClick={handleCancel}>
              {t('button.cancel')}
            </PappperButton>

            <PappperButton variant="primary" rounded="large" onClick={handleSave}>
              {t('button.save')}
            </PappperButton>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
