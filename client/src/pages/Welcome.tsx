import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
      <header className="flex justify justify-around bg-emerald-500 py-4 ">
        <div>
          <h1 className="text-xl font-bold text-white">EcoReaders</h1>
        </div>
        <nav className="flex gap-3 text-white">
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>SignUp</Link>
        </nav>
      </header>
      <div className=" flex justify-evenly items-center h-screen bg-gray-300">
        <div className="font-medium">La plataforma para publicar tus libros usados</div>
        <div className="w-1/3">
          <img className="bg-auto" src="https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_1280.jpg"></img>
        </div>
      </div>
      <div>j</div>
    </div>
  )
}

export default Welcome
