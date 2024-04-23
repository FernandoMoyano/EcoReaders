//EditForm.tsx
import React, { useRef, useState } from 'react'
import { BookCategory, BookCondition, BookStatus, IBook, NewBook } from '../../interfaces/IBook'
import { useUpdateBookMutation } from '../../app/api/api'
import Spinner from '../Spinner/Spinner'

const EditForm: React.FC<{ initialBookData: IBook }> = ({ initialBookData }) => {
  const priceValueRef = useRef<HTMLInputElement>(null)

  //Estados
  const [updateBook, { isLoading }] = useUpdateBookMutation()
  const [editedBook, setEditedBook] = useState<NewBook>(initialBookData)

  //Manejo de los inputs_______________________
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    if (name === 'frontCover' || name === 'backCover') {
      setEditedBook((prevState) => ({
        ...prevState,
        images: {
          ...prevState.images,
          [name]: value,
        },
      }))
    } else {
      setEditedBook((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  //Manejo de los select___________________________
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    setEditedBook((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  //Manejo del input de precio__________________________
  const handlePriceChange = () => {
    if (priceValueRef.current) {
      const priceValue = parseFloat(priceValueRef.current.value)

      setEditedBook((prevState) => ({
        ...prevState,
        price: priceValue,
      }))
      console.log(priceValue)
    }
  }

  //Manejo de la publicación del libro Editado______________
  const handlePostEditedBook = async () => {
    try {
      await updateBook({ bookId: initialBookData.id, updatedBook: editedBook })
      // DEBUG:
      console.log(editedBook)
    } catch (error) {
      //mostrar notificación de error
      console.error('Error al actualizar el libro:', error)
    }
  }

  return (
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

      {/* -Imagen Frontal____________________________________ */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="frontCover">Imagen de Tapa</label>
        <input
          name="frontCover"
          type="text"
          placeholder="url imagen de tapa"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          onChange={handleInputChange}
        />
      </div>

      {/* -Imagenes Contratapa_____________________________ */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="backCover">Imagen de contratapa</label>
        <input
          name="backCover"
          type="text"
          placeholder="url imagen de contratapa"
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

      {/* botón de envio__________________________________ */}
      <div className="!mt-10">
        <button
          type="button"
          className="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-900 hover:bg-gray-700 focus:outline-none"
          onClick={handlePostEditedBook}
        >
          {isLoading ? <Spinner /> : 'Publicar'}
        </button>
      </div>
    </form>
  )
}

export default EditForm
