// src/components/Header.js
import React from 'react'
import { Link } from 'react-router-dom' // Importando o Link do react-router-dom
import './Header.css'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="nav-content">
          <div className="logo">
            <img src="%PUBLIC_URL%/logo.png" alt="Logo" />
          </div>
          <ul className="menu">
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
              <Link to="/reserva-online">Reserva Online</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
