//PublicationForm.tsx
import { useState } from 'react'
import { BookCategory, BookCondition, BookStatus, NewBook } from '../interfaces/BookI'
import { usePostNewBookMutation } from '../app/api/api'
import Spinner from './Spinner'

const PublicationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false) // Estado para manejar la carga
  const [postNewBook] = usePostNewBookMutation() // Obtener la función para enviar el nuevo libro
  const [dataNewBook, setDataNewBook] = useState<NewBook>({
    title: '',
    description: '',
    author: '',
    price: 0,
    images: {
      frontCover: '',
      backCover: '',
    },
    bookCondition: BookCondition.NEW,
    category: BookCategory.OTHER,
    status: BookStatus.AVAILABLE,
    publisherId: '31701e1e-579a-423c-9a22-a6c9a2a21188',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    const newValue = name === 'price' ? parseFloat(value) : value
    setDataNewBook((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setDataNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleNewBook = async (dataNewBook: NewBook) => {
    try {
      setIsLoading(true)
      console.log('Data del nuevo libro:', dataNewBook)
      const result = await postNewBook(dataNewBook)
      if ('data' in result) {
        console.log('Libro publicado:', result.data)
        //mostrar una notificación de éxito
      } else if ('error' in result) {
        console.error('Error al publicar el libro:', result.error)
        //mostrar una notificación de error
      }
    } catch (error) {
      console.error('Error al publicar el libro:', error)
      //Aquí podrías mostrar una notificación de error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="mt-10 space-y-4">
      {/* Titulo */}
      <div>
        <input
          name="title"
          type="text"
          autoComplete="title"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
          placeholder="Titulo"
          onChange={handleInputChange}
        />
      </div>

      {/* description */}
      <div>
        <textarea
          name="description"
          autoComplete="description"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
          placeholder="Descripcion"
          onChange={handleInputChange}
        />
      </div>

      {/* Autor */}
      <div className="flex items-center justify-between gap-4">
        <input
          name="author"
          type="text"
          autoComplete="author"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
          placeholder="Autor"
          onChange={handleInputChange}
        />
      </div>

      {/* Precio */}
      <div className="flex items-center justify-between gap-4">
        <input
          name="price"
          type="number"
          autoComplete="price"
          placeholder="$2.000.00"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
          onChange={handleInputChange}
        />
      </div>

      {/* -Imagen Frontal */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="frontCover">Imagen de Tapa</label>
        <input
          name="frontCover"
          type="text"
          placeholder="url imagen de tapa"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
          onChange={handleInputChange}
        />
      </div>

      {/* -Imagenes Contratapa */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="backCover">Imagen de contratapa</label>
        <input
          name="backCover"
          type="text"
          placeholder="url imagen de contratapa"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
          onChange={handleInputChange}
        />
      </div>

      {/* condition */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="bookCondition">Condición del libro</label>
        <select name="bookCondition" id="bookCondition" onChange={handleSelectChange}>
          {Object.values(BookCondition).map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      {/* Categoria */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="category">Categoria:</label>
        <select name="category" id="category" onChange={handleSelectChange}>
          {Object.values(BookCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="">Estado</label>
        <select name="status" id="status" onChange={handleSelectChange}>
          {Object.values(BookStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* botón de envio */}
      <div className="!mt-10">
        <button
          type="button"
          className="w-full py-2.5 px-4 text-sm rounded text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
          onClick={() => handleNewBook(dataNewBook)}
        >
          {isLoading ? <Spinner /> : 'Publicar'}
        </button>
      </div>
    </form>
  )
}

export default PublicationForm
