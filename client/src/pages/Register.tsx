import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { DataRegisterI } from '../interfaces/IDataRegister'
import { registerSuccess } from '../features/auth/authSlice'
import { useRegisterMutation } from '../app/api/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNotication } from '../features/notifications/notificationsSlice'

const Register = () => {
  //Estados
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const [dataRegister, setDataRegister] = useState<DataRegisterI>({
    username: '',
    email: '',
    password: '',
  })

  //Manejo del input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataRegister((prevDataRegister) => ({
      ...prevDataRegister,
      [name]: value,
    }))
  }

  //Manejo del registro
  const handleRegister = async (dataRegister: DataRegisterI) => {
    try {
      const result = await register(dataRegister).unwrap()
      dispatch(registerSuccess(result.dataRegister))
      dispatch(createNotication('Te has registrado con éxito'))
      navigate('/login'), 3000
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <RegisterForm
      handleRegister={handleRegister}
      isLoading={isLoading}
      handleInputChange={handleInputChange}
      dataRegister={dataRegister}
    />
  )
}

export default Register
