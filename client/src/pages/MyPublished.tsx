//MyPublished

//import { useSelector } from 'react-redux'
//import { RootState } from '../app/store'
import NavBar from '../components/NavBar'
import { useGetMyPublishedBooksQuery } from '../app/api/api'
//import { UserId } from '../../../src/interfaces/User.interface'
import { useParams } from 'react-router-dom'
import { formatearNumero } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

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
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {data?.map((book) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">{book.author}</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
              <div className="flex items-center justify-evenly">
                <p className="text-lg font-semibold text-black cursor-auto my-3">${formatearNumero(book.price)}</p>
                <FontAwesomeIcon icon={faTrashCan} />
                <button className="w-24 py-2 px-6 bg-violet-500 p-2 rounded-md  text-white  hover:bg-violet-600 focus:outline-none">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
export default MyPublished
