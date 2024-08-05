//PAGES - BOOKDETAIL.tsx
import { useParams } from 'react-router-dom'
import { useGetBookQuery } from '../app/api/api'
import Spinner from '../components/Spinner/Spinner'
import { IBook } from '../interfaces/IBook'
import NavBar from '../components/NavBar/NavBar'
import StarRating from '../components/StartRating/StartRating'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

const BookDetail = () => {
  const publishedBook = useSelector((state: RootState) => state.books.publishedBooks)
  const { id } = useParams<{ id: string }>()
  const { data, error, isLoading } = useGetBookQuery(id!)

  //DEBUG:
  console.log(data)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error al cargar los detalles</div>
  }

  // Verifica si data está definido y no está vacío
  if (!data) {
    return <div>No se encontró el libro con el ID proporcionado</div>
  }

  //DEBUG:
  console.log(`data es ${data}`)
  const book: IBook = data

  if (!book || !book.image || !book.title) {
    return <div>Información del libro incompleta</div>
  }

  //DEBUG:
  console.log(book)

  return (
    <div>
      <NavBar />
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto content-center">
          <div className="lg:w-4/5 mx-auto flex flex-wrap gap-4">
            <img
              alt="ecommerce"
              className="lg:w-1/3  w-full object-contain object-center rounded border border-gray-200"
              src={book.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{book.author}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{book.title}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <StarRating bookId={book.id} />
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200"></span>
              </div>
              <p className="leading-relaxed">{book.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">
                    Publicado por:
                    <span className="text-black font-bold">
                      {' '}
                      {book.publisherName || publishedBook[book.id].postedByUser}
                    </span>
                  </span>
                  <p></p>
                </div>
                <div className="flex ml-6 items-center"></div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">${book.price}</span>
                <button className="flex ml-auto text-white bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded">
                  Contactar al dueño
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookDetail
