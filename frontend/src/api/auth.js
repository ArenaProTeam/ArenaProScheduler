import axios from "axios";
import API_BASE_URL from "./apiConfig";

// Login de usuário
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data;
};

// Registro de usuário
export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password });
  return response.data;
};