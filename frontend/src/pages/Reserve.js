import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Reserve.css'

const Reserve = ({ isLoggedIn }) => {
  const navigate = useNavigate() // Instância de navegação

  const initialHorarios = [
    {
      time: '07:40 - 08:30',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '08:30 - 09:20',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '09:30 - 10:20',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '10:20 - 11:10',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    },
    {
      time: '11:20 - 12:10',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true
    }
  ]

  const [horarios, setHorarios] = useState(initialHorarios)
  const [consultas, setConsultas] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedConsulta, setSelectedConsulta] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    telefone: ''
  })
  const [nextDates, setNextDates] = useState({})

  useEffect(() => {
    const getNextDate = dayOffset => {
      const today = new Date()
      const nextDate = new Date(today)
      nextDate.setDate(today.getDate() + ((dayOffset + 7) % 7))
      return `${nextDate.getDate()}/${nextDate.getMonth() + 1}` // Formato: dd/mm
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

  const handleAvailableClick = (time, day) => {
    if (!isLoggedIn) {
      alert('Você precisa estar logado para reservar!')
      navigate('/login') // Redireciona para a tela de login
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

  const submitForm = () => {
    const { nome, quantidade, telefone } = formData

    if (!nome || !quantidade || !telefone) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const newConsulta = {
      user: nome,
      horario: selectedTime,
      data: selectedDate,
      quantidade: parseInt(quantidade)
    }

    setConsultas(prevConsultas => [...prevConsultas, newConsulta])

    // Atualiza os horários para marcar como indisponível
    setHorarios(prevHorarios =>
      prevHorarios.map(horario => {
        if (horario.time === selectedTime) {
          return {
            ...horario,
            [Object.keys(nextDates).find(
              day => nextDates[day] === selectedDate
            )]: false
          }
        }
        return horario
      })
    )

    alert(
      `Reserva realizada com sucesso para ${nome}, ${quantidade} pessoas, telefone: ${telefone}.`
    )
    closePopup()
  }

  const handleCancelClick = consulta => {
    setSelectedConsulta(consulta)
    setIsConfirmPopupOpen(true)
  }

  const confirmCancel = () => {
    setConsultas(prevConsultas =>
      prevConsultas.filter(c => c !== selectedConsulta)
    )
    alert(`Reserva de ${selectedConsulta.user} cancelada com sucesso.`)
    closeConfirmPopup()

    // Redireciona para a tela de login após o cancelamento
    navigate('/login')
  }

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false)
    setSelectedConsulta(null)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
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
              <th key={day}>{`${day.charAt(0).toUpperCase() + day.slice(1)} (${
                nextDates[day]
              })`}</th>
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
                      className="available"
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

      <h2>Consulta e Cancelamento</h2>
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Qtde Pessoas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta, index) => (
            <tr key={index}>
              <td>{consulta.user}</td>
              <td>{consulta.data}</td>
              <td>{consulta.horario}</td>
              <td>{consulta.quantidade}</td>
              <td>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelClick(consulta)}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>
              Reservar para {selectedTime} - {selectedDate}
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
            <button onClick={submitForm}>Enviar Reserva</button>
            <button onClick={closePopup}>Fechar</button>
          </div>
        </div>
      )}

      {isConfirmPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Confirmar Cancelamento</h3>
            <p>
              Tem certeza que deseja cancelar a reserva de{' '}
              {selectedConsulta?.user}?
            </p>
            <button onClick={confirmCancel}>Confirmar</button>
            <button onClick={closeConfirmPopup}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reserve
