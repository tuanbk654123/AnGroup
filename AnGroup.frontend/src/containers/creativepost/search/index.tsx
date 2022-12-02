import { ColumnsType } from 'antd/lib/table'
import { PapperTable } from '~/components/common'
import { useAppTranslation, useCurrentParams } from '~/hooks'
import { formatTimeInTable, RouterHelper, loadImage, getFitedDimensionImage } from '~/utils'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { createSearchParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { Col, Row, RowProps, Tag, Checkbox, Tooltip, Image } from 'antd'
import { ReactElement } from 'react'
import { TextInputSearch, SelectBox } from '~/components/common'
import { useEffect, useState } from 'react'
import { PaperPageHeaderForList } from '~/components/layout'
import { ECreativePostType, ECreativePostTypeValue, ECreativePostTypeNewsValue } from './index.types'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { ActionFormLeft } from '~/containers/category-management/components/list/actions/form-left'
import { creativePostSearchRequest, creativePostUpdateListIdStatusRequest } from '~/redux/slices/creativepost/middleware'
import { PappperButton } from '~/components/common'
import { PopupCreatiPostModal } from '~/containers/creativepost/popup'
import { PopupChangeStatusModal } from '~/containers/creativepost/popup/changestatus'
import { PopupShowHideModal } from '~/containers/creativepost/popup/showhide'
import { toast } from 'react-toastify'

import { EditCategoryModal } from '~/containers/category-management/components/modals/edit-category'
import { CreateCreativePostModal } from '../add-post'
import { EditCreativePostModal } from '../edit-post'
import { DeleteCreativePostModal } from '../delete-post'
import { ViewCreativePostModal } from '../view-post'


interface RecordDataType {
    key: React.ReactNode
    stt: string
    title: string
    author: string
    content: string
    description: string
    tags: string
    publishDate: string
    statusname: string
    createdDate: string
    checkbox: boolean
    createdBy: string
    code: string
    status: string
    modifiedBy: string
    categoryNameCrawl: string
    categoryName: string
    senderDate: string
    seder: string
    newsType: string
    publishedDate: string
    publishedBy: string
    totalView: string
    sentDate: string
    rejectDate: string
    rejectBy: string
    note: string
    scheduledPublishedDate: string
    image: string
}

export const SearchCreativePostContainer = () => {
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [id, setId] = useState();
    const { t } = useAppTranslation();
    const navigate = useNavigate();
    const currentParams = useCurrentParams();
    const dispatch = useAppDispatch();
    const pagination = useAppSelector((state) => state.creativePost.pagination);
    const loading = useAppSelector((state) => state.creativePost.loading);
    const dataSearch = useAppSelector((state) => state.creativePost.datacreativePosts);
    const [loadPage, setLoadPage] = useState(false);
    const initialSelect = new Array(DEFAULT_PAGE_SIZE).fill(false)
    const [checkTable, setCheckTable] = useState(initialSelect);
    const [checked, setChecked] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [showWarning, setShowWarning] = useState(false)
    const [warningText, setWarningText] = useState(null)
    const [showStatus, setShowStatus] = useState(false)
    const [showHide, setShowHide] = useState(false)
    const [showText, setShowText] = useState(null)
    const [showType, setShowType] = useState(null)
    const [searchKey] = useSearchParams()
    const [ids, setIds] = useState([]);
    const [showView, setShowView] = useState(false);

    const activeKey = searchKey.get('type')

    // const handleEdit = (recordEdit: any) => {
    //     console.log('ok');
    // }


    const handleColumnAction = (actionType, value, record) => {
        if (actionType === EActionsType.show) {
            handleShow(record)
        }
        if (actionType === EActionsType.edit) {
            handleEdit(record)
        }
        if (actionType === EActionsType.delete) {
            handleDelete(record)
        }
        if (actionType === EActionsType.send_approval) {
            handleSendApproval(record)
        }
        if (actionType === EActionsType.approval) {
            handleApproval(record)
        }
        if (actionType === EActionsType.repay) {
            handleRepay(record)
        }
        if (actionType === EActionsType.calendar) {
            handleCalendar(record)
        }
        if (actionType === EActionsType.cancel_calendar) {
            handleCancelCalendar(record)
        }
        if (actionType === EActionsType.hidepost) {
            handleHidePost(record)
        }
        if (actionType === EActionsType.unpublish) {
            handleUnPublish(record)
        }

    }

    const getData = (_params) => {
        const { name, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params
        dispatch(
            creativePostSearchRequest({
                data: {
                    pagination: {
                        pageIndex: Number(pageIndex),
                        pageSize: Number(pageSize),
                    },
                    filter: {
                        querySearch: '',
                        title: name || '',
                        status: activeKey == ECreativePostType.waiting ? ECreativePostTypeValue.waiting : activeKey == ECreativePostType.approval ? ECreativePostTypeValue.approval :
                            activeKey == ECreativePostType.calendar ? ECreativePostTypeValue.calendar : activeKey == ECreativePostType.draft ? ECreativePostTypeValue.draft :
                                activeKey == ECreativePostType.reject ? ECreativePostTypeValue.reject : ECreativePostTypeValue.waiting,
                        type: 0
                    },
                },
            }),
        )
        setSelectedRowKeys([])
    }

    useEffect(() => {
        // getDataAll()
        getData(currentParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentParams, loadPage])

    const _onChangeRowCheckbox = (event, index) => {
        console.log(1)
        setCheckTable(checkTable.map((item, idx) => {
            return (idx === index) ? !item : item
        }));
    };
    const columnswaiting: ColumnsType<RecordDataType> = [
        {
            title: t('creativepost.stt'),
            dataIndex: 'stt',
            key: 'stt',
            render: (stt, recod, index) => (
                <Tooltip placement="topLeft" title={stt}>
                    {((DEFAULT_PAGE_INDEX - 1) * DEFAULT_PAGE_SIZE) + index + 1}
                </Tooltip>
            ),
        },
        {
            title: t('creativepost.title'),
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: t('creativepost.CategoryId'),
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: t('creativepost.newsType'),
            dataIndex: 'newsType',
            key: 'newsType',
            render: (newsType) => {
                return <div>{newsType !== '' ? newsType == ECreativePostTypeNewsValue.regular ? t("creativepost.postText") :
                    newsType == ECreativePostTypeNewsValue.image ? t("creativepost.postImage") :
                        newsType == ECreativePostTypeNewsValue.video ? t("creativepost.postVideo") : null : null}</div>
            },
        },
        {

            title: t('table.column.status'),
            // dataIndex: 'statusName',
            key: 'status',
            render: (value) => {
                return <div>
                    {(() => {
                        if (value.status === 0) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.draft")}</Tag>
                            )
                        } else if (value.status === 1) {
                            return (
                                <Tag color="red">{t("creativepost.tab.waiting")}</Tag>
                            )
                        }
                        else if (value.status === 2) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.approval")}</Tag>
                            )
                        }
                        else if (value.status === 3) {
                            return (
                                <Tag color="blue">{t("creativepost.tab.reject")}</Tag>
                            )
                        }
                        else if (value.status === 4) {
                            return (
                                <Tag color="geekblue">{t("creativepost.tab.calendar")}</Tag>
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
        {
            title: t('creativepost.sender'),
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            title: t('creativepost.senderDate'),
            dataIndex: 'senderDate',
            key: 'senderDate',
            render: (_, { senderDate }) => formatTimeInTable(senderDate),
        },
        {
            title: t('table.column.action'),
            //dataIndex: 'action',
            key: 'status',
            //width: 120,
            render: (value, record, index) => {
                return <div>
                    {(() => {
                        if (value.status === ECreativePostTypeValue.draft) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        } else if (value.status === ECreativePostTypeValue.waiting) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.approval) {
                            return (
                                <TableActions
                                    allowActions={['show', 'unpublish', 'hidepost']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.reject) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.calendar) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'cancel_calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
    ]
    const columnsapproval: ColumnsType<RecordDataType> = [
        {
            title: t('creativepost.stt'),
            dataIndex: 'stt',
            key: 'stt',
            render: (stt, recod, index) => (
                <Tooltip placement="topLeft" title={stt}>
                    {((DEFAULT_PAGE_INDEX - 1) * DEFAULT_PAGE_SIZE) + index + 1}
                </Tooltip>
            ),
        },
        {
            title: t('creativepost.title'),
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: t('creativepost.CategoryId'),
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: t('creativepost.newsType'),
            dataIndex: 'newsType',
            key: 'newsType',
            render: (newsType) => {
                return <div>{newsType !== '' ? newsType == ECreativePostTypeNewsValue.regular ? t("creativepost.postText") :
                    newsType == ECreativePostTypeNewsValue.image ? t("creativepost.postImage") :
                        newsType == ECreativePostTypeNewsValue.video ? t("creativepost.postVideo") : null : null}</div>
            },
        },
        {

            title: t('table.column.status'),
            // dataIndex: 'statusName',
            key: 'status',
            render: (value) => {
                return <div>
                    {(() => {
                        if (value.status === 0) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.draft")}</Tag>
                            )
                        } else if (value.status === 1) {
                            return (
                                <Tag color="red">{t("creativepost.tab.waiting")}</Tag>
                            )
                        }
                        else if (value.status === 2) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.approval")}</Tag>
                            )
                        }
                        else if (value.status === 3) {
                            return (
                                <Tag color="blue">{t("creativepost.tab.reject")}</Tag>
                            )
                        }
                        else if (value.status === 4) {
                            return (
                                <Tag color="geekblue">{t("creativepost.tab.calendar")}</Tag>
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
        {
            title: t('table.column.createBy'),
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: t('creativepost.postedDate'),
            dataIndex: 'publishedDate',
            key: 'publishedDate',
            render: (_, { publishedDate }) => formatTimeInTable(publishedDate),
        },
        {
            title: t('creativepost.postedBy'),
            dataIndex: 'publishedBy',
            key: 'publishedBy',
        },
        {
            title: t('creativepost.totalView'),
            dataIndex: 'totalView',
            key: 'totalView',
        },
        {
            title: t('table.column.action'),
            //dataIndex: 'action',
            key: 'status',
            //width: 120,
            render: (value, record, index) => {
                return <div>
                    {(() => {
                        if (value.status === ECreativePostTypeValue.draft) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        } else if (value.status === ECreativePostTypeValue.waiting) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.approval) {
                            return (
                                <TableActions
                                    allowActions={['show', 'unpublish', 'hidepost']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.reject) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.calendar) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'cancel_calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
    ]
    const columnsreject: ColumnsType<RecordDataType> = [
        {
            title: t('creativepost.stt'),
            dataIndex: 'stt',
            key: 'stt',
            render: (stt, recod, index) => (
                <Tooltip placement="topLeft" title={stt}>
                    {((DEFAULT_PAGE_INDEX - 1) * DEFAULT_PAGE_SIZE) + index + 1}
                </Tooltip>
            ),
        },
        {
            title: t('creativepost.title'),
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: t('creativepost.CategoryId'),
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: t('creativepost.newsType'),
            dataIndex: 'newsType',
            key: 'newsType',
            render: (newsType) => {
                return <div>{newsType !== '' ? newsType == ECreativePostTypeNewsValue.regular ? t("creativepost.postText") :
                    newsType == ECreativePostTypeNewsValue.image ? t("creativepost.postImage") :
                        newsType == ECreativePostTypeNewsValue.video ? t("creativepost.postVideo") : null : null}</div>
            },
        },
        {

            title: t('table.column.status'),
            // dataIndex: 'statusName',
            key: 'status',
            render: (value) => {
                return <div>
                    {(() => {
                        if (value.status === 0) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.draft")}</Tag>
                            )
                        } else if (value.status === 1) {
                            return (
                                <Tag color="red">{t("creativepost.tab.waiting")}</Tag>
                            )
                        }
                        else if (value.status === 2) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.approval")}</Tag>
                            )
                        }
                        else if (value.status === 3) {
                            return (
                                <Tag color="blue">{t("creativepost.tab.reject")}</Tag>
                            )
                        }
                        else if (value.status === 4) {
                            return (
                                <Tag color="geekblue">{t("creativepost.tab.calendar")}</Tag>
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
        {
            title: t('creativepost.sentDate'),
            dataIndex: 'sentDate',
            key: 'sentDate',
            render: (_, { sentDate }) => formatTimeInTable(sentDate),
        },
        {
            title: t('creativepost.rejectDate'),
            dataIndex: 'rejectDate',
            key: 'rejectDate',
            render: (_, { rejectDate }) => formatTimeInTable(rejectDate),
        },
        {
            title: t('creativepost.rejectBy'),
            dataIndex: 'rejectBy',
            key: 'rejectBy',
        },
        {
            title: t('creativepost.note'),
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: t('table.column.action'),
            //dataIndex: 'action',
            key: 'status',
            //width: 120,
            render: (value, record, index) => {
                return <div>
                    {(() => {
                        if (value.status === ECreativePostTypeValue.draft) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        } else if (value.status === ECreativePostTypeValue.waiting) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.approval) {
                            return (
                                <TableActions
                                    allowActions={['show', 'unpublish', 'hidepost']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.reject) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.calendar) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'cancel_calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
    ]
    const columnscalendar: ColumnsType<RecordDataType> = [
        {
            title: t('creativepost.stt'),
            dataIndex: 'stt',
            key: 'stt',
            render: (stt, recod, index) => (
                <Tooltip placement="topLeft" title={stt}>
                    {((DEFAULT_PAGE_INDEX - 1) * DEFAULT_PAGE_SIZE) + index + 1}
                </Tooltip>
            ),
        },
        {
            title: t('creativepost.title'),
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: t('creativepost.CategoryId'),
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: t('creativepost.newsType'),
            dataIndex: 'newsType',
            key: 'newsType',
            render: (newsType) => {
                return <div>{newsType !== '' ? newsType == ECreativePostTypeNewsValue.regular ? t("creativepost.postText") :
                    newsType == ECreativePostTypeNewsValue.image ? t("creativepost.postImage") :
                        newsType == ECreativePostTypeNewsValue.video ? t("creativepost.postVideo") : null : null}</div>
            },
        },
        {

            title: t('table.column.status'),
            // dataIndex: 'statusName',
            key: 'status',
            render: (value) => {
                return <div>
                    {(() => {
                        if (value.status === 0) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.draft")}</Tag>
                            )
                        } else if (value.status === 1) {
                            return (
                                <Tag color="red">{t("creativepost.tab.waiting")}</Tag>
                            )
                        }
                        else if (value.status === 2) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.approval")}</Tag>
                            )
                        }
                        else if (value.status === 3) {
                            return (
                                <Tag color="blue">{t("creativepost.tab.reject")}</Tag>
                            )
                        }
                        else if (value.status === 4) {
                            return (
                                <Tag color="geekblue">{t("creativepost.tab.calendar")}</Tag>
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
        {
            title: t('table.column.createBy'),
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: t('creativepost.sentDate'),
            dataIndex: 'senderDate',
            key: 'senderDate',
            render: (_, { senderDate }) => formatTimeInTable(senderDate),
        },
        {
            title: t('creativepost.scheduler'),
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            title: t('creativepost.postingDate'),
            dataIndex: 'scheduledPublishedDate',
            key: 'scheduledPublishedDate',
            render: (_, { scheduledPublishedDate }) => formatTimeInTable(scheduledPublishedDate),
        },
        {
            title: t('table.column.action'),
            //dataIndex: 'action',
            key: 'status',
            //width: 120,
            render: (value, record, index) => {
                return <div>
                    {(() => {
                        if (value.status === ECreativePostTypeValue.draft) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        } else if (value.status === ECreativePostTypeValue.waiting) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.approval) {
                            return (
                                <TableActions
                                    allowActions={['show', 'unpublish', 'hidepost']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.reject) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.calendar) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'cancel_calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
    ]
    const columnsdraft: ColumnsType<RecordDataType> = [
        {
            title: t('creativepost.stt'),
            dataIndex: 'stt',
            key: 'stt',
            render: (stt, recod, index) => (
                <Tooltip placement="topLeft" title={stt}>
                    {((DEFAULT_PAGE_INDEX - 1) * DEFAULT_PAGE_SIZE) + index + 1}
                </Tooltip>
            ),
        },
        {
            title: t('creativepost.title'),
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: t('creativepost.image'),
            dataIndex: 'image',
            key: 'image',
            render: (image) => {
                return <div>
                    {(() => {
                        if (image != null) {
                            return (
                                <Image src={image} width={100} preview={false} />
                            )
                        } else {
                            return (
                                <Image src="/assets/images/picture.png" width={100} preview={false} />
                            )
                        }



                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
            // (
            //     <Image src={image} width={150} preview={false} />
            // ),
        },
        {
            title: t('creativepost.CategoryId'),
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: t('creativepost.tag'),
            dataIndex: 'tags',
            key: 'tags',
        },
        {
            title: t('creativepost.newsType'),
            dataIndex: 'newsType',
            key: 'newsType',
            render: (newsType) => {
                return <div>{newsType !== '' ? newsType == ECreativePostTypeNewsValue.regular ? t("creativepost.postText") :
                    newsType == ECreativePostTypeNewsValue.image ? t("creativepost.postImage") :
                        newsType == ECreativePostTypeNewsValue.video ? t("creativepost.postVideo") : null : null}</div>
            },
        },
        {

            title: t('table.column.status'),
            // dataIndex: 'statusName',
            key: 'status',
            render: (value) => {
                return <div>
                    {(() => {
                        if (value.status === 0) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.draft")}</Tag>
                            )
                        } else if (value.status === 1) {
                            return (
                                <Tag color="red">{t("creativepost.tab.waiting")}</Tag>
                            )
                        }
                        else if (value.status === 2) {
                            return (
                                <Tag color="orange">{t("creativepost.tab.approval")}</Tag>
                            )
                        }
                        else if (value.status === 3) {
                            return (
                                <Tag color="blue">{t("creativepost.tab.reject")}</Tag>
                            )
                        }
                        else if (value.status === 4) {
                            return (
                                <Tag color="geekblue">{t("creativepost.tab.calendar")}</Tag>
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
        {
            title: t('table.column.createDate'),
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (_, { createdDate }) => formatTimeInTable(createdDate),
        },
        {
            title: t('table.column.action'),
            //dataIndex: 'action',
            key: 'status',
            //width: 180,
            render: (value, record, index) => {
                return <div>
                    {(() => {
                        if (value.status === ECreativePostTypeValue.draft) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        } else if (value.status === ECreativePostTypeValue.waiting) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.approval) {
                            return (
                                <TableActions
                                    allowActions={['show', 'unpublish', 'hidepost']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.reject) {
                            return (
                                <TableActions
                                    allowActions={['show', 'edit', 'delete', 'send_approval']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else if (value.status === ECreativePostTypeValue.calendar) {
                            return (
                                <TableActions
                                    allowActions={['show', 'approval', 'repay', 'cancel_calendar']}
                                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                                />
                            )
                        }
                        else {
                            return (
                                <div>catch all</div>
                            )
                        }
                    })()}
                    {/* {value.status === 0 ? value.status : value.status} */}

                </div>
            },
        },
    ]
    const _onChangeHeaderCheckbox = (e) => {
        console.log(e.target.checked)
        if (e.target.checked == true) {
            setChecked(true);
            setCheckTable(dataSearch.map(() => true));
        } else {
            setChecked(false)
            setCheckTable(dataSearch.map(() => false));
        }
    };
    const selectRow = (record) => {
        console.log(123)
        const selectedRowKeys1 = [...selectedRowKeys];
        if (selectedRowKeys1.indexOf(record.key) >= 0) {
            selectedRowKeys1.splice(selectedRowKeys1.indexOf(record.key), 1);
        } else {
            selectedRowKeys1.push(record.key);
        }
        console.log(selectedRowKeys1)
        setSelectedRowKeys(selectedRowKeys1);
    }
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function handleAdd() {

        setShowAdd(true)
    }
    const handleEdit = (recordEdit: any) => {
        setId(recordEdit.id)
        setShowEdit(true)
    }
    const handleShow = (recordEdit: any) => {
        setId(recordEdit.id)
        setShowView(true)
    }
    function handleDelete(recordEdit: any) {
        const charId = [];
        charId.push(recordEdit.id)
        setIds(charId)
        setShowDelete(true)

    }
    function handleApproval(recordEdit: any) {
        const charId = [];
        charId.push(recordEdit.id)
        setShowStatus(true)
        setShowText("warning.Do_you_want_to_browse_the_creati_post")
        setShowType(ECreativePostTypeValue.approval)
        setIds(charId)

    }
    function handleRepay(recordEdit: any) {
        const charId = [];
        charId.push(recordEdit.id)
        setShowStatus(true)
        setShowText("warning.Do_you_want_to_return_the_creati_post")
        setShowType(ECreativePostTypeValue.reject)
        setIds(charId)

    }
    function handleCalendar(recordEdit: any) {
        const charId = [];
        charId.push(recordEdit.id)
        setShowStatus(true)
        setShowText("warning.Do_you_want_to_schedule_posts")
        setShowType(ECreativePostTypeValue.calendar)
        setIds(charId)

    }
    function handleCancelCalendar(recordEdit: any) {
        const charId = [];
        charId.push(recordEdit.id)
        setShowStatus(true)
        setShowText("warning.Do_you_want_to_unschedule_a_post")
        setShowType(ECreativePostTypeValue.waiting)
        setIds(charId)

    }
    function handleHidePost(recordEdit: any) {

        const charId = [];
        charId.push(recordEdit.id)
        setShowHide(true)
        setShowText("warning.Do_you_want_to_hide_the_post")
        setIds(charId)

    }
    function handleSendApproval(recordEdit: any) {
        console.log(recordEdit.id)
        const charId = [];
        charId.push(recordEdit.id)
        setShowStatus(true)
        setShowText("warning.Do_you_want_to_wait_for_post_approval")
        setShowType(ECreativePostTypeValue.waiting)
        setIds(charId)

    }
    function handleUnPublish(recordEdit: any) {
        const charId = [];
        charId.push(recordEdit.id)
        setShowStatus(true)
        setShowText("warning.Do_you_want_to_unpublish_the_post")
        setShowType(ECreativePostTypeValue.waiting)
        setIds(charId)

    }

    return (
        <div className="p-4">

            <p className="text-primary text-[22px] font-body-bold mb-4">{t('creativepost.web_title')}</p>
            {/* <CreativePostFilter /> */}
            <Row justify="space-between" className="pb-4">
                <Col span={12}>
                    {/* <ActionFormLeft /> */}
                </Col>
                <Col span={12}>
                    <Row className="justify-end">
                        {/* <PappperButton className="btn-primary" rounded="medium" onClick={() => handleAdd()}>
                            {t('button.addNew')}
                        </PappperButton> */}
                    </Row>
                </Col>
            </Row>
            <CreativePostFilter hideShowWarning={setShowWarning} setWarningText={setWarningText} hideShowStatus={setShowStatus}
                selectedRowKeys={selectedRowKeys} setShowText={setShowText} setShowType={setShowType} hideShowHide={setShowHide} setShowAdd={setShowAdd}
                setShowEdit={setShowEdit} setId={setId} setIds={setIds} setShowDelete={setShowDelete} />
            <CreativePostTabList />
            <PapperTable
                rowSelection={rowSelection}
                columns={activeKey == ECreativePostType.approval ? columnsapproval : activeKey == ECreativePostType.draft ? columnsdraft :
                    activeKey == ECreativePostType.waiting ? columnswaiting : activeKey == ECreativePostType.calendar ? columnscalendar : columnsreject}
                rowKey={({ id }) => id}
                dataSource={dataSearch}
                pagination={{
                    current: pagination?.pageCurrent,
                    defaultPageSize: pagination?.pageSize,
                    total: pagination?.rowCount,
                }}
                onRow={(record) => ({
                    onClick: () => {
                        selectRow(record);
                    },
                })}
                loading={loading}
            />
            <PopupCreatiPostModal showWarning={showWarning} hideShowWarning={setShowWarning} warning={warningText} />
            <PopupChangeStatusModal showStatus={showStatus} hideShowStatus={setShowStatus} showText={showText} data={selectedRowKeys} type={showType} loadPage={loadPage} setLoadPage={setLoadPage} ids={ids} setIds={setIds} />
            <PopupShowHideModal showHide={showHide} hideShowHide={setShowHide} showText={showText} data={selectedRowKeys} loadPage={loadPage} setLoadPage={setLoadPage} ids={ids} setIds={setIds} />
            <CreateCreativePostModal showAdd={showAdd} hideAdd={setShowAdd} loadPage={loadPage} setLoadPage={setLoadPage} />
            <EditCreativePostModal showEdit={showEdit} hideEdit={setShowEdit} loadPage={loadPage} setLoadPage={setLoadPage} id={id} />
            <DeleteCreativePostModal showDelete={showDelete} hideDelete={setShowDelete} loadPage={loadPage} setLoadPage={setLoadPage} ids={ids} />
            <ViewCreativePostModal showView={showView} hideView={setShowView} id={id} />
            {/* <DeleteCategoryModal showDelete={showDelete} hideDelete={setShowDelete} loadPage={loadPage} setLoadPage={setLoadPage} ids={ids} />
            <PopupCategoryModal showWarning={showWarning} hideShowWarning={setShowWarning}  warning={warningText} /> */}
        </div>

    )
}

export interface ICreativePostActionsProps {
    wrapperJustify?: RowProps['justify']
    righElement?: ReactElement
    hideShowWarning
    setWarningText
    hideShowStatus
    selectedRowKeys
    setShowText
    setShowType
    hideShowHide
    setShowAdd
    setShowEdit
    setId
    setIds
    setShowDelete
}

export interface ICreativePostFilterValues {
    name?: string
}

export const CreativePostFilter = ({ wrapperJustify = 'start', righElement, hideShowWarning, setWarningText, hideShowStatus,
    selectedRowKeys, setShowText, setShowType, hideShowHide, setShowAdd, setShowEdit, setId, setIds, setShowDelete }: ICreativePostActionsProps) => {
    const [searchKey] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    const currentParams = useCurrentParams()
    const { t } = useAppTranslation()
    const [filterValues, setFilterValues] = useState<ICreativePostFilterValues>({
        name: '',
    })
    const [checkHidden, setCheckHidden] = useState(true)
    const [textButton, setTextButton] = useState([])
    const activeKey = searchKey.get('type')

    console.log(righElement)

    useEffect(() => {
        console.log(currentParams)
        setFilterValues((prevFilter) => ({
            ...prevFilter,
            ...currentParams,
        }))
        //cho duyet
        if (activeKey == ECreativePostType.waiting) {
            console.log(123)
            setCheckHidden(false)
            const text = ["creativepost.button.approval", "creativepost.button.repay", "creativepost.tab.calendar"]
            setTextButton(text)
        }
        //da duyet
        if (activeKey == ECreativePostType.approval) {
            setCheckHidden(true)
            const text = ["creativepost.button.approval", "creativepost.button.unPublish", "creativepost.button.hide_posts"]
            setTextButton(text)
        }
        //tra lai
        if (activeKey == ECreativePostType.reject) {
            setCheckHidden(false)
            const text = ["button.edit", "button.delete", "creativepost.button.send_approval"]
            setTextButton(text)
        }
        //dat lich
        if (activeKey == ECreativePostType.calendar) {
            setCheckHidden(false)
            setCheckHidden(false)
            const text = ["creativepost.button.approval", "creativepost.button.repay", "creativepost.button.cancel_calendar"]
            setTextButton(text)
        }
        //nhap
        if (activeKey == ECreativePostType.draft) {
            setCheckHidden(false)
            const text = ["button.edit", "button.delete", "creativepost.button.send_approval"]
            setTextButton(text)
        }
    }, [currentParams])

    const handleSearch = () => {
        const searchParams = createSearchParams({
            ...currentParams,
            ...filterValues,
        }).toString()
        navigate(`${location.pathname}?${searchParams}`, { replace: true })
    }
    function handleButton0() {

        if (activeKey == ECreativePostType.waiting) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_browse_the_creati_post")
                setShowType(ECreativePostTypeValue.approval)
            }
        }
        //da duyet
        if (activeKey == ECreativePostType.approval) {

        }
        //tra lai
        if (activeKey == ECreativePostType.reject) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.edit0")
            }
            else {
                if (selectedRowKeys.length > 1) {
                    hideShowWarning(true)
                    setWarningText("warning.editGreaterThan1")
                }
                else {
                    setShowEdit(true)
                    setId(selectedRowKeys[0])
                }

            }
        }
        //dat lich
        if (activeKey == ECreativePostType.calendar) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_browse_the_creati_post")
                setShowType(ECreativePostTypeValue.approval)
            }
        }
        //nhap
        if (activeKey == ECreativePostType.draft) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.edit0")
            }
            else {
                if (selectedRowKeys.length > 1) {
                    hideShowWarning(true)
                    setWarningText("warning.editGreaterThan1")
                }
                else {
                    setShowEdit(true)
                    setId(selectedRowKeys[0])
                }

            }
        }
    }
    function handleButton1() {

        if (activeKey == ECreativePostType.waiting) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_return_the_creati_post")
                setShowType(ECreativePostTypeValue.reject)
            }
        }
        //da duyet
        if (activeKey == ECreativePostType.approval) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_unpublish_the_post")
                setShowType(ECreativePostTypeValue.waiting)
            }

        }
        //tra lai
        if (activeKey == ECreativePostType.reject) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.delete0")
            }
            else {
                setShowDelete(true)
                setIds(selectedRowKeys)

            }
        }
        //dat lich
        if (activeKey == ECreativePostType.calendar) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_schedule_posts")
                setShowType(ECreativePostTypeValue.reject)
            }
        }
        //nhap
        if (activeKey == ECreativePostType.draft) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.delete0")
            }
            else {
                setShowDelete(true)
                setIds(selectedRowKeys)

            }
        }
    }
    function handleButton2() {

        if (activeKey == ECreativePostType.waiting) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_schedule_posts")
                setShowType(ECreativePostTypeValue.calendar)
            }
        }
        //da duyet
        if (activeKey == ECreativePostType.approval) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowHide(true)
                setShowText("warning.Do_you_want_to_hide_the_post")
            }
        }
        //tra lai
        if (activeKey == ECreativePostType.reject) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_wait_for_post_approval")
                setShowType(ECreativePostTypeValue.waiting)
            }
        }
        //dat lich
        if (activeKey == ECreativePostType.calendar) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_unschedule_a_post")
                setShowType(ECreativePostTypeValue.waiting)
            }
        }
        //nhap
        if (activeKey == ECreativePostType.draft) {
            if (selectedRowKeys.length == 0) {
                hideShowWarning(true)
                setWarningText("warning.no_records_selected")
            }
            else {
                hideShowStatus(true)
                setShowText("warning.Do_you_want_to_wait_for_post_approval")
                setShowType(ECreativePostTypeValue.waiting)
            }
        }
    }

    function handleAdd() {

        setShowAdd(true)
    }
    return (
        <Row justify={wrapperJustify} className="pb-4">
            <Col span={12}>
                <div className="flex">
                    <TextInputSearch
                        className="mr-3 w-1/2"
                        height="small"
                        rounded="medium"
                        value={filterValues?.name}
                        onChange={(e) => setFilterValues({ ...filterValues, name: e.target.value })}
                        placeholder={t('placeholder.search')}
                        onSearch={handleSearch}
                    />
                </div>
            </Col>
            <Col span={12}>
                <Row className="justify-end">
                    <PappperButton className="btn-primary" rounded="medium" onClick={() => handleAdd()}>
                        {t('button.addNew')}
                    </PappperButton>
                    <PappperButton className="btn-primary" rounded="medium" style={{ "marginLeft": "10px" }} hidden={checkHidden} onClick={() => handleButton0()}>
                        {t(textButton[0])}
                    </PappperButton>
                    <PappperButton className="btn-primary" rounded="medium" style={{ "marginLeft": "10px" }} onClick={() => handleButton1()}>
                        {t(textButton[1])}
                    </PappperButton>
                    <PappperButton className="btn-primary" rounded="medium" style={{ "marginLeft": "10px" }} onClick={() => handleButton2()}>
                        {t(textButton[2])}
                    </PappperButton>
                </Row>
            </Col>
            {righElement}
        </Row>
    )
}

export const CreativePostTabList = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { t } = useAppTranslation()
    const tabs = [
        {
            key: ECreativePostType.draft,
            label: t('creativepost.tab.draft'),
        },
        {
            key: ECreativePostType.waiting,
            label: t('creativepost.tab.waiting'),
        },
        
        {
            key: ECreativePostType.reject,
            label: t('creativepost.tab.reject'),
        },
        {
            key: ECreativePostType.calendar,
            label: t('creativepost.tab.calendar'),
        },
        {
            key: ECreativePostType.approval,
            label: t('creativepost.tab.approval'),
        },
       
    ]
    const defaultActiveKey = searchParams.get('type') || tabs[0].key

    const handleChangeTab = (key: string) => {
        navigate({
            pathname: RouterHelper.creativepost,
            search: createSearchParams({
                type: key,
            }).toString(),
        })
    }
    return (

        <PaperPageHeaderForList
            // title={t('creativepost.web_title')}
            tabs={tabs}
            defaultActiveKey={defaultActiveKey}
            onTabChange={handleChangeTab}
        />
    )
}