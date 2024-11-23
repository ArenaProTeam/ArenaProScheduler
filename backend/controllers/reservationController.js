const Reservation = require('../models/Reservation');

// Criar uma reserva
const createReservation = async (req, res) => {
  const { userId, arena, date } = req.body;

  try {
    const reservation = new Reservation({ userId, arena, date });
    await reservation.save();
    res.status(201).json({ message: 'Reserva criada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar reserva.' });
  }
};

// Obter reservas de um usuário
const getReservations = async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await Reservation.find({ userId });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao obter reservas.' });
  }
};

module.exports = { createReservation, getReservations };
