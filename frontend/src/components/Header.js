import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logoImg from '../assets/logo-arenapro.png'

const Header = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      <nav>
        <div className="nav-content">
          <div className="logo">
            <Link to="/home">
              <img src={logoImg} alt="Logo" />
            </Link>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/quem-somos">Quem Somos</Link>
            </li>
            <li>
              <Link to="/estrutura">Estrutura</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
            <li>
              <Link to="/reservas">Reservas</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={onLogout}>Logout</button>
              ) : (
                <Link to="/login">Entrar / Cadastre-se</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
