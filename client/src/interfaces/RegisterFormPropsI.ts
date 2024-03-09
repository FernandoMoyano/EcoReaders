import { DataRegisterI } from './DataRegisterI'

export interface RegisterFormProps {
  handleRegister: (dataRegister: DataRegisterI) => void
  isLoading: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  dataRegister: DataRegisterI
}
