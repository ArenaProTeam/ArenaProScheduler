import React from 'react'
import './Footer.css'

const Footer = () => (
  <footer>
    <div className="footer-content">
      <div>
        <h3>Menu</h3>
        <ul>
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
      <div>
        <h3>Nos Encontre</h3>
        <ul>
          <li>R. da Consolação, 930</li>
          <li>Consolação, São Paulo - SP 01302-907</li>
          <li>(11) 2114-8000</li>
          <li>contato.arenapro@gmail.com</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">© 2024 All Rights Reserved</div>
  </footer>
)

export default Footer
