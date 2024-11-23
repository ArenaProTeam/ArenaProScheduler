import React, { useState } from 'react'
import './ReservationModal.css' // Importar estilos do modal

const ReservationModal = ({ isOpen, onClose, onSubmit }) => {
  const [nome, setNome] = useState('')
  const [qtdePessoas, setQtdePessoas] = useState('')
  const [telefone, setTelefone] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ nome, qtdePessoas, telefone })
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

export default ReservationModal
