import { useState } from 'react'
import PublicationForm from './PublicationForm'

const ModalNewBook = () => {
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
        className="fixed bottom-10 right-10 bg-violet-500 text-white px-4 py-2 rounded-full shadow-md"
        onClick={openModal}
      >
        Publicar Libro +
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg outline-none">
              <div className="flex items-start justify-between p-5 border-b border-gray-300 rounded-t">
                <h3 className="text-lg font-semibold">Publicar Nuevo Libro</h3>
                <button onClick={closeModal}>X</button>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={closeModal}>
                  <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <PublicationForm onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalNewBook
