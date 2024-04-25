//EditForm.tsx
import React, { useRef, useState } from 'react'
import { BookCategory, BookStatus, IBook, NewBook, BookCondition } from '../../interfaces/IBook'
import { useUpdateBookMutation } from '../../app/api/api'
import Spinner from '../Spinner/Spinner'
import TextInput from '../TextInput/TextInput'
import SelectInput from '../SelectInput/SelectInput'

const EditForm: React.FC<{ initialBookData: IBook }> = ({ initialBookData }) => {
  const priceValueRef = useRef<HTMLInputElement>(null)

  //Estados
  const [updateBook, { isLoading }] = useUpdateBookMutation()
  const [editedBook, setEditedBook] = useState<NewBook>(initialBookData)

  //Manejo de los inputs_______________________
  const handleInputChange = (name: string, value: string) => {
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
  const handleSelectChange = (name: string, value: string) => {
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
        <label htmlFor="title">Titulo</label>
        <TextInput
          name="title"
          type="text"
          placeholder="Titulo"
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          onChange={(value) => handleInputChange('title', value)}
        />
      </div>
      {/* description__________________________________________ */}
      <div>
        <label htmlFor="description">description</label>
        <TextInput
          name="description"
          type="text"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          placeholder="Descripcion"
          onChange={(value) => handleInputChange('description', value)}
        />
      </div>
      {/* Autor______________________________________________ */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="author">Author</label>
        <TextInput
          name="author"
          type="text"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          placeholder="Autor"
          onChange={(value) => handleInputChange('author', value)}
        />
      </div>
      {/* Precio_______________________________________________*/}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="price">Precio</label>
        <TextInput
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
        <TextInput
          name="frontCover"
          type="text"
          placeholder="url imagen de tapa"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          onChange={(value) => handleInputChange('frontcover', value)}
        />
      </div>
      {/* -Imagen Contratapa_____________________________ */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="backCover">Imagen de contratapa</label>
        <TextInput
          name="backCover"
          type="text"
          placeholder="url imagen de contratapa"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
          onChange={(value) => handleInputChange('backcover', value)}
        />
      </div>

      {/* condition______________________________________ */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="bookCondition">Condición del libro</label>
        <SelectInput
          name="consition"
          value={editedBook.bookCondition}
          options={Object.values(BookCondition)}
          onChange={(value) => handleSelectChange('condition', value)}
        />
      </div>

      {/* Categoria_________________________________________ */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="category">Categoria:</label>
        <SelectInput
          name="category"
          value={editedBook.category}
          options={Object.values(BookCategory)}
          onChange={(value) => handleSelectChange('category', value)}
        />
      </div>

      {/* Status_______________________________________________ */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="">Estado</label>
        <SelectInput
          name="status"
          value={editedBook.status}
          options={Object.values(BookStatus)}
          onChange={(value) => handleSelectChange('status', value)}
        />
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
