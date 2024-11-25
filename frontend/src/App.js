import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Structure from './pages/Structure'
import Contact from './pages/Contact'
import Reserve from './pages/Reserve'
import Login from './components/Login'
import Footer from './components/Footer'

const AppContent = ({ isLoggedIn, onLogout, onLogin }) => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="content-container">
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/estrutura" element={<Structure />} />
            <Route path="/contato" element={<Contact />} />
            {/* Passando isLoggedIn para o componente Reserve */}
            <Route
              path="/reservas"
              element={<Reserve isLoggedIn={isLoggedIn} onLogout={onLogout} />}
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" />
                ) : (
                  <Login onLogin={onLogin} />
                )
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      {!isLoginPage && <Footer />}
    </>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <Router>
      <AppContent
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
    </Router>
  )
}

export default App