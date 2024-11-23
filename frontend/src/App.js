import React from 'react';
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
  const location = useLocation(); // Current location

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <Header />
      <div className="content-container">
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/estrutura" element={<Structure />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/reservas" element={<Reserve />} />
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/" element={<Home />} /> {/* Default route */}
          </Routes>
        </main>
      </div>
      {!isLoginPage && <Footer />}
      {/* Render Footer only if not on the login page */}
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