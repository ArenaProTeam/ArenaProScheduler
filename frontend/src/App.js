// src/App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Usando Routes em vez de Switch
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Structure from './components/Structure'
import Contact from './components/Contact'
import Reserve from './components/Reserve'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
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
