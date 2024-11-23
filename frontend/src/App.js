<<<<<<< Updated upstream
import React from 'react';
=======
import React, { useState } from 'react'
>>>>>>> Stashed changes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Structure from './pages/Structure';
import Contact from './pages/Contact';
import Reserve from './pages/Reserve';
import Login from './components/Login';
import Footer from './components/Footer';

const AppContent = () => {
<<<<<<< Updated upstream
  const location = useLocation(); // Current location

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <Header />
=======
  const location = useLocation() // Obtendo a localização atual
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado de login

  const handleLoginSuccess = () => {
    setIsLoggedIn(true) // Atualiza o estado para logado
  }

  const handleLogout = () => {
    setIsLoggedIn(false) // Redefine o estado de login
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
>>>>>>> Stashed changes
      <div className="content-container">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/estrutura" element={<Structure />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/reservas" element={<Reserve />} />
<<<<<<< Updated upstream
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/" element={<Home />} /> {/* Default route */}
          </Routes>
        </main>
      </div>
      {!isLoginPage && <Footer />}
      {/* Render Footer only if not on the login page */}
=======
            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
          </Routes>
        </main>
      </div>
      {!location.pathname.startsWith('/login') && <Footer />}
>>>>>>> Stashed changes
    </>
  );
};

const App = () => (
  <Router
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <AppContent />
  </Router>
);

export default App;