//MODALEDITEDBOOK

import EditForm from '../EditForm/EditForm'
import { IBook } from '../../interfaces/IBook'
import React from 'react'

interface IModalEditedBook {
  initialBookData: IBook
  closeModal: () => void
  isOpen: boolean
}

const ModalEditedBook: React.FC<IModalEditedBook> = ({ initialBookData, closeModal, isOpen }) => {
  const handleCloseModal = () => {
    closeModal()
  }

  return (
    <div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-black bg-opacity-55">
            <div className="relative w-auto max-w-lg mx-auto my-6">
              <div className="bg-white rounded-lg shadow-lg outline-none">
                <div className="flex items-start justify-between p-5 border-b border-gray-900 rounded-t">
                  <h3 className="text-lg font-semibold">Editar Libro</h3>
                  <button onClick={handleCloseModal}>X</button>
                </div>
                <div className="p-5" style={{ backgroundColor: 'white' }}>
                  <EditForm initialBookData={initialBookData} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ModalEditedBook
