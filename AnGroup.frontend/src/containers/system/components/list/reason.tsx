import React, { memo, useEffect, useState } from 'react'
import { Form, Popconfirm } from 'antd'
import { toast } from 'react-toastify'

import { EditableCell, EditRecordIcon, PapperTable, TrashIcon } from '~/components/common'
import { systemServices } from '~/services/system'
import { SystemReason, SystemStatus } from '~/types'
import { formatTimeInTable } from '~/utils'
import { isEmpty } from '~/utils/helper'
import { message } from '~/constants/message'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'

const ReasonSystemConfigList = () => {
  const [form] = Form.useForm()
  const [data, setDataSource] = useState<SystemReason[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [recordEdit, setRecordEdit] = useState<SystemReason | null>(null)
  const { t } = useAppTranslation()
  const params = useCurrentParams()
  const fetchAllSystemReason = async () => {
    setLoading(true)
    try {
      const res = await systemServices.getAllReason()
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
    fetchAllSystemReason()
  }, [params])

  const columns = [
    {
      title: t('configuration.NameEn'),
      dataIndex: 'nameEn',
      editable: true,
      required: false,
    },
    {
      title: t('configuration.NameVn'),
      dataIndex: 'nameVn',
      editable: true,
      required: false,
    },
    {
      title: t('configuration.Description'),
      dataIndex: 'description',
      editable: true,
      required: false,
    },
    {
      title: t('table.column.createDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      required: false,
      render: (_, { createdDate }) => {
        return <span>{isEmpty(createdDate) ? '' : formatTimeInTable(createdDate)}</span>
      },
    },
    {
      title: t('table.column.createBy'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      required: false,
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
      required: false,
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      render: (_: any, record: SystemReason) => {
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
                {' '}
                {t('button.cancel')}
              </span>
            </Popconfirm>
          </div>
        ) : (
          <div className="flex items-center">
            <button className="mr-4" onClick={() => edit(record)}>
              <EditRecordIcon className="fill-[#041662] hover:fill-cyan-700" />
            </button>
            <Popconfirm title={t('confirm.delete')} placement="topRight" onConfirm={() => handleDelete(record)}>
              <TrashIcon fill="red" />
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  const isEditing = (record: SystemReason) => `${record.key}` === `${recordEdit?.id}`

  const edit = (record: Partial<SystemStatus> & { key: React.Key }) => {
    form.setFieldsValue({ ...record })
    setRecordEdit(record as SystemReason)
  }

  const cancel = () => {
    setRecordEdit(null)
  }

  const handleDelete = async (record: SystemReason) => {
    try {
      const res = await systemServices.deleteReason(record.id)
      if (res.kind === 'ok' && res.data.message === 'Success') {
        const newData = [...data].filter((item) => item.id !== record.id)
        setDataSource(newData)
      }
    } catch (error) {
      toast.error(t('message.error'))
    }
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as SystemReason

      const editResponse = await systemServices.editReason({
        ...row,
        id: recordEdit.id,
        code: recordEdit.code,
        isDeleted: recordEdit.isDeleted,
        orderNumber: recordEdit.orderNumber,
      } as any)

      if (editResponse.kind === 'ok' && editResponse.data.message === 'Success') {
        const newData = [...data].map((item) => {
          if (item.key === key) {
            return { ...editResponse.data.data, key: item.id }
          }
          return { ...item }
        })
        setDataSource(newData as any)
        setRecordEdit(null)
      } else {
        toast.error(t('message.error'))
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
      onCell: (record: SystemReason) => ({
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

export default memo(ReasonSystemConfigList)
