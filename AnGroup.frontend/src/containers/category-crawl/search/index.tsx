import { ColumnsType } from 'antd/lib/table'
import { PapperTable } from '~/components/common'
import { useAppTranslation, useCurrentParams } from '~/hooks'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { EActionsType, TableActions } from '~/components/common/table/columns'
import { createSearchParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { Col, Row, RowProps, Checkbox, Tooltip } from 'antd'
import { ReactElement } from 'react'
import { TextInputSearch, SelectBox } from '~/components/common'
import { useEffect, useState } from 'react'
import { PaperPageHeaderForList } from '~/components/layout'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { categoryCrawlSearchRequest } from '~/redux/slices/categorycrawl/middleware'
import { PappperButton } from '~/components/common'
import { EditCategotyCrawlModal } from '~/containers/category-crawl/edit'
import { CreateCategoryCrawlModal } from '~/containers/category-crawl/add'
import { PopupShowHideModal } from '~/containers/creativepost/popup/showhide'
import { toast } from 'react-toastify'

interface RecordDataType {
    key: React.ReactNode
    stt: string
    name: string
    link: string
    content: string
    description: string
    tag: string
    publishDate: string
    statusname: string
    createdDate: string
    checkbox: boolean
    createdBy: string
    code: string
    status: string
    modifiedBy: string
}
export const SearchCategoryCrawlContainer = () => {
    const { t } = useAppTranslation();
    const navigate = useNavigate();
    const currentParams = useCurrentParams();
    const dispatch = useAppDispatch();
    const pagination = useAppSelector((state) => state.categoryCrawl.pagination);
    const loading = useAppSelector((state) => state.categoryCrawl.loading);
    const dataSearch = useAppSelector((state) => state.categoryCrawl.datacategoryCrawls);
    const [loadPage, setLoadPage] = useState(false);
    const [id, setId] = useState();
    const [showView, setShowView] = useState(false);
    const [showAdd, setShowAdd] = useState(false)
    const [showData, setShowData] = useState(null)

    const [showEdit, setShowEdit] = useState(false)


    const handleEdit = (recordEdit: any) => {
        setId(recordEdit.id)
        setShowEdit(true);

    }

    const handleColumnAction = (actionType, value, record) => {
        if (actionType === EActionsType.edit) {
            handleEdit(record)
        }
    }

    const getData = (_params) => {
        const { name, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE, sort } = _params
        dispatch(
            categoryCrawlSearchRequest({
                data: {
                    pagination: {
                        pageIndex: Number(pageIndex),
                        pageSize: Number(pageSize),
                    },
                    filter: {
                        sort: sort || '',
                        querySearch: '',
                        name: name || '',
                    },
                },
            }),
        )
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
            title: t('configuration.Name'),
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            // sortDirections: ['descend'],
        },
        {
            title: t('createpost.Link'),
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: t('table.column.action'),
            dataIndex: 'action',
            key: 'action',
            render: (value, record, index) => (
                <TableActions
                    allowActions={['edit']}
                    onAction={(actionType, value) => handleColumnAction(actionType, value, record)}
                />
            ),
        },
    ]



    return (
        <div className="p-4">
            <p className="text-primary text-[22px] font-body-bold mb-4">{t('creativepost.web_title_crawl')}</p>
            <CategoryCrawlFilter setShowAdd={setShowAdd} />
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
            <EditCategotyCrawlModal showEdit={showEdit} hideEdit={setShowEdit} loadPage={loadPage} setLoadPage={setLoadPage} id={id} />
            <CreateCategoryCrawlModal showAdd={showAdd} hideAdd={setShowAdd} loadPage={loadPage} setLoadPage={setLoadPage} />

        </div>
    )
}

export interface ICreativePostActionsProps {
    wrapperJustify?: RowProps['justify']
    righElement?: ReactElement
    setShowAdd
}

export interface ICreativePostFilterValues {
    name?: string
}

export const CategoryCrawlFilter = ({ wrapperJustify = 'start', righElement, setShowAdd }: ICreativePostActionsProps) => {
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
                </Row>
            </Col>
            {righElement}
        </Row>
    )
}

