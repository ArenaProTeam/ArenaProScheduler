const Reservation = require('../models/reservation');

// Criar uma reserva
const createReservation = async (req, res) => {
  const { userId, arena, date } = req.body;

  try {
    const reservation = new Reservation({ userId, arena, date });
    await reservation.save();
    res.status(201).json({ message: 'Reserva criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(400).json({ error: 'Erro ao criar reserva.', details: error.message });
  }
};

// Obter todas as reservas de um usuário
const getReservations = async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await Reservation.find({ userId });
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Erro ao obter reservas:', error);
    res.status(400).json({ error: 'Erro ao obter reservas.', details: error.message });
  }
};

// Obter uma reserva específica por ID
const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error('Erro ao obter a reserva:', error);
    res.status(500).json({ error: 'Erro no servidor ao obter a reserva.', details: error.message });
  }
};

module.exports = { createReservation, getReservations, getReservationById };
