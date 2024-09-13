// src/components/NavBar.js
import React from 'react'
import './NavBar.css'

const NavBar = () => {
  return (
    <header>
      <nav>
        <div className="nav-content">
          <div className="logo">
            <img src="%PUBLIC_URL%/logo.png" alt="Logo" />
          </div>
          <ul className="menu">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#quem-somos">Quem Somos</a>
            </li>
            <li>
              <a href="#estrutura">Estrutura</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
            <li>
              <a href="#reserva-online">Reserva Online</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
