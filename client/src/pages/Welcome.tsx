//WELCOME
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="">
      <header className="container m-auto flex justify-around lg:justify-between items-center py-4 ">
        <div>
          <h1 className="text-xl font-bold text-black">EcoReaders</h1>
        </div>
        <nav className="flex gap-3 text-white">
          <Link className="w-20 text-center bg-gray-900 p-2 rounded-md" to={'/login'}>
            Login
          </Link>
          <Link className=" p-2 rounded-md text-black" to={'/register'}>
            SignUp
          </Link>
        </nav>
      </header>

      <div className="h-screen container grid grid-cols-1 gap-3 lg:grid-cols-4 m-auto content-center">
        <div className="font-Poppins text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-normal lg:col-span-2  flex align-center justify-center self-center whitespace-pre-line">
          <p>
            La plataforma para <br /> intercambiar tus libros <span className="text-violet-500">usados.</span>
          </p>
        </div>
        <div className="col-span-2 flex align-center justify-center  ">
          <div className="w-2/3 mx-auto">
            <img className="w-full h-auto" src="../../public/Books.jpg" />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Welcome
