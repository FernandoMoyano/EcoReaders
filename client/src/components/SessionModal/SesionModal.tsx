//SessionModal.ts
import { logoutSuccess } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface SessionModalProps {
  onClose: () => void
}
const SessionModal: React.FC<SessionModalProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Manejo del click a logout
  const handleLogout = async () => {
    dispatch(logoutSuccess())
    navigate('/login')
    onClose()
  }

  return (
    <div className="fixed top-20 right-20 flex items-center justify-end flex-col bg-slate-200 p-5">
      <div>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800 place-items-end">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div>
        <p className="mt-2 block">Hola, Fernando</p>
        <button onClick={handleLogout} className="mt-4 p-2 bg-emerald-500 text-white rounded">
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

export default SessionModal
