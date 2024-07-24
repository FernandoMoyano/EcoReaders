//PAGES - LOGIN

import LoginForm from '../components/LoginForm/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useLoginMutation } from '../app/api/api'
import { ICredentials } from '../interfaces/ICredentials'

const Login = () => {
  //➡️Estado Inicial
  const [credentials, setCredetentials] = useState<ICredentials>({
    username: '',
    password: '',
  })

  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  //➡️Manejador de los valores de los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredetentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  //➡️Manejador de Login
  const handleLogin = async (credentials: ICredentials) => {
    try {
      const result = await login(credentials).unwrap()
      navigate('/books')
      // Realizar acciones después del inicio de sesión
      console.log('Sesión activa:', result)
    } catch (error) {
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
