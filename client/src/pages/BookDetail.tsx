//BookDetail.tsx
import { useParams } from 'react-router-dom'
import { useGetBookQuery } from '../app/api/api'
import Spinner from '../components/Spinner'
import { BookI, GetBook } from '../interfaces/BookI'

const BookDetail = () => {
  const { id } = useParams<{ id: string }>()
  console.log('ID del libro:', id)
  const { data, error, isLoading } = useGetBookQuery(id!)
  console.log(data)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error al cargar los detalles</div>
  }
  // Verifica si data está definido y no está vacío
  if (!data || data.length === 0) {
    return <div>No se encontró el libro con el ID proporcionado</div>
  }

  const book: BookI = data[0]

  return <div>{book.title}</div>
}

export default BookDetail
