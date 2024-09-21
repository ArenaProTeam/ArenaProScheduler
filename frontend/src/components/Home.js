// src/components/Home.js
import React from 'react'
import './Home.css'

const Home = () => (
  <div id="root">
    <main>
      <section id="home">
        <div className="hero">
          <div className="hero-text">
            <h1>VIVA ESSA EXPERIÊNCIA</h1>
            <br></br>
            <br></br>
            <p>
              Traga seus amigos e bora pro PLAY! Para aulas de beach tennis e
              beach volley, entre em contato pelo nosso WhatsApp: (11)
              92114-8000
            </p>
            <br></br>

            <button className="reserve-button">RESERVA ONLINE</button>
          </div>
          <div className="hero-image">
            <img src="%PUBLIC_URL%/hero-image.jpg" alt="Beach tennis" />
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <h2>QUEM SOMOS</h2>
            <div className="card-content">
              <div className="card-text">
                <p>
                  ARENA nasceu com o propósito de proporcionar momentos de
                  alegria e confraternização, com toda estrutura que você merece
                  para praticar o seu esporte de areia preferido entre amigos e
                  família! Quer conhecer um pouco sobre nossa história?
                </p>
              </div>
              <div className="card-image">
                <img src="%PUBLIC_URL%/quem-somos.jpg" alt="Quem Somos" />
              </div>
            </div>
            <a href="#quem-somos">Ver Página →</a>
          </div>

          <div className="card">
            <h2>ESTRUTURA</h2>
            <div className="card-content">
              <div className="card-text">
                <p>
                  A ARENA PRO possui uma área de mais de 2.000m² de estrutura,
                  composta por 6 quadras, vestiários masculino e feminino,
                  bar/restô adaptado para cadeirantes e estacionamento
                  privativo. Uma estrutura completa esperando por você!
                </p>
              </div>
              <div className="card-image">
                <img src="%PUBLIC_URL%/estrutura.jpg" alt="Estrutura" />
              </div>
            </div>
            <a href="#estrutura">Ver Página →</a>
          </div>

          <div className="card">
            <h2>NOSSO INSTAGRAM</h2>
            <div className="card-content">
              <div className="card-text">
                <p>
                  Visite nosso instagram e mantenha-se informado sobre as
                  novidades e resultados das competições. Faça parte dessa
                  família!
                </p>
              </div>
              <div className="card-image">
                <img src="%PUBLIC_URL%/instagram.jpg" alt="Instagram" />
              </div>
            </div>
            <a href="#instagram">Ver Página →</a>
          </div>

          <div className="card">
            <h2>CONTATO</h2>
            <div className="card-content">
              <div className="card-text">
                <p>
                  Ficou com alguma dúvida? Entre em contato conosco!
                  Localização: R. da Consolação, 930, Consolação, São Paulo - SP
                  01302-907
                </p>
              </div>
              <div className="card-image">
                <img src="%PUBLIC_URL%/contato.jpg" alt="Contato" />
              </div>
            </div>
            <a href="#contato">Ver Página →</a>
          </div>
        </div>
      </section>
    </main>
  </div>
)

export default Home
