import { useDispatch } from 'react-redux'
import { logoutSuccess } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logoutSuccess())
    navigate('/login')
  }

  return (
    <h1>
      <div>Dashboard</div>
      <button onClick={handleLogout}>Cerrar Sesion</button>
    </h1>
  )
}

export default Dashboard
