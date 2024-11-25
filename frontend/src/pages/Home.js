import React from 'react'
import './Home.css'
import raqueteImg from '../assets/raquete.png'
import jogador1Img from '../assets/jogador-01.png'
import jogador2Img from '../assets/jogador-02.png'
import jogador3Img from '../assets/jogador-03.png'
import jogador4Img from '../assets/jogador-04.png'

const Home = () => (
  <div id="root">
    <main>
      <section id="home">
        <div className="hero">
          <div className="hero-contents">
            <div className="hero-text">
              <h1>VIVA ESSA EXPERIÊNCIA</h1>
              <br />
              <p>Traga seus amigos e bora pro PLAY!</p>
              <p>Para aulas de beach tennis e beach volley,</p>
              <p>entre em contato pelo nosso WhatsApp:</p>
              <p>(11) 92114-8000</p>
              <br />
              {/* O botão agora está aqui */}
              <div className="hero-button">
                <button
                  className="reserve-button"
                  onClick={() => (window.location.href = '/reservas')}
                >
                  RESERVA ONLINE
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img src={raqueteImg} alt="Beach tennis" />
            </div>
          </div>
        </div>

        <div className="cards">
          {[
            {
              title: 'QUEM SOMOS',
              content:
                'ARENA nasceu com o propósito de proporcionar momentos de alegria e confraternização, com toda estrutura que você merece para praticar o seu esporte de areia preferido entre amigos e familiares! Quer conhecer um pouco sobre nossa história?',
              imgSrc: jogador1Img,
              link: 'quem-somos',
              color: '#F3F3F3', // Cor do card 1
              titleColor: '#333', // Cor do título
              contentColor: '#333', // Cor do conteúdo
              linkColor: '#333' // Cor do link
            },
            {
              title: 'ESTRUTURA',
              content:
                'A ARENA PRO possui uma área de mais de 2.000m² de estrutura, composta por 6 quadras, vestiários masculino e feminino, banheiro adaptado para cadeirantes e estacionamento privativo. Uma estrutura completa esperando por você!',
              imgSrc: jogador2Img,
              link: 'estrutura',
              color: '#B9FF66', // Cor do card 2
              titleColor: '#333', // Cor do título
              contentColor: '#333', // Cor do conteúdo
              linkColor: '#333' // Cor do link
            },
            {
              title: 'NOSSO INSTAGRAM',
              content:
                'Visite nosso instagram e mantenha-se informado sobre as novidades e resultado das competições. Faça parte dessa família!',
              imgSrc: jogador3Img,
              link: 'https://www.instagram.com',
              color: '#191A23', // Cor do card 3
              titleColor: '#B9FF66', // Cor do título
              contentColor: '#fff', // Cor do conteúdo
              linkColor: '#fff' // Cor do link
            },
            {
              title: 'CONTATO',
              content:
                'Ficou com alguma dúvida? Entre em contato conosco! Localização: R. da Consolação, 930 Consolação, São Paulo - SP, 01302-907',
              imgSrc: jogador4Img,
              link: 'contato',
              color: '#F3F3F3', // Cor do card 4
              titleColor: '#333', // Cor do título
              contentColor: '#333', // Cor do conteúdo
              linkColor: '#333' // Cor do link
            }
          ].map((card, index) => (
            <div
              className="card"
              key={index}
              style={{ backgroundColor: card.color }}
            >
              <h2 style={{ color: card.titleColor }}>{card.title}</h2>
              <div className="card-content">
                <div className="card-text">
                  <p style={{ color: card.contentColor }}>{card.content}</p>
                  <a
                    href={card.link}
                    style={{
                      color: card.linkColor,
                      marginTop: '20px',
                      display: 'inline-block'
                    }}
                  >
                    Ver Página →
                  </a>{' '}
                  {/* Link com cor específica */}
                </div>
                <div className="card-image">
                  <img src={card.imgSrc} alt={card.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
)

export default Home
