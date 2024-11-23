import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Structure from './pages/Structure'
import Contact from './pages/Contact'
import Reserve from './pages/Reserve'
import Login from './components/Login'
import Footer from './components/Footer'

const AppContent = () => {
  const location = useLocation() // Obtendo a localização atual

  // Verifica se a rota atual é a de login
  const isLoginPage = location.pathname === '/login'

  return (
    <>
      {!isLoginPage && <Header />}{' '}
      {/* Renderiza o Header apenas se não for a página de login */}
      <div className="content-container">
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/estrutura" element={<Structure />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/reservas" element={<Reserve />} />
            <Route path="/login" element={<Login />} /> {/* Rota para Login */}
            <Route path="/" element={<Home />} /> {/* Rota padrão */}
          </Routes>
        </main>
      </div>
      {!isLoginPage && <Footer />}{' '}
      {/* Renderiza o Footer apenas se não for a página de login */}
    </>
  )
}

// Encapsulamento do AppContent em Router
const App = () => (
  <Router basename="/ArenaProScheduler">
    <AppContent />
  </Router>
)

export default App
