const Reservation = require('../models/Reservation');

// Criar uma reserva
const createReservation = async (req, res) => {
  const { userId, arena, date } = req.body;

  try {
    const existingReservation = await Reservation.findOne({ arena, date });
    if (existingReservation) {
      return res.status(400).json({ error: 'Horário já reservado.' });
    }

    const reservation = new Reservation({ userId, arena, date });
    await reservation.save();

    res.status(201).json({ message: 'Reserva criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar reserva.' });
  }
};

// Cancelar uma reserva
const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }

    res.status(200).json({ message: 'Reserva cancelada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cancelar reserva.' });
  }
};

module.exports = { createReservation, cancelReservation };