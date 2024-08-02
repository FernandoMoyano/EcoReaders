//Book.ts

import React, { useEffect, useState } from 'react'
import { useGetBooksQuery } from '../app/api/api'
import ModalNewBook from '../components/ModalNewBook/ModalNewBook'
import NavBar from '../components/NavBar/NavBar'
import Spinner from '../components/Spinner/Spinner'
import { IBook } from '../interfaces/IBook'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatearNumero } from '../utilities'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Pagination from '../components/Pagination/Pagination'

const Books: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const initialPage = parseInt(queryParams.get('page') || '1', 10)

  const [currentPage, setCurrentPage] = useState(initialPage)
  const limit = 8

  const { data, isLoading, isError } = useGetBooksQuery({ page: currentPage, limit })
  const publishedBooks = useSelector((state: RootState) => state.books.publishedBooks)

  useEffect(() => {
    navigate(`?page=${currentPage}`)
  }, [currentPage, navigate])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <div>Ocurrió un error inesperado</div>
  }

  const totalPages = data ? Math.ceil(data.totalBooks / limit) : 1
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div>
      <NavBar />
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-20 mb-5">
        {data?.books?.map((book: IBook) => (
          <div
            key={book.id}
            className="w-56 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <Link to={`/books/${book.id}`} className="flex flex-col items-center w-56">
              <img src={book.image} alt="Product" className="h-56 w-52 object-contain rounded-t-xl" />
              <div className="px-4 py-3 w-56">
                <span className="text-gray-400 mr-3 uppercase text-xs">{book.author}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">${formatearNumero(book.price)}</p>
                  <div className="ml-auto">
                    <p className="flex flex-wrap end justify-end mr-1">
                      publicado por:
                      <span className="text-black font-bold ml-2">
                        {book.publisherName || publishedBooks[book.id].postedByUser}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <ModalNewBook />
    </div>
  )
}

export default Books
