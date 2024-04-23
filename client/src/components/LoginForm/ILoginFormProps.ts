import { Credentials } from '../../interfaces/ICredentials'

export interface ILoginFormProps {
  handleLogin: (credentials: Credentials) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  credentials: Credentials
  isLoading: boolean
}
