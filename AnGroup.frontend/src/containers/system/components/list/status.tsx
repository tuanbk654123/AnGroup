import React, { memo, useEffect, useState } from 'react'
import { Form, Popconfirm } from 'antd'
import { toast } from 'react-toastify'

import { EditableCell, EditRecordIcon, PapperTable } from '~/components/common'
import { systemServices } from '~/services/system'
import { SystemStatus } from '~/types'
import { formatTimeInTable } from '~/utils'
import { isEmpty } from '~/utils/helper'
import { message } from '~/constants/message'
import { useAppTranslation } from '~/hooks/useAppTranslation'

const StatusSystemConfigList = () => {
  const [form] = Form.useForm()
  const [data, setDataSource] = useState<SystemStatus[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [recordEdit, setRecordEdit] = useState<SystemStatus | null>(null)
  const { t } = useAppTranslation()

  const fetchAllSystemStatus = async () => {
    setLoading(true)
    try {
      const res = await systemServices.getAllStatus()
      console.log({ res })
      if (res.kind === 'ok' && res.data.data.length > 0) {
        setDataSource(res.data.data.map((item) => ({ ...item, key: item.id })))
      } else {
        setDataSource([])
      }
      setLoading(false)
    } catch (error) {
      toast.error(message.errorApi)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllSystemStatus()
  }, [])

  const columns = [
    {
      title: t('configuration.NameEn'),
      dataIndex: 'nameEn',
      editable: true,
      width: '10%',
      required: true,
    },
    {
      title: t('configuration.NameVn'),
      dataIndex: 'nameVn',
      editable: true,
      width: '10%',
      required: true,
    },
    {
      title: t('configuration.Color'),
      dataIndex: 'color',
      editable: true,
      width: '10%',
      required: true,
    },
    {
      title: t('configuration.Description'),
      dataIndex: 'description',
      editable: true,
      required: true,
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => {
        return <span>{isEmpty(createdDate) ? '' : formatTimeInTable(createdDate)}</span>
      },
    },
    {
      title: t('table.column.createBy'),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: t('table.column.modifyDate'),
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      render: (_, { modifiedDate }) => {
        return <span>{isEmpty(modifiedDate) ? '' : formatTimeInTable(modifiedDate)}</span>
      },
    },
    {
      title: t('table.column.modifyBy'),
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      render: (_: any, record: SystemStatus) => {
        const editable = isEditing(record)
        return editable ? (
          <div className="flex items-center">
            <button
              className="cursor-pointer px-2 py-0 rounded-small bg-green-500 text-white mr-2"
              onClick={() => save(record.key)}
            >
              {t('button.save')}
            </button>

            <Popconfirm title={t('confirm.edit')} onConfirm={cancel} placement="topRight">
              <span className="cursor-pointer px-2 py-0 rounded-small bg-gray-500 text-white">
                {t('button.cancel')}
              </span>
            </Popconfirm>
          </div>
        ) : (
          <button className="mr-4" onClick={() => edit(record)}>
            <EditRecordIcon className="fill-[#041662] hover:fill-cyan-700" />
          </button>
        )
      },
    },
  ]

  const isEditing = (record: SystemStatus) => `${record.key}` === `${recordEdit?.id}`

  const edit = (record: Partial<SystemStatus> & { key: React.Key }) => {
    form.setFieldsValue({ ...record })
    setRecordEdit(record as SystemStatus)
  }

  const cancel = () => {
    setRecordEdit(null)
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as SystemStatus
      const editResponse = await systemServices.editStatus({
        ...row,
        id: recordEdit.id,
        parentId: recordEdit.parentId,
        code: recordEdit.code,
      })

      if (editResponse.kind === 'ok' && editResponse.data.message === 'Success') {
        const newData = [...data].map((item) => {
          if (item.key === key) {
            return { ...editResponse.data.data, key: item.id }
          }
          return { ...item }
        })
        setDataSource(newData)
        setRecordEdit(null)
      } else {
        toast.error(t('message.error'), { autoClose: 1000 })
        setRecordEdit(null)
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: SystemStatus) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        required: col.required,
      }),
    }
  })

  return (
    <div>
      <Form form={form} component={false}>
        <PapperTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          loading={loading}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  )
}

export default memo(StatusSystemConfigList)
