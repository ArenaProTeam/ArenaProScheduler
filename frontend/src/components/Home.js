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
            <p>
              Traga seus amigos e bora pro PLAY! Para aulas de beach tennis e
              beach volley, entre em contato pelo nosso WhatsApp: (11)
              92114-8000
            </p>
            <button
              className="reserve-button"
              onClick={() => (window.location.href = '/reserva-online')}
            >
              RESERVA ONLINE
            </button>
          </div>
          <div className="hero-image">
            <img src="/public/hero-image.jpg" alt="Beach tennis" />
          </div>
        </div>

        <div className="cards">
          {[
            {
              title: 'QUEM SOMOS',
              content:
                'ARENA nasceu com o propósito de proporcionar momentos de alegria e confraternização...',
              imgSrc: '/public/jogador-01.png',
              link: 'quem-somos'
            },
            {
              title: 'ESTRUTURA',
              content:
                'A ARENA PRO possui uma área de mais de 2.000m² de estrutura...',
              imgSrc: '/estrutura.jpg',
              link: 'estrutura'
            },
            {
              title: 'NOSSO INSTAGRAM',
              content:
                'Visite nosso instagram e mantenha-se informado sobre as novidades...',
              imgSrc: '/instagram.jpg',
              link: 'https://www.instagram.com'
            },
            {
              title: 'CONTATO',
              content: 'Ficou com alguma dúvida? Entre em contato conosco!',
              imgSrc: '/contato.jpg',
              link: 'contato'
            }
          ].map((card, index) => (
            <div className="card" key={index}>
              <h2>{card.title}</h2>
              <div className="card-content">
                <div className="card-text">
                  <p>{card.content}</p>
                </div>
                <div className="card-image">
                  <img src={card.imgSrc} alt={card.title} />
                </div>
              </div>
              <br />
              <a href={card.link}>Ver Página →</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
)

export default Home
