// PUBLICATIONFORM.tsx

import React, { useRef, useState } from 'react'
import { BookCategory, BookCondition, BookStatus, NewBook } from '../../interfaces/IBook'
import { usePostNewBookMutation } from '../../app/api/api'
import Spinner from '../Spinner/Spinner'
import Notification from '../Notification/Notification'

const PublicationForm: React.FC = () => {
  const userDataString = localStorage.getItem('userLoggedIn')
  let userId = null

  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString)
      if (userData && typeof userData === 'object' && 'userId' in userData) {
        userId = userData.userId
      }
    } catch (error) {
      console.error('Error al parsear userData:', error)
    }
  }

  const priceValueRef = useRef<HTMLInputElement>(null)

  // ➡️Uso del hook provisto por el archivo api RTK

  const [postNewBook, { isLoading }] = usePostNewBookMutation()

  //➡️estado que maneja la data para hacer POST de un nuevo libro

  const [dataNewBook, setDataNewBook] = useState<NewBook>({
    title: '',
    description: '',
    author: '',
    price: 0,
    image: '',
    bookCondition: BookCondition.NEW,
    category: BookCategory.OTHER,
    status: BookStatus.AVAILABLE,
    publisherId: userId,
  })

  // ➡️Estado para la notificación
  const [showNotification, setShowNotification] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  //➡️Manejo de los inputs_______________________

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setDataNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  //➡️Manejo de los select___________________________

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    setDataNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  //➡️Manejo del input de precio__________________________

  const handlePriceChange = () => {
    if (priceValueRef.current) {
      const priceValue = parseFloat(priceValueRef.current.value)

      setDataNewBook((prevState) => ({
        ...prevState,
        price: priceValue,
      }))
      console.log(priceValue)
    }
  }

  // ➡️Mostrar la notificación de confirmación
  const handlePostNewBookClick = () => {
    setShowNotification(true)
  }

  //➡️Manejo de la publicación del libro______________

  const handleConfirmPublish = async () => {
    setIsConfirming(true)
    try {
      //DEBUG:
      console.log('Data before sending:', dataNewBook)
      const result = await postNewBook(dataNewBook)
      if ('data' in result) {
        //DEBUG:
        console.log('Libro publicado:', result.data)
        //mostrar una notificación de éxito
      } else if ('error' in result) {
        console.error('Error al publicar el libro:', result.error)
        //mostrar una notificación de error
      }
    } catch (error) {
      console.error('Error al publicar el libro:', error)
      //mostrar notificación de error
    } finally {
      setIsConfirming(false)
      setShowNotification(false)
    }
  }

  // ➡️Cancelar la publicación del libro
  const handleCancelPublish = () => {
    setShowNotification(false)
  }

  return (
    <>
      {showNotification && (
        <Notification
          message="¿Estás seguro que quieres publicar este libro?"
          onConfirm={handleConfirmPublish}
          onCancel={handleCancelPublish}
        />
      )}
      <form className="mt-10 space-y-4">
        {/* Titulo__________________________________________ */}

        <div>
          <input
            name="title"
            type="text"
            autoComplete="title"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            placeholder="Titulo"
            onChange={handleInputChange}
          />
        </div>

        {/* description__________________________________________ */}

        <div>
          <textarea
            name="description"
            autoComplete="description"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            placeholder="Descripcion"
            onChange={handleInputChange}
          />
        </div>

        {/* Autor______________________________________________ */}

        <div className="flex items-center justify-between gap-4">
          <input
            name="author"
            type="text"
            autoComplete="author"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            placeholder="Autor"
            onChange={handleInputChange}
          />
        </div>

        {/* Precio_______________________________________________*/}

        <div className="flex items-center justify-between gap-4">
          <input
            name="price"
            type="number"
            placeholder="Precio"
            ref={priceValueRef}
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            onChange={handlePriceChange}
          />
        </div>

        {/* -Imagen__________________________________________ */}

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="image">Imagen de Tapa</label>
          <input
            name="image"
            type="text"
            placeholder="url imagen de tapa"
            required
            className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
            onChange={handleInputChange}
          />
        </div>

        {/* condition______________________________________ */}

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

        {/* Categoria_________________________________________ */}

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

        {/* Status_______________________________________________ */}

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

        {/* botón de Publicacion de nuevo libro_________________________ */}

        <div className="!mt-10">
          <button
            type="button"
            className="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-900 hover:bg-gray-700 focus:outline-none"
            onClick={handlePostNewBookClick}
          >
            {isLoading || isConfirming ? <Spinner /> : 'Publicar'}
          </button>
        </div>
      </form>
    </>
  )
}

export default PublicationForm
