import Rating, { RatingComponentProps } from 'react-rating'
import { StarFilled, StarOutlined } from '@ant-design/icons'

export interface IPapperRatingProps extends RatingComponentProps {}

export const PapperRating = ({ emptySymbol, fullSymbol, ...props }: IPapperRatingProps) => {
  return (
    <Rating
      fullSymbol={fullSymbol || <StarFilled className="text-yellow-400 text-xl" />}
      emptySymbol={emptySymbol || <StarOutlined className="text-yellow-400 text-xl" />}
      {...props}
    />
  )
}
