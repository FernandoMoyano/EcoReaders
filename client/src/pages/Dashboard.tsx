import { useGetBooksQuery } from '../app/api/api'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'
import { BookI } from '../interfaces/BookI'

const Dashboard: React.FC = () => {
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
      <div>{data?.books?.map((book: BookI) => <li key={book.id}>{book.title}</li>)}</div>
    </div>
  )
}

export default Dashboard
