import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <h1>Quem Somos</h1>
      <p>
        Bem-vindo ao ARENA PRO! Somos uma equipe apaixonada por esportes de
        praia, dedicada a oferecer a melhor experiência em beach tennis e beach
        volley para atletas de todos os níveis. Nossa missão é ser referência em
        gerenciamento de arenas de esportes de areia, combinando infraestrutura
        de ponta com um serviço excepcional ao cliente.
      </p>
      <p>
        Queremos incentivar um estilo de vida saudável e ativo, promovendo a
        integração social e o respeito pelo meio ambiente. Visamos ser
        reconhecidos como líderes no segmento de esportes de praia, impactando
        positivamente a vida de nossos clientes através do esporte e da
        convivência ao ar livre.
      </p>
      <p>
        Valorizamos a excelência, a paixão pelo esporte, a comunidade e a
        sustentabilidade. Contamos com arenas modernas, quadras de areia bem
        mantidas, iluminação de alta qualidade, áreas de convivência
        confortáveis e serviços de apoio como vestiários, duchas e
        estacionamento.
      </p>
      <p>
        Nossa equipe é composta por profissionais experientes e dedicados,
        sempre prontos para oferecer o melhor atendimento. Venha nos conhecer e
        faça parte da nossa comunidade de esportistas, onde energia e alegria se
        encontram na areia!
      </p>

      <button
        className="reserve-button"
        onClick={() => (window.location.href = '/ArenaProScheduler/reservas')}
      >
        RESERVA ONLINE
      </button>
    </div>
  )
}

export default About
