const Reservation = require('../models/Reservation');

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

module.exports = { createReservation };