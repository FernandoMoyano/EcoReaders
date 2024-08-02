//Book.ts

import React, { useState } from 'react'
import { useGetBooksQuery } from '../app/api/api'
import ModalNewBook from '../components/ModalNewBook/ModalNewBook'
import NavBar from '../components/NavBar/NavBar'
import Spinner from '../components/Spinner/Spinner'
import { IBook } from '../interfaces/IBook'
import { Link } from 'react-router-dom'
import { formatearNumero } from '../utilities'
import { useSelector } from 'react-redux'
import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Books: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 9

  const { data, isLoading, isError } = useGetBooksQuery({ page: currentPage, limit })
  const publishedBooks = useSelector((state: RootState) => state.books.publishedBooks)

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

      {/* Controles de Paginación */}
      <div className="flex justify-center items-center mt-8">
        {/*  <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 text-white bg-gray-900 rounded disabled:bg-gray-400"
        >
          Anterior
        </button> */}

        <FontAwesomeIcon
          icon={faLessThan}
          className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-white cursor-not-allowed' : 'bg-gray-900 text-white cursor-pointer'}`}
          onClick={() => handlePageChange(currentPage - 1)}
        />

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            {index + 1}
          </button>
        ))}

        {/*  <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 text-white bg-gray-900 rounded disabled:bg-gray-400"
        >
          Siguiente
        </button> */}

        <FontAwesomeIcon
          icon={faGreaterThan}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-white cursor-not-allowed' : 'bg-gray-900 text-white cursor-pointer'}`}
        />
      </div>
      <ModalNewBook />
    </div>
  )
}

export default Books
