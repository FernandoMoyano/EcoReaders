import { useDispatch } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginSuccess } from '../features/auth/authSlice'
import { useLoginMutation } from '../app/api/api'
import { Credentials } from '../interfaces/CredentialsI'

const Login = () => {
  //Estado Inicial
  const [credentials, setCredetentials] = useState<Credentials>({
    username: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  //Manejador de los valores de los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredetentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  //Manejador de Login
  const handleLogin = async (credentials: Credentials) => {
    try {
      const result = await login(credentials).unwrap()
      dispatch(loginSuccess(result))
      navigate('/books')
      // Realizar acciones después del inicio de sesión
      console.log('Sesión activa:', result)
    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesión:', error)
    }
  }
  return (
    <LoginForm
      handleLogin={handleLogin}
      handleInputChange={handleInputChange}
      isLoading={isLoading}
      credentials={credentials}
    />
  )
}

export default Login
