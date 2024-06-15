//PAGES - MYPUBLISHED

import NavBar from '../components/NavBar/NavBar'
import { useDeleteBookMutation, useGetMyPublishedBooksQuery } from '../app/api/api'
import { useParams } from 'react-router-dom'
import { formatearNumero } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { deletePublishedBook } from '../features/books/booksSlie'
import Spinner from '../components/Spinner/Spinner'
import { useState } from 'react'
import Notification from '../components/Notification/Notification'
import { IBook } from '../interfaces/IBook'
import ModalEditedBook from '../components/ModalEditBook/ModalEditBook'

const MyPublished = () => {
  // Estados que controlan la visibilidad de la notificación________

  const [bookIdToDelete, setBookIdToDelete] = useState('')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  //Estados que controlan el formulario de Edición________

  const [bookToEdit, setBookToEdit] = useState<IBook | null>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  //Uso de los hooks provistos por la api_________

  const { userId } = useParams()
  const { data, error, isLoading } = useGetMyPublishedBooksQuery(userId ?? '')
  const [deleteBook, { isLoading: isLoadingBook }] = useDeleteBookMutation()
  const dispatch = useDispatch()

  //DEBUG: ↴
  console.log(data)

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )

  if (error) {
    return <div>Error al cargar los detalles</div>
  }

  //Manejo del click al icono de "eliminar"_________

  const handleDelete = async (bookId: string) => {
    // Almacena el ID del libro a eliminar
    setBookIdToDelete(bookId)
    // Muestra la notificación de eliminación
    setShowDeleteConfirmation(true)
  }

  //Manejo de la confirmación de eliminación_________

  const handleConfirmDelete = async () => {
    try {
      await deleteBook(bookIdToDelete).unwrap()
      dispatch(deletePublishedBook(bookIdToDelete))
      setShowDeleteConfirmation(false)
      alert('Libro eliminado correctamente')
    } catch (error) {
      alert('Error al eliminar el libro')
    }
  }

  // Manejo del rechazo de eliminación__________

  const handleCancelDelete = () => {
    // Oculta la notificación de eliminación
    setShowDeleteConfirmation(false)
  }

  //Manejo del cierre del modal

  const closeModal = () => {
    setIsOpenModal(false)
  }

  //Manejo del click a la publicación del libro editado_____

  const handleEdit = (book: IBook) => {
    //DEBUG:
    console.log(book)
    setBookToEdit(book)
    //DEBUG:
    console.log('datos del libro a editar', bookToEdit)
    setIsOpenModal(true)
  }

  return (
    <>
      <NavBar />
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {data?.map((book) => (
          <div
            key={book.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">{book.author}</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
              <div className="flex items-center justify-evenly">
                <p className="text-lg font-semibold text-black cursor-auto my-3">${formatearNumero(book.price)}</p>
                {/* Icono de eliminacion */}
                <FontAwesomeIcon
                  onClick={() => handleDelete(book.id)}
                  icon={faTrashCan}
                  style={{ cursor: isLoadingBook ? 'not-allowed' : 'pointer' }}
                  opacity={isLoadingBook ? 0.5 : 1}
                />
                {/* Icono de edición */}
                <FontAwesomeIcon
                  onClick={() => handleEdit(book)}
                  icon={faEdit}
                  style={{ cursor: isLoadingBook ? 'not-allowed' : 'pointer' }}
                  opacity={isLoadingBook ? 0.5 : 1}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {showDeleteConfirmation && (
        <Notification
          message="¿Desea eliminar este libro?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isOpenModal && bookToEdit && (
        <ModalEditedBook initialBookData={bookToEdit} closeModal={closeModal} isOpen={isOpenModal} />
      )}
    </>
  )
}
export default MyPublished
