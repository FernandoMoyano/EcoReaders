import React from 'react'

interface NotificationProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}
const Notification: React.FC<NotificationProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-96 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <div className="px-4 py-3">
          <p className="text-lg font-bold text-black truncate block capitalize">{message}</p>
          <div className="flex items-center justify-evenly mt-4">
            <button
              onClick={onConfirm}
              className="text-center  py-2 px-6 bg-violet-500 p-2 rounded-md text-white hover:bg-violet-600 focus:outline-none "
            >
              Confirmar
            </button>
            <button
              onClick={onCancel}
              className="text-center  py-2 px-6 bg-gray-500 p-2 rounded-md text-white hover:bg-gray-600 focus:outline-none "
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
