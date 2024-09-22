// src/components/Reserve.js
import React, { useState } from 'react';
import axios from 'axios'; // Importar axios
import './Reserve.css';
import './ReservationModal.css'; // Importar estilos do modal

const ReservationModal = ({ isOpen, onClose, onSubmit, quadra }) => {
  const [nome, setNome] = useState('');
  const [qtdePessoas, setQtdePessoas] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, qtdePessoas, telefone, quadra }); // Inclui a quadra nos dados da reserva
    onClose(); // Fecha o modal após o envio
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Reservar</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
          <label>
            Qtde de Pessoas:
            <input
              type="number"
              value={qtdePessoas}
              onChange={(e) => setQtdePessoas(e.target.value)}
              required
            />
          </label>
          <label>
            Telefone:
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </label>
          <button type="submit">Confirmar Reserva</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

const Reserve = () => {
  const [selectedDate, setSelectedDate] = useState('26/08'); // Data padrão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuadra, setSelectedQuadra] = useState(''); // Para armazenar a quadra selecionada
  const reservasData = {
    '25/08': [
      { data: '25/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 01' },
      { data: '25/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 02' },
      { data: '25/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 03' },
      { data: '25/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 04' },
      { data: '25/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 05' }
    ],
    '26/08': [
      { data: '26/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 01' },
      { data: '26/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 02' },
      { data: '26/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 03' },
      { data: '26/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 04' },
      { data: '26/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 05' }
    ],
    '27/08': [
      { data: '27/08 - 07:00 às 08:00', valor: 'R$ 200,00', piso: 'Areia', coberta: 'Não', quadra: 'Quadra 01' }
    ]
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleReserveClick = (quadra) => {
    setSelectedQuadra(quadra); // Armazena a quadra selecionada
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    const reservaData = { ...data, quadra: selectedQuadra };

    try {
      const response = await axios.post('http://localhost:3000/reservas', reservaData); // Altere a URL para seu endpoint
      console.log('Reserva salva com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao salvar reserva:', error);
    }

    setIsModalOpen(false); // Fecha o modal após o envio
  };

  return (
    <div className="reserve-container">
      <h1>Reserve</h1>
      <h2>Quadra</h2>
      <div className="dates">
        {['25/08', '26/08', '27/08', '28/08', '29/08', '30/08', '31/08'].map((date, index) => (
          <button
            key={index}
            className={`date-button ${selectedDate === date ? 'active' : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {date}{' '}
            {index === 0 ? '(Domingo)' : index === 1 ? '(Segunda)' : index === 2 ? '(Terça)' : index === 3 ? '(Quarta)' : index === 4 ? '(Quinta)' : index === 5 ? '(Sexta)' : '(Sábado)'}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Valor</th>
            <th>Piso</th>
            <th>Cobertura</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {(reservasData[selectedDate] || []).map((reserva, index) => (
            <tr key={index}>
              <td>
                {reserva.data} <br /> {reserva.quadra}
              </td>
              <td>{reserva.valor}</td>
              <td>{reserva.piso}</td>
              <td>{reserva.coberta}</td>
              <td>
                <button
                  className="reserve-button"
                  onClick={() => handleReserveClick(reserva.quadra)} // Passa a quadra como argumento
                >
                  RESERVAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        quadra={selectedQuadra} // Passa a quadra selecionada para o modal
      />
    </div>
  );
};

export default Reserve;