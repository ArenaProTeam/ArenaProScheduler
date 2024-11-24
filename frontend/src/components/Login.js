import React, { useState } from "react";
import { loginUser, registerUser } from "../api/auth";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      onLogin(data.token); // Passa o token para o estado principal
    } catch (err) {
      setError("Erro ao fazer login.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
      await registerUser(email, password);
      setActiveTab("login");
    } catch (err) {
      setError("Erro ao registrar usuário.");
    }
  };

  return (
    <section className="loginWrapper">
      <ul className="tabs">
        <li className={activeTab === "login" ? "active" : ""} onClick={() => handleTabChange("login")}>
          Login
        </li>
        <li className={activeTab === "register" ? "active" : ""} onClick={() => handleTabChange("register")}>
          Register
        </li>
      </ul>

      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <button type="submit">Login</button>
        </form>
      )}

      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Senha"
            required
          />
          <button type="submit">Registrar</button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default Login;
