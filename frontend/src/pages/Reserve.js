// src/components/Reserve.js
import React, { useState } from 'react'
import './Reserve.css'
import './ReservationModal.css' // Importar estilos do modal

const ReservationModal = ({ isOpen, onClose, onSubmit, quadra }) => {
  const [nome, setNome] = useState('')
  const [qtdePessoas, setQtdePessoas] = useState('')
  const [telefone, setTelefone] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const reservaData = { nome, qtdePessoas, telefone, quadra }

    try {
      const response = await fetch(
        'http://localhost:5000/api/arenas/reservas',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservaData)
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao criar reserva: ' + response.statusText)
      }

      const data = await response.json()
      console.log(data) // Log da resposta da API
      onSubmit(reservaData) // Chama a função onSubmit passada como prop
      onClose() // Fecha o modal após o envio
    } catch (error) {
      console.error('Erro ao criar reserva:', error)
    }
  }

  if (!isOpen) return null

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
              onChange={e => setNome(e.target.value)}
              required
            />
          </label>
          <label>
            Qtde de Pessoas:
            <input
              type="number"
              value={qtdePessoas}
              onChange={e => setQtdePessoas(e.target.value)}
              required
            />
          </label>
          <label>
            Telefone:
            <input
              type="tel"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
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
  )
}

const Reserve = () => {
  const [selectedDate, setSelectedDate] = useState('26/08') // Data padrão
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQuadra, setSelectedQuadra] = useState('') // Para armazenar a quadra selecionada
  const reservasData = {
    '25/08': [
      {
        data: '25/08 - 07:00 às 08:00',
        valor: 'R$ 200,00',
        piso: 'Areia',
        coberta: 'Não',
        quadra: 'Quadra 01'
      }
      // ... outras reservas
    ],
    '26/08': [
      {
        data: '26/08 - 07:00 às 08:00',
        valor: 'R$ 200,00',
        piso: 'Areia',
        coberta: 'Não',
        quadra: 'Quadra 01'
      }
      // ... outras reservas
    ]
    // ... mais datas
  }

  const handleDateClick = date => {
    setSelectedDate(date)
  }

  const handleReserveClick = quadra => {
    setSelectedQuadra(quadra) // Armazena a quadra selecionada
    setIsModalOpen(true)
  }

  const handleModalSubmit = data => {
    // Aqui você pode lidar com o que fazer após a reserva ser feita
    console.log('Reserva feita:', data)
    setIsModalOpen(false) // Fecha o modal após o envio
  }

  return (
    <div className="reserve-container">
      <h1>Reserve</h1>
      <h2>Quadra</h2>
      <div className="dates">
        {['25/08', '26/08', '27/08', '28/08', '29/08', '30/08', '31/08'].map(
          (date, index) => (
            <button
              key={index}
              className={`date-button ${selectedDate === date ? 'active' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {date}
            </button>
          )
        )}
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
                  onClick={() => handleReserveClick(reserva.quadra)}
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
        quadra={selectedQuadra}
      />
    </div>
  )
}

export default Reserve
