import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Usando Routes em vez de Switch
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Structure from './pages/Structure'
import Contact from './pages/Contact'
import Reserve from './pages/Reserve'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router basename="/ArenaProScheduler">
      {' '}
      {/* Adicionando o basename aqui */}
      <Header />
      <div className="content-container">
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/estrutura" element={<Structure />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/reserva-online" element={<Reserve />} />
            <Route path="/" element={<Home />} /> {/* Rota padrão */}
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  )
}

export default App
