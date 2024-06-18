import { IDataRegister } from '../../interfaces/IDataRegister'

export interface IRegisterFormProps {
  handleRegister: (dataRegister: IDataRegister) => void
  isLoading: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  dataRegister: IDataRegister
}
