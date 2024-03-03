const RegisterForm = () => {
  return (
    <div className="bg-gray-50 font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">Register</h2>
          <form className="mt-10 space-y-4">
            <div>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
                placeholder="usernsme"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                autoComplete="current-email"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
                placeholder="Password"
              />
            </div>
            <div className="!mt-10">
              <button
                type="button"
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
