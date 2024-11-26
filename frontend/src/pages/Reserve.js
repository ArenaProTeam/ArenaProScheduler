import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Reserve.css'
import API_BASE_URL from '../api/apiConfig'

const Reserve = ({ isLoggedIn, loginUser }) => {
  const navigate = useNavigate()

  const initialHorarios = [
    {
      time: '07:30 - 08:30',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '08:30 - 09:30',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '09:30 - 10:30',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '10:30 - 11:30',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '11:30 - 12:30',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    }
  ]

  const [horarios, setHorarios] = useState(initialHorarios)
  const [reservas, setReservas] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    telefone: ''
  })
  const [nextDates, setNextDates] = useState({})
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false)
  const [selectedReservaId, setSelectedReservaId] = useState(null)

  useEffect(() => {
    const getNextDate = dayOffset => {
      const today = new Date()
      const nextDate = new Date(today)
      nextDate.setDate(today.getDate() + ((dayOffset + 7) % 7))
      return `${nextDate.getDate()}/${nextDate.getMonth() + 1}`
    }

    const dates = {
      seg: getNextDate(1 - new Date().getDay()),
      ter: getNextDate(2 - new Date().getDay()),
      qua: getNextDate(3 - new Date().getDay()),
      qui: getNextDate(4 - new Date().getDay()),
      sex: getNextDate(5 - new Date().getDay()),
      sab: getNextDate(6 - new Date().getDay())
    }

    setNextDates(dates)
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/active`)
      const reservations = await response.json()
      const userReservations = reservations.filter(
        reservation => reservation.userId === loginUser
      )

      setReservas(userReservations)

      setHorarios(prevHorarios =>
        prevHorarios.map(horario => {
          const updatedHorario = { ...horario }
          Object.keys(nextDates).forEach(day => {
            const dateForDay = nextDates[day]
            updatedHorario[day] = true // Torna tudo disponível inicialmente
            userReservations.forEach(reservation => {
              if (
                reservation.time === horario.time &&
                reservation.date === dateForDay
              ) {
                updatedHorario[day] = false // Marca como indisponível
              }
            })
          })
          return updatedHorario
        })
      )
    } catch (error) {
      console.error('Erro ao buscar reservas ativas:', error.message)
    }
  }

  useEffect(() => {
    if (Object.keys(nextDates).length > 0) {
      fetchReservations()
    }
  }, [nextDates, loginUser])

  const submitForm = async () => {
    const { nome, quantidade, telefone } = formData

    // Verifica se os campos estão preenchidos
    if (!nome || !quantidade || !telefone) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    // Verifica se a quantidade está entre 1 e 12
    const quantidadeNum = parseInt(quantidade, 10);
    if (isNaN(quantidadeNum) || quantidadeNum < 1 || quantidadeNum > 12) {
      alert('A quantidade de pessoas deve ser entre 1 e 12!')
      return
    }

// Validação e formatação do telefone antes do envio
const cleanedTelefone = formData.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos

if (cleanedTelefone.length < 8 || cleanedTelefone.length > 11) {
    alert('O telefone deve conter entre 8 e 11 dígitos!');
    return;
}

// Formatação final
let formattedTelefone = cleanedTelefone;
if (cleanedTelefone.length === 11) {
    formattedTelefone = `(${cleanedTelefone.substring(0, 2)}) ${cleanedTelefone.substring(2, 7)}-${cleanedTelefone.substring(7)}`;
} else if (cleanedTelefone.length === 10) {
    formattedTelefone = `(${cleanedTelefone.substring(0, 2)}) ${cleanedTelefone.substring(2, 6)}-${cleanedTelefone.substring(6)}`;
} else if (cleanedTelefone.length >= 8) {
    formattedTelefone = `${cleanedTelefone.substring(0, 4)}-${cleanedTelefone.substring(4)}`;
}

    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          arena: 'Arena A',
          date: selectedDate,
          time: selectedTime,
          nome,
          quantidade: quantidadeNum,
          telefone: formattedTelefone, // Use o telefone formatado
          userId: loginUser
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error || 'Erro ao realizar a reserva.')
        return
      }

      const data = await response.json()
      alert(data.message)
      closePopup()
      await fetchReservations()
      navigate('/reservas')
    } catch (error) {
      console.error('Erro ao criar reserva:', error.message)
      alert('Erro ao criar reserva. Tente novamente mais tarde.')
    }
  }

  const confirmCancelReserva = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/reservations/${selectedReservaId}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error || 'Erro ao cancelar a reserva.')
        return
      }

      alert('Reserva cancelada com sucesso!')
      await fetchReservations()
      navigate('/reservas')
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error.message)
      alert('Erro ao cancelar reserva. Tente novamente mais tarde.')
    } finally {
      setIsConfirmCancelOpen(false)
      setSelectedReservaId(null)
    }
  }

  const handleCancelClick = id => {
    setSelectedReservaId(id)
    setIsConfirmCancelOpen(true)
  }

  const handleAvailableClick = (time, day) => {
    if (!isLoggedIn) {
      alert('Você precisa estar logado para reservar!')
      navigate('/login')
      return
    }
    setSelectedTime(time)
    setSelectedDate(nextDates[day])
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setFormData({ nome: '', quantidade: '', telefone: '' })
  }

  const handleInputChange = e => {
    const { name, value } = e.target

    if (name === 'quantidade') {
      const quantidadeNum = parseInt(value, 10);
      if (!isNaN(quantidadeNum) && quantidadeNum >= 1 && quantidadeNum <= 12) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: quantidadeNum.toString()
        }));
      } else {
        alert('A quantidade de pessoas deve ser entre 1 e 12!');
      }
    } else if (name === 'telefone') {
      const cleaned = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      let formatted = cleaned;
  
     if (cleaned.length > 6 && cleaned.length <= 10) {
          // Formata (XX) XXXX-XXXX
          formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
      } else if (cleaned.length === 11) {
          // Formata (XX) XXXXX-XXXX
          formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
      }
  
      setFormData((prevData) => ({ ...prevData, [name]: formatted }));
  } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
   
}

  return (
    <div className="reserve-page">
      <h1>Agendamento de Quadras</h1>
      <h2>Horários</h2>
      <table>
        <thead>
          <tr>
            <th>Horário</th>
            {Object.keys(nextDates).map(day => (
              <th key={day}>
                {`${day.charAt(0).toUpperCase() + day.slice(1)} (${
                  nextDates[day]
                })`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              <td>{horario.time}</td>
              {['seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((day, idx) => (
                <td key={idx}>
                  {horario[day] ? (
                    <button
                      className="available-button"
                      onClick={() => handleAvailableClick(horario.time, day)}
                    >
                      Disponível
                    </button>
                  ) : (
                    <span className="unavailable">Indisponível</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Minhas Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Qtde Pessoas</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', height: 50 }}>
                Você ainda não possui reservas.
              </td>
            </tr>
          ) : (
            reservas.map(reserva => (
              <tr key={reserva._id}>
                <td>
                  <strong>{reserva.nome}</strong>
                </td>
                <td>{reserva.date}</td>
                <td>{reserva.time}</td>
                <td>{reserva.quantidade}</td>
                <td>
                  <button
                    className="cancel-button"
                    onClick={() => handleCancelClick(reserva._id)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>
              Reservar para: {selectedDate} {selectedTime}
            </h3>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Quantidade de pessoas:
              <input
                type="number"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Telefone:
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
              />
            </label>

            <button className="popup-confirm" onClick={submitForm}>
              Enviar
            </button>
            <button className="popup-cancel" onClick={closePopup}>
              Voltar
            </button>
          </div>
        </div>
      )}

      {isConfirmCancelOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Você tem certeza que deseja cancelar esta reserva?</h3>
            <button className="popup-confirm" onClick={confirmCancelReserva}>
              Sim
            </button>
            <button
              className="popup-cancel"
              onClick={() => setIsConfirmCancelOpen(false)}
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reserve
