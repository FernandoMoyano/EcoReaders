import { DataRegisterI } from '../../interfaces/IDataRegister'

export interface IRegisterFormProps {
  handleRegister: (dataRegister: DataRegisterI) => void
  isLoading: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  dataRegister: DataRegisterI
}
