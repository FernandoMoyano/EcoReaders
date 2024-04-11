//MyPublished

//import { useSelector } from 'react-redux'
//import { RootState } from '../app/store'
import NavBar from '../components/NavBar'
import { useGetMyPublishedBooksQuery } from '../app/api/api'
//import { UserId } from '../../../src/interfaces/User.interface'
import { useParams } from 'react-router-dom'

const MyPublished = () => {
  //const userId = useSelector((state: RootState) => state.auth.userLoggedIn.userId)
  //const publishedBook = useSelector((state: RootState) => state.books.publishedBooks)
  const { userId } = useParams()

  const { data, error, isLoading } = useGetMyPublishedBooksQuery(userId ?? '')
  //DEBUG: ↴
  console.log(data)

  if (isLoading) return <div>Loading...</div>

  if (error) {
    return <div>Error al cargar los detalles</div>
  }

  //const myPublishedBooks = Object.values(publishedBook).filter((book) => book.publisherId === userId)
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((book) => (
          <div className="me-4 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-black text-surface">
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight">{book.title}</h5>
              <p className="mb-4 text-base">{book.description}</p>
              <button
                type="button"
                className="inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default MyPublished
