import { ColumnsType } from 'antd/lib/table'
import { useCallback, useEffect } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { PapperTable } from '~/components/common/table'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { folderServices } from '~/services'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { CmsReviewListActions } from '../actions'
import { FolderTwoTone, FileExcelTwoTone, FileImageTwoTone, ToolTwoTone } from '@ant-design/icons'
import { folderGetAllRequest } from '~/redux/slices/folder/middleware'
import { cloneDeep } from 'lodash'
import { toast } from 'react-toastify'

interface RecordDataType {
  id: string
  parentId: string
  name: string
  remotePath: string
  isDir: boolean
  modifiedDate: string
  size: number
  items: []
}

export const FolderDetailContainer = () => {
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const folderList = cloneDeep(useAppSelector((state) => state.folder.dataFolder))
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
      ellipsis: true,
    },
    // {
    //   title: "isDir",
    //   dataIndex: 'isDir',
    //   key: 'isDir',
    // },
    {
      title: t('folder.size'),
      dataIndex: 'size',
      key: 'size',
      render: (value, record, index) => {
        return (
          <>
            {record.size !== 0 ? (
              <div className="gap-1 flex">
                <span>{record.size}</span>
                <span>Byte</span>
              </div>
            ) : null}
          </>
        )
      },
    },
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
            {record.size !== 0 ? (
              <TableActions
                allowActions={['download']}
                onAction={(actionType, value) => handleDownloadAction(actionType, value, record)}
              />
            ) : (
              <TableActions
                allowActions={['show', 'download']}
                onAction={(actionType, value) => handleDownloadAction(actionType, value, record)}
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

  const handleDownloadAction = (action, value, record) => {
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
  const generateUUID = () => {
    let d = new Date().getTime()
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now()
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
  }

  const reFormat = () => {
    const arr = cloneDeep(folderList)
    arr?.forEach((x: any) => {
      if (x?.items && (x?.items as Array<any>).length) {
        x['parentId'] = null
        x['id'] = generateUUID()
        x.items?.forEach((t: any) => {
          t['parentId'] = x?.id
          t.id = generateUUID()
        })
      }
    })

    arr.forEach((x: any) => {
      if (x?.items && (x?.items as Array<any>).length) {
        x['item_temp'] = loop(x?.items)
      }
    })
    return arr
  }
  const loop = (arr: any[], parentId?: string) => {
    if (arr?.length) {
      arr?.forEach((t: any) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!t.hasOwnProperty('parentId')) {
          t.parentId = parentId
        }
        // eslint-disable-next-line no-prototype-builtins
        if (!t.hasOwnProperty('id')) {
          t.id = generateUUID()
        }
        if (t?.items) {
          (t?.items as Array<any>)?.forEach((x) => {
            x['parentId'] = t.id
            x.id = generateUUID()
            if (x?.items) {
              loop(x?.items, x.id)
            }
          })
        }
      })
    }
    return arr
  }
  const flatten = (data: any) => {
    return data.reduce((r, { items, ...rest }) => {
      r.push(rest)
      if (items) r.push(...flatten(items))
      return r
    }, [])
  }
  const result = flatten(reFormat())
  const folderDetail1 = result
    .filter((folder) => folder.name === id)
    .map((item) => ({
      ...item,
    }))

  const idfolder = folderDetail1[0].id
  const folderDetail = result
    .filter((folder) => folder.parentId === idfolder)
    .map((item) => ({
      ...item,
    }))
  return (
    <div className="bg-white p-4">
      <CmsReviewListActions />
      <PapperTable
        dataSource={folderDetail}
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
