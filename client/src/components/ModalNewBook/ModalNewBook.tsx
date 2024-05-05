//ModalNewBook
import { useState } from 'react'
import PublicationForm from '../PublicationForm/PublicationForm'

const ModalNewBook = () => {
  //estados_________________________
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <button
        className="fixed bottom-10 right-10 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-md"
        onClick={openModal}
      >
        Publicar Libro +
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-black bg-opacity-55">
            <div className=" relative w-auto max-w-lg mx-auto my-6">
              <div className=" bg-white rounded-lg shadow-lg outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-900 rounded-t">
                  <h3 className="text-lg font-semibold">Publicar Nuevo Libro</h3>
                  <button onClick={closeModal}>X</button>
                </div>
                <div className="p-5" style={{ backgroundColor: 'white' }}>
                  <PublicationForm />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ModalNewBook
