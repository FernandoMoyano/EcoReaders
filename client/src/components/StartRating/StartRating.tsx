import { useDispatch, useSelector } from 'react-redux'
import { setRating } from '../../features/rating/ratingSlice'
import { RootState } from '../../app/store'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { IStarRatingProps } from './IStartRatingProps'

const StarRating: React.FC<IStarRatingProps> = ({ bookId }) => {
  //Estados
  const [hover, setHover] = useState<number | null>(null)
  //Dispatch | selector
  const dispatch = useDispatch()
  const rating = useSelector((state: RootState) => state.ratings.ratings[bookId]) || 0

  //Manejo del rating
  const handleSetRating = (ratingValue: number) => {
    dispatch(setRating({ bookId, rating: ratingValue }))
  }

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <label key={ratingValue}>
            <input
              className="sr-only"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleSetRating(ratingValue)}
            />
            <FontAwesomeIcon
              icon={faStar}
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating
