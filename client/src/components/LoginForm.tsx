import { useDispatch } from 'react-redux'
import { loginSuccess } from '../features/auth/authSlice'
import { useState } from 'react'
import { useLoginMutation } from '../app/api/api'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from './spinner'

interface Credentials {
  username: string
  password: string
}

const LoginComponent = () => {
  //Estado Inicial
  const [credentials, setCredetentials] = useState({
    username: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  //Manejo de los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredetentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  //Manejo de Login
  const handleLogin = async (credentials: Credentials) => {
    try {
      const result = await login(credentials).unwrap()
      dispatch(loginSuccess(result))
      navigate('/')
      // Realizar acciones después del inicio de sesión
      console.log('Sesión activa:', result)
    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesión:', error)
    }
  }

  return (
    <div className="bg-gray-50 font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-2xl font-extrabold">Bienvenido a EcoReaders</h2>
          <form className="mt-10 space-y-4">
            <div>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
                placeholder="usernsme"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
                placeholder="Password"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-emerald-600 focus:ring-emerald-700 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a href="jajvascript:void(0);" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Ovido su contraseña?
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                onClick={() => handleLogin(credentials)}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Iniciar Sesion'}
              </button>
              <Link to={'/register'} className="text-sm mt-3">
                Crear Cuenta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
