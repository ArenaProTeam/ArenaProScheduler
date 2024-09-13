import React from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Footer from './components/Footer' // Importar o Footer

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Home />
        {/* Outros componentes ou conteúdo da página */}
      </main>
      <Footer /> {/* Adicionar o Footer aqui apenas uma vez */}
    </div>
  )
}

export default App
