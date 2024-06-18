import { ICredentials } from '../../interfaces/ICredentials'

export interface ILoginFormProps {
  handleLogin: (credentials: ICredentials) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  credentials: ICredentials
  isLoading: boolean
}
