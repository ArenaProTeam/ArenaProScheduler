import React, { useState, useEffect } from 'react'
import './Reserve.css'

const Reserve = () => {
  const horarios = [
    {
      time: '07:40 - 08:30',
      seg: 'Disponível',
      ter: 'Disponível',
      qua: 'Disponível',
      qui: 'Disponível',
      sex: 'Indisponível',
      sab: 'Indisponível'
    },
    {
      time: '08:30 - 09:20',
      seg: 'Indisponível',
      ter: 'Indisponível',
      qua: 'Indisponível',
      qui: 'Disponível',
      sex: 'Indisponível',
      sab: 'Disponível'
    },
    {
      time: '09:30 - 10:20',
      seg: 'Disponível',
      ter: 'Disponível',
      qua: 'Disponível',
      qui: 'Indisponível',
      sex: 'Indisponível',
      sab: 'Indisponível'
    },
    {
      time: '10:20 - 11:10',
      seg: 'Indisponível',
      ter: 'Indisponível',
      qua: 'Disponível',
      qui: 'Disponível',
      sex: 'Indisponível',
      sab: 'Indisponível'
    },
    {
      time: '11:20 - 12:10',
      seg: 'Indisponível',
      ter: 'Disponível',
      qua: 'Indisponível',
      qui: 'Indisponível',
      sex: 'Indisponível',
      sab: 'Indisponível'
    }
  ]

  const consultas = [
    {
      user: 'Ana Clara',
      horario: '14:00 - 15:00',
      data: '29/11/2024',
      quantidade: 2,
      status: 'Pendente'
    },
    {
      user: 'Pedro Oliveira',
      horario: '15:00 - 16:00',
      data: '30/11/2024',
      quantidade: 4,
      status: 'Confirmado'
    }
  ]

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDate, setSelectedDate] = useState('') // Inicializa como string vazia
  const [selectedConsulta, setSelectedConsulta] = useState(null)

  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [telefone, setTelefone] = useState('')

  const getNextDate = dayOffset => {
    const today = new Date()
    const nextDate = new Date(today)
    nextDate.setDate(today.getDate() + ((dayOffset + 7) % 7))
    return `${nextDate.getDate()}/${nextDate.getMonth() + 1}` // Formato: dd/mm
  }

  const [nextDates, setNextDates] = useState({})

  useEffect(() => {
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
    setSelectedTime(time)
    setSelectedDate(nextDates[day]) // Atualiza a seleção de data com a data correta
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setNome('')
    setQuantidade('')
    setTelefone('')
  }

  const submitForm = () => {
    if (!nome || !quantidade || !telefone) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    alert(
      `Reserva realizada com sucesso para ${nome}, ${quantidade} pessoas, telefone: ${telefone}.`
    )

    consultas.push({
      user: nome,
      horario: selectedTime,
      data: selectedDate, // Usa a data selecionada
      quantidade: parseInt(quantidade),
      status: 'Pendente'
    })

    closePopup()
  }

  const handleCancelClick = consulta => {
    setSelectedConsulta(consulta)
    setIsConfirmPopupOpen(true)
  }

  const confirmCancel = () => {
    alert(`Reserva de ${selectedConsulta.user} cancelada com sucesso.`)
    setIsConfirmPopupOpen(false)
    setSelectedConsulta(null)
  }

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false)
    setSelectedConsulta(null)
  }

  return (
    <div className="reserve-page">
      <h1>Agendamento de Quadras</h1>

      <h2>Horários</h2>
      <table>
        <thead>
          <tr>
            <th>Horário</th>
            <th>Segunda ({nextDates.seg})</th>
            <th>Terça ({nextDates.ter})</th>
            <th>Quarta ({nextDates.qua})</th>
            <th>Quinta ({nextDates.qui})</th>
            <th>Sexta ({nextDates.sex})</th>
            <th>Sábado ({nextDates.sab})</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              <td>{horario.time}</td>
              {['seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((day, idx) => (
                <td key={idx}>
                  {horario[day] === 'Disponível' ? (
                    <button
                      className="available"
                      onClick={() => handleAvailableClick(horario.time, day)}
                    >
                      {horario[day]}
                    </button>
                  ) : (
                    <span className="unavailable">{horario[day]}</span>
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
            <th>Status</th>
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
              <td>{consulta.status}</td>
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
              Reservar para {selectedTime} - {selectedDate}{' '}
              {/* Exibe a data correta */}
            </h3>
            <label>
              Nome:
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </label>
            <label>
              Quantidade de pessoas:
              <input
                type="number"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
              />
            </label>
            <label>
              Telefone:
              <input
                type="tel"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
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
