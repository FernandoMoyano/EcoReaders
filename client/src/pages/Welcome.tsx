import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      <h1 className="text-xl">Welcome</h1>
      <button onClick={handleGoToLogin}>Iniciar sesion para continuar</button>
    </div>
  )
}

export default Welcome
