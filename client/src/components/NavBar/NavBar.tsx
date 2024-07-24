//NAVBAR
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'

const NavBar = () => {
  //estados_________________________
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const userId = useSelector((state: RootState) => state.auth.userLoggedIn.userId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Manejo del click al menu de usuario__________________
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  //Manejo del click al Movil_________________
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false)
    }
  }

  //Manejo del click a Logout_______________
  const handleLogout = () => {
    dispatch(logoutSuccess())
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button_______________________ */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              {/*  Icono cuando el menú está cerrado.
              Menú abierto: "oculto", menú cerrado: "bloque" */}

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              {/*  Icono cuando el menú está abierto.
              Menú abierto: "bloque", menú cerrado: "oculto" */}

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to={'/books'} className="font-medium">
                <h1 className="text-blach bold text-white">EcoReaders</h1>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block items-center">
              <div className="flex space-x-4">
                <Link
                  to="/books"
                  className="text-white hover:bg-gray-700  rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Books
                </Link>
                <Link
                  to={`/books/user/${userId}/my-books`}
                  className="text-white hover:bg-gray-700  rounded-md px-3 py-2 text-sm font-medium"
                >
                  Mis Publicados
                </Link>
                <Link
                  to="/favorites"
                  className="text-white hover:bg-gray-700  rounded-md px-3 py-2 text-sm font-medium"
                >
                  Favoritos
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/*  Menú desplegable___________________________  */}
            <div className="relative ml-3">
              <div>
                <button
                  onClick={toggleUserMenu}
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes-thumbnail.png"
                    alt=""
                  />
                </button>
              </div>
              {/*   Menú desplegable del usuario mostrar/ocultar basado en el estado del menú.*/}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Mi Perfil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                  >
                    Configuración
                  </a>
                  <a
                    onClick={handleLogout}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil, mostrar/ocultar basado en el estado del menú*/}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
