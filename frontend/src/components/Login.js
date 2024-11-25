import React, { useState } from 'react'
import './Login.css'

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login')

  const handleTabChange = tab => {
    setActiveTab(tab)
  }

  const handleLoginSubmit = event => {
    event.preventDefault()
    // Aqui você deve adicionar a lógica de autenticação
    // Se a autenticação for bem-sucedida, chame onLogin
    onLogin() // Chama a função para atualizar o estado de login
  }

  return (
    <section className="loginWrapper">
      <ul className="tabs">
        <li
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => handleTabChange('login')}
        >
          Login
        </li>
        <li
          className={activeTab === 'register' ? 'active' : ''}
          onClick={() => handleTabChange('register')}
        >
          Register
        </li>
      </ul>

      <ul className="tab__content">
        {activeTab === 'login' && (
          <li className="active">
            <div className="content__wrapper">
              <form onSubmit={handleLoginSubmit}>
                <input type="email" name="email" placeholder="email" required />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <input type="submit" value="Login" name="login" />
              </form>
            </div>
          </li>
        )}

        {activeTab === 'register' && (
          <li>
            <div className="content__wrapper">
              <form method="POST" action="">
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  required
                />
                <input type="email" name="email" placeholder="email" required />
                <input
                  type="password"
                  name="pass"
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  name="repass"
                  placeholder="Repeat-Password"
                  required
                />
                <input type="submit" value="Register" name="register" />
              </form>
            </div>
          </li>
        )}
      </ul>
    </section>
  )
}

export default Login
