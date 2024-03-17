//books.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import { useGetBooksQuery } from '../app/api/api'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { BookI } from '../interfaces/BookI'
import { Link } from 'react-router-dom'

const Books: React.FC = () => {
  const { data, isLoading, isError } = useGetBooksQuery()
  //console.log(data)
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
              <img src={book.images.frontCover} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">{book.author}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">${book.price}</p>
                  <div className="ml-auto">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Books
