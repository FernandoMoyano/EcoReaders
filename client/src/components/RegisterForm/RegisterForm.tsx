//REGISTERFORM
import { IRegisterFormProps } from './IRegisterFormProps'
import Spinner from '../Spinner/Spinner'

const RegisterForm: React.FC<IRegisterFormProps> = ({ handleRegister, isLoading, handleInputChange, dataRegister }) => {
  return (
    <div className="bg-gray-50 font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">Register</h2>
          <form className="mt-10 space-y-4">
            {/* Username_____________________________ */}
            <div>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
                placeholder="username"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* Email___________________________________ */}
            <div>
              <input
                name="email"
                type="email"
                autoComplete="current-email"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
                placeholder="Email"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* Password_____________________________ */}
            <div className="flex items-center justify-between gap-4">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-violet-500"
                placeholder="Password"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="!mt-10">
              <button
                type="button"
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-violet-600 hover:bg-violet-500 focus:outline-none"
                onClick={() => handleRegister(dataRegister)}
              >
                {isLoading ? <Spinner /> : 'Registrarse'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
