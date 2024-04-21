import { DataRegisterI } from './IDataRegister'

export interface RegisterFormProps {
  handleRegister: (dataRegister: DataRegisterI) => void
  isLoading: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  dataRegister: DataRegisterI
}
