import { ColumnsType } from 'antd/lib/table'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PapperRating } from '~/components/common'
import { PapperTable } from '~/components/common/table'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { reviewGetAllRequest } from '~/redux/slices/review/middleware'
import { formatTimeInTable, RouterHelper } from '~/utils'
import { CmsReviewListActions } from '../actions'

interface RecordDataType {
  key: React.ReactNode
  id: string
  customer: string
  product: string
  ratingProduct: number
  commentProduct: string
  ratingService: number
  commentService: string
  sale: string
  time: string
  createdDate: string
}

export const CmsReviewList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const dataReview = useAppSelector((state) => state.review.dataReview)
  const loading = useAppSelector((state) => state.review.loading)
  const { t } = useAppTranslation()

  const columns: ColumnsType<RecordDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('review.Customer'),
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: t('review.Ghh.AppID'),
      dataIndex: 'profileId',
      key: 'profileId',
    },
    {
      title: t('review.ratingProduct'),
      dataIndex: 'ratingProduct',
      key: 'ratingProduct',
      width: '13%',
      render: (value) => <PapperRating readonly initialRating={value} />,
    },
    {
      title: t('review.commentProduct'),
      dataIndex: 'commentProduct',
      key: 'commentProduct',
      render: (_, { commentProduct }) => {
        return <div className="w-36 truncate">{commentProduct}</div>
      },
    },
    {
      title: t('review.ratingSale'),
      dataIndex: 'ratingService',
      key: 'ratingService',
      width: '13%',
      render: (value) => <PapperRating readonly initialRating={value} />,
    },
    {
      title: t('review.commentSale'),
      dataIndex: 'commentService',
      key: 'commentService',
      render: (_, { commentService }) => {
        return <div className="w-36 truncate">{commentService}</div>
      },
    },
    {
      title: t('review.Sale'),
      dataIndex: 'saleName',
      key: 'saleName',
    },
    {
      title: t('review.Time'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_, { createdDate }) => {
        return <span>{formatTimeInTable(createdDate)}</span>
      },
    },
  ]

  const handleRowClick = (record: RecordDataType) => {
    navigate({
      pathname: RouterHelper.cms_review_detail_ref(record.id),
      // search: createSearchParams({ ...currentParams, org_name: record.group }).toString(),
    })
  }

  useEffect(() => {
    dispatch(
      reviewGetAllRequest({
        reviewFilter: {
          pagination: {
            pageIndex: 1,
            pageSize: 25,
          },
          filter: {
            saleId: '',
            userId: '',
            rating: '',
            ProfileId: '',
          },
        },
      }),
    )
  }, [dispatch])

  return (
    <div className="bg-white p-4">
      <CmsReviewListActions />
      <PapperTable
        dataSource={dataReview?.result}
        columns={columns}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleRowClick(record),
          }
        }}
      />
    </div>
  )
}
