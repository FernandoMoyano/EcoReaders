import { useDispatch } from 'react-redux'
import { logoutSuccess } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    dispatch(logoutSuccess())
    navigate('/login')
  }

  return (
    <div>
      <NavBar />
      <h1>
        <div>Dashboard</div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </h1>
    </div>
  )
}

export default Dashboard
