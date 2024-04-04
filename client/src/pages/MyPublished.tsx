import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

const MyPublished = () => {
  const userId = useSelector((state: RootState) => state.auth.userLoggedIn.userId)
  const publishedBook = useSelector((state: RootState) => state.books.publishedBooks)

  const myPublishedBooks = Object.values(publishedBook).filter((book) => book.publisherId === userId)
  return (
    <div>
      <div>MyPublished</div>
    </div>
  )
}

export default MyPublished
