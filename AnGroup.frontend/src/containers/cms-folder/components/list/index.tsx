import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PapperTable } from '~/components/common/table'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { folderGetAllRequest } from '~/redux/slices/folder/middleware'
import { folderServices } from '~/services'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { CmsReviewListActions } from '../actions'
import { FolderTwoTone, FileExcelTwoTone, FileImageTwoTone, ToolTwoTone } from '@ant-design/icons'
import { toast } from 'react-toastify'

interface RecordDataType {
  name: string
  remotePath: string
  isDir: boolean
  modifiedDate: string
  size: number
  items: []
}

export const CmsFolderList = () => {
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch()
  const folderList = useAppSelector((state) => state.folder.dataFolder)
  const loading = useAppSelector((state) => state.folder.loading)
  const columns: ColumnsType<RecordDataType> = [
    {
      title: t('folder.Name'),
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (value, record, index) => {
        const file = record.name.split(/\./).pop()
        return (
          <>
            {file === 'xlsx' ? (
              <div className="flex gap-4">
                {' '}
                <FileExcelTwoTone />
                <p>{record.name}</p>
              </div>
            ) : file === 'tif' ? (
              <div className="flex gap-4">
                {' '}
                <FileImageTwoTone />
                <p>{record.name}</p>
              </div>
            ) : file === 'config' ? (
              <div className="flex gap-4">
                {' '}
                <ToolTwoTone />
                <p>{record.name}</p>
              </div>
            ) : (
              <div className="flex gap-4">
                {' '}
                <FolderTwoTone />
                <p>{record.name}</p>
              </div>
            )}
          </>
        )
      },
    },

    {
      title: t('folder.remotePath'),
      dataIndex: 'remotePath',
      key: 'remotePath',
    },
    // {
    //   title: "isDir",
    //   dataIndex: 'isDir',
    //   key: 'isDir',
    // },
    // {
    //   title: 'size',
    //   dataIndex: 'size',
    //   key: 'size',
    // },
    {
      title: t('table.column.modifyDate'),
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      render: (_, { modifiedDate }) => formatTimeInTable(modifiedDate),
    },
    {
      title: t('table.column.action'),
      dataIndex: 'action',
      key: 'action',
      render: (value, record, index) => {
        return (
          <>
            {record.items.length > 0 ? (
              <TableActions
                allowActions={['show', 'download']}
                onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
              />
            ) : (
              <TableActions
                allowActions={['download']}
                onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
              />
            )}
          </>
        )
      },
    },
  ]
  const fetchFolders = useCallback(() => {
    dispatch(folderGetAllRequest({}))
    if (folderList.length === 0) {
      dispatch(folderGetAllRequest({}))
    }
  }, [dispatch, folderList.length])

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const handleDownload = async (recordDownload: RecordDataType) => {
    const response = await toast.promise(
      folderServices.download({
        name: recordDownload.name,
        remotePath: recordDownload.remotePath,
        isDir: recordDownload.isDir,
      }),
      {
        pending: 'Download in progress',
        success: 'Download successfully',
        error: 'Download failed',
      },
    )
    const file = response.data
    const data = new Blob([file], { type: 'application/zip' })
    const zipURL = window.URL.createObjectURL(data)
    const tempLink = document.createElement('a')
    tempLink.href = zipURL
    tempLink.setAttribute('download', recordDownload.name)
    tempLink.click()
  }

  // const handleDownload = (recordDownload: RecordDataType) => {
  //   dispatch(
  //     folderDownloadRequest({
  //       folder: {
  //         name: recordDownload.name,
  //         remotePath: recordDownload.remotePath,
  //         isDir: recordDownload.isDir,
  //       },
  //     })
  //   )
  // }

  const handleColumnAction = (action, value, record) => {
    if (action === EActionsType.download) {
      handleDownload(record)
    }
    if (action === EActionsType.show) {
      handleShow(record)
    }
  }
  const handleShow = (record: RecordDataType) => {
    navigate({
      pathname: RouterHelper.cms_folder_detail_ref(record.name),
      search: createSearchParams({ ...currentParams }).toString(),
    })
  }
  return (
    <div className="bg-white p-4">
      <CmsReviewListActions />
      <PapperTable
        dataSource={folderList}
        columns={columns}
        loading={loading}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => handleRowClick(record),
        //   }
        // }}
      />
    </div>
  )
}
