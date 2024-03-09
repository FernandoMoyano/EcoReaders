import { Credentials } from './CredentialsI'

export interface LoginFormProps {
  handleLogin: (credentials: Credentials) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  credentials: Credentials
  isLoading: boolean
}
