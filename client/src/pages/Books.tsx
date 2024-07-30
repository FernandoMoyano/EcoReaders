import React, { useRef, useState, useEffect } from 'react'
import { useGetBooksQuery } from '../app/api/api'
import ModalNewBook from '../components/ModalNewBook/ModalNewBook'
import NavBar from '../components/NavBar/NavBar'
import Spinner from '../components/Spinner/Spinner'
import { IBook } from '../interfaces/IBook'
import { Link } from 'react-router-dom'
import { formatearNumero } from '../utilities'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

const Books: React.FC = () => {
  const { data, isLoading, isError } = useGetBooksQuery()
  const publishedBooks = useSelector((state: RootState) => state.books.publishedBooks)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
    }
  }, [currentIndex])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0)
      return newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = data?.books ? Math.ceil(data.books.length / 4) - 1 : 0
      const newIndex = Math.min(prevIndex + 1, maxIndex)
      return newIndex
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <div>Ocurrió un error inesperado</div>
  }

  return (
    <div>
      <NavBar />
      <section className="container mx-auto mt-32 mb-5">
        <div className="relative">
          {/* Button Prev__________________________ */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full z-10 hover:bg-gray-700 focus:outline-none"
            onClick={handlePrev}
          >
            ‹
          </button>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" ref={sliderRef}>
              {data?.books?.map((book: IBook) => (
                <div key={book.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                  <Link to={`/books/${book.id}`} className="block">
                    <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-98 hover:shadow-xl flex flex-col items-center mx-auto">
                      <img src={book.image} alt="Product" className="h-52 w-52 object-contain rounded-t-xl" />
                      <div className="px-4 py-3 w-52 truncate">
                        <span className="text-gray-400 mr-3 uppercase text-xs">{book.author}</span>
                        <p className="text-base font-bold text-black truncate block capitalize">{book.title}</p>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold text-black cursor-auto my-3">
                            ${formatearNumero(book.price)}
                          </p>
                          <div className="ml-auto">
                            <p className="flex text-sm flex-wrap end justify-end mr-1">
                              publicado por:
                              <span className="text-black text-sm font-bold ml-2">
                                {book.publisherName || publishedBooks[book.id].postedByUser}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Button next___________________________ */}
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full z-10 hover:bg-gray-700 focus:outline-none"
            onClick={handleNext}
          >
            ›
          </button>
        </div>
      </section>
      <ModalNewBook />
    </div>
  )
}

export default Books
