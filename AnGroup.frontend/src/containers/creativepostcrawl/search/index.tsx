import { ColumnsType } from 'antd/lib/table'
import { PapperTable } from '~/components/common'
import { useAppTranslation, useCurrentParams } from '~/hooks'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { createSearchParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { Col, Row, RowProps, Checkbox, Tooltip, Tag } from 'antd'
import { ReactElement } from 'react'
import { TextInputSearch, SelectBox } from '~/components/common'
import { useEffect, useState } from 'react'
import { PaperPageHeaderForList } from '~/components/layout'
import { ECreativePostTypeNewsValue } from '~/containers/creativepost/search/index.types'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { creativePostSearchRequest, creativePostUpdateListIdStatusRequest } from '~/redux/slices/creativepost/middleware'
import { PappperButton } from '~/components/common'
import { ViewCreativePostCrawlModal } from '~/containers/creativepostcrawl/view'
import { CreateCreativePostCrawlModal } from '~/containers/creativepostcrawl/add'
import {EditorCreativePostCrawlModal} from '~/containers/creativepostcrawl/editor'
import { PopupShowHideModal } from '~/containers/creativepost/popup/showhide'
import { toast } from 'react-toastify'

interface RecordDataType {
    key: React.ReactNode
    stt: string
    categoryName: string
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
    publishedDate: string
    link: string
    source: string
}
export const SearchCreativePostCrawlContainer = () => {
    const { t } = useAppTranslation();
    const navigate = useNavigate();
    const currentParams = useCurrentParams();
    const dispatch = useAppDispatch();
    const pagination = useAppSelector((state) => state.creativePost.pagination);
    const loading = useAppSelector((state) => state.creativePost.loading);
    const dataSearch = useAppSelector((state) => state.creativePost.datacreativePosts);
    const [loadPage, setLoadPage] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchKey] = useSearchParams()
    const [id, setId] = useState();
    const [showView, setShowView] = useState(false);
    const [showAdd, setShowAdd] = useState(false)
    const [showData, setShowData] = useState(null)
    const [showEditor, setShowEditor] = useState(false)


    const handleView = (recordEdit: any) => {
        setId(recordEdit.id)
        setShowView(true)
    }
    const handleEditor = (recordEdit: any) => {
        setId(recordEdit.id)
        setShowEditor(true)
    }

    const handleColumnAction = (actionType, value, record) => {
        if (actionType === EActionsType.show) {
            handleView(record)
        }
        if (actionType === EActionsType.edit) {
            handleEditor(record)
        }
    }

    const getData = (_params) => {
        const { name, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE, sort } = _params
        dispatch(
            creativePostSearchRequest({
                data: {
                    pagination: {
                        pageIndex: Number(pageIndex),
                        pageSize: Number(pageSize),
                    },
                    filter: {
                        querySearch: '',
                        sort: sort || '',
                        title: name || '',
                        type: 1
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


    const columns: ColumnsType<RecordDataType> = [
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
            sorter: (a, b) => a.title.localeCompare(b.title),
            // sortDirections: ['descend'],
        },
        {
            title: t('creativepost.CategoryId'),
            dataIndex: 'categoryNameCrawl',
            key: 'categoryNameCrawl',
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
            title: t('creativepost.tag'),
            dataIndex: 'tags',
            key: 'tags',
            // sorter: (a, b) => a.tag.length - b.tag.length,
            // sortDirections: ['descend'],
        },
        {
            title: t('creativepost.author'),
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: t('createpost.source'),
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: t('creativepost.postedDate'),
            dataIndex: 'publishedDate',
            key: 'publishedDate',
            render: (publishedDate, record, index) => {
                if (publishedDate == null) {
                    return null
                }
                else {
                    return formatTimeInTable(publishedDate)
                }
            },
            //render: (_, { publishedDate }) => formatTimeInTable(publishedDate),
        },
        {
            title: t('table.column.action'),
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (value, record, index) => (
                <TableActions
                    allowActions={['show', 'edit']}
                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                />
            ),
        },

    ]



    return (
        <div className="p-4">
            <p className="text-primary text-[22px] font-body-bold mb-4">{t('creativepost.web_title_crawl')}</p>
            <CreativePostFilter />
            <PapperTable
                //rowSelection={ rowSelection }
                columns={columns}
                rowKey={({ id }) => id}
                dataSource={dataSearch}
                pagination={{
                    current: pagination?.pageCurrent,
                    defaultPageSize: pagination?.pageSize,
                    total: pagination?.rowCount,
                }}
                // onRow={(record) => ({
                //     onClick: () => {
                //         selectRow(record);
                //     },
                //   })}
                loading={loading}
            />
            <ViewCreativePostCrawlModal showView={showView} hideView={setShowView} loadPage={loadPage} setLoadPage={setLoadPage} id={id} setDataCrawl={setShowData} hideAdd={setShowAdd} />
            <CreateCreativePostCrawlModal showAdd={showAdd} hideAdd={setShowAdd} loadPage={loadPage} setLoadPage={setLoadPage} showView={showView} hideView={setShowView}
                dataCrawl={showData} setDataCrawl={setShowData} />
            <EditorCreativePostCrawlModal showEditor={showEditor} hideEditor={setShowEditor} loadPage={loadPage} setLoadPage={setLoadPage} id={id} />
        </div>
    )
}

export interface ICreativePostActionsProps {
    wrapperJustify?: RowProps['justify']
    righElement?: ReactElement
}

export interface ICreativePostFilterValues {
    name?: string
}

export const CreativePostFilter = ({ wrapperJustify = 'start', righElement }: ICreativePostActionsProps) => {
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


    useEffect(() => {
        setFilterValues((prevFilter) => ({
            ...prevFilter,
            ...currentParams,
        }))
    }, [currentParams])

    const handleSearch = () => {
        const searchParams = createSearchParams({
            ...currentParams,
            ...filterValues,
        }).toString()
        navigate(`${location.pathname}?${searchParams}`, { replace: true })
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

            {righElement}
        </Row>
    )
}

