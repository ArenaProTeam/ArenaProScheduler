const Reservation = require('../models/Reservation');

// Criar uma reserva
const createReservation = async (req, res) => {
  const { userId, arena, date } = req.body;

  try {
    // Verificar se a reserva já existe para o mesmo local e data
    const existingReservation = await Reservation.findOne({ arena, date });
    if (existingReservation) {
      return res.status(400).json({ error: 'Horário já reservado.' });
    }

    // Criar nova reserva
    const reservation = new Reservation({ userId, arena, date, status: 'active' });
    await reservation.save();

    res.status(201).json({ message: 'Reserva criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar reserva:', error.message);
    res.status(500).json({ error: 'Erro ao criar reserva.', details: error.message });
  }
};

// Cancelar uma reserva
const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    // Procurar e deletar a reserva pelo ID
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }

    res.status(200).json({ message: 'Reserva cancelada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error.message);
    res.status(500).json({ error: 'Erro ao cancelar reserva.', details: error.message });
  }
};

// Obter todas as reservas ativas
const getActiveReservations = async (req, res) => {
  try {
    // Buscar apenas reservas ativas
    const reservations = await Reservation.find({ status: 'active' });
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Erro ao obter reservas ativas:', error.message);
    res.status(500).json({ error: 'Erro ao obter reservas.' });
  }
};

module.exports = {
  createReservation,
  cancelReservation,
  getActiveReservations,
};