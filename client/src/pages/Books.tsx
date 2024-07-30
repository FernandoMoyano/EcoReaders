//PAGES - BOOKS

import { useGetBooksQuery } from '../app/api/api'
import ModalNewBook from '../components/ModalNewBook/ModalNewBook'
import NavBar from '../components/NavBar/NavBar'
import Spinner from '../components/Spinner/Spinner'
import { IBook } from '../interfaces/IBook'
import { Link } from 'react-router-dom'
import { formatearNumero } from '../utilities'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Books: React.FC = () => {
  const { data, isLoading, isError } = useGetBooksQuery()
  const publishedBooks = useSelector((state: RootState) => state.books.publishedBooks)
  //DEBUG:
  console.log(data)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <div>Ocurrió un error inesperado</div>
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <div>
      <NavBar />
      <section className="container m-auto mt-32 mb-5">
        <div className="w-4/5 mx-auto">
          <Slider {...settings}>
            {data?.books?.map((book: IBook) => (
              <div key={book.id} className="p-1">
                <Link to={`/books/${book.id}`} className="block w-52">
                  <div className="w-52 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center">
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
          </Slider>
        </div>
      </section>
      <ModalNewBook />
    </div>
  )
}

export default Books
