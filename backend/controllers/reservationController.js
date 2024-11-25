const Reservation = require('../models/Reservation');

// Criar uma reserva
const createReservation = async (req, res) => {
  const { nome, arena, date, time, quantidade, telefone } = req.body;

  if (!nome || !arena || !date || !time || !quantidade || !telefone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const existingReservation = await Reservation.findOne({ arena, date, time });
    if (existingReservation) {
      return res.status(400).json({ error: 'Horário já reservado.' });
    }

    const reservation = new Reservation({
      nome,
      arena,
      date,
      time,
      quantidade,
      telefone,
    });
    await reservation.save();

    res.status(201).json({ message: 'Reserva criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar reserva.', details: error.message });
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
    res.status(500).json({ error: 'Erro ao cancelar reserva.', details: error.message });
  }
};

// Obter reservas ativas
const getActiveReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter reservas.' });
  }
};

module.exports = { createReservation, cancelReservation, getActiveReservations };