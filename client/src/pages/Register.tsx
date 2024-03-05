import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { DataRegisterI } from '../interfaces/DataRegisterI'

const Register = () => {
  const [userdata, setUserData] = useState<DataRegisterI>({
    username: '',
    email: '',
    password: '',
  })
  const handleRegister = (dataRegister: DataRegisterI) => {}
  return <RegisterForm />
}

export default Register
