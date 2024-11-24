import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

// Criar uma reserva
export const createReservation = async (token, userId, arena, date) => {
  const response = await axios.post(
    `${API_BASE_URL}/reservations`,
    { userId, arena, date },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Cancelar uma reserva
export const cancelReservation = async (token, reservationId) => {
  const response = await axios.delete(`${API_BASE_URL}/reservations/${reservationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Obter reservas do usuário
export const getUserReservations = async (token, userId) => {
  const response = await axios.get(`${API_BASE_URL}/reservations/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};