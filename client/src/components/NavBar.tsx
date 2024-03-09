import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { logoutSuccess } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

interface NavbarProps {
  logoSrc: string
}

const Navbar: React.FC<NavbarProps> = () => {
  //README: Estados locales
  const [isOpen, setIsOpen] = useState(false)
  const [userSessionModal, setUserSessionModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //README: Manejo del cierre de sesion
  const handleLogout = async () => {
    dispatch(logoutSuccess())
    navigate('/login')
  }

  //README: manejo del menuhamburguesa abrir/cerrar
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  //README: Manejo del modal abrir/cerrar
  const handleModalToggle = () => {
    setUserSessionModal(!userSessionModal)
  }

  //README: Array de Enlaces
  const links = [
    { id: 1, text: 'Enlace 1', href: '#' },
    { id: 2, text: 'Enlace 2', href: '#' },
    { id: 3, text: 'Enlace 3', href: '#' },
  ]

  return (
    <nav className="bg-emerald-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        README: Logo
        <div>
          <a href="#" className="text-white text-lg font-bold">
            EcoReaders
          </a>
        </div>
        README: Button hamburguesa
        <div className="lg:hidden">
          <button
            onClick={handleToggle}
            type="button"
            className="text-white focus:outline-none"
            aria-label="toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          README: Enlaces visibles en desktop
          {links.map((link) => (
            <a key={link.id} href={link.href} className="text-white">
              {link.text}
            </a>
          ))}
          README: Ícono de usuario
          <div
            onClick={handleModalToggle}
            className="bg-black rounded-full p-2 mr-2 h-9 w-9 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faUser} className="text-white" />
          </div>
          README: Modal del usuario
          <h6>
            <button onClick={handleLogout}>Cerrar Sesion</button>
          </h6>
        </div>
      </div>
      {/* README: comportamiento cuando el menu hamburguesa esta abierto */}
      {isOpen && (
        <div className="lg:hidden mt-4">
          {links.map((link) => (
            <a key={link.id} href={link.href} className="block text-white mb-2">
              {link.text}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
