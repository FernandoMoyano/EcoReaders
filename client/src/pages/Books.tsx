//books.tsx

import { useSelector } from 'react-redux'
import { useGetBooksQuery } from '../app/api/api'
import ModalNewBook from '../components/ModalNewBook'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { BookI } from '../interfaces/BookI'
import { Link } from 'react-router-dom'
import { RootState } from '../app/store'
//import numeral from 'numeral'
import { formatearNumero } from '../utilities'

const Books: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.user)
  const { data, isLoading, isError } = useGetBooksQuery()
  console.log(data)
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <div>Ocurrió un error inesperado</div>
  }

  return (
    <div>
      <NavBar />
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {data?.books?.map((book: BookI) => (
          <div
            key={book.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <Link to={`/books/${book.id}`}>
              <img src={book.images.frontCover} alt="Product" className="h-80 w-72 object-contain rounded-t-xl" />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">{book.author}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">{formatearNumero(book.price)}</p>
                  <div className="ml-auto">
                    <p>Publicado por {username}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <ModalNewBook />
    </div>
  )
}

export default Books
