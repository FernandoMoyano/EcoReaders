import { Credentials } from './CredentialsI'

export interface LoginComponentProps {
  handleLogin: (credentials: Credentials) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  credentials: Credentials
  isLoading: boolean
}
