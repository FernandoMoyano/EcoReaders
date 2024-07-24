//REGISTER .TSX

import { useState } from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import { IDataRegister } from '../interfaces/IDataRegister'
import { registerSuccess } from '../features/auth/authSlice'
import { useRegisterMutation } from '../app/api/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNotication } from '../features/notifications/notificationsSlice'

const Register = () => {
  //➡️Estados______________________
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const [dataRegister, setDataRegister] = useState<IDataRegister>({
    username: '',
    email: '',
    password: '',
  })

  //➡️Manejo del input____________________
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataRegister((prevDataRegister) => ({
      ...prevDataRegister,
      [name]: value,
    }))
  }

  //➡️Manejo del registro____________________
  const handleRegister = async (dataRegister: IDataRegister) => {
    try {
      const result = await register(dataRegister).unwrap()
      //DEBUG:
      // Register.tsx - dentro de handleRegister
      console.log('Register Response:', result)

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
