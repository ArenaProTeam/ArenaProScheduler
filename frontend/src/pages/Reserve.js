import React, { useState } from 'react'
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
      data: '10/10/2023',
      status: 'Pendente'
    },
    {
      user: 'Pedro Oliveira',
      horario: '15:00 - 16:00',
      data: '11/10/2023',
      status: 'Confirmado'
    }
  ]

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')

  // Novos estados para o formulário
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [telefone, setTelefone] = useState('')

  const handleAvailableClick = time => {
    setSelectedTime(time)
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    // Limpar os campos do formulário ao fechar
    setNome('')
    setQuantidade('')
    setTelefone('')
  }

  // Função para validar e enviar o formulário
  const submitForm = () => {
    if (!nome || !quantidade || !telefone) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    // Aqui você pode adicionar a lógica para armazenar a reserva
    alert(
      `Reserva realizada com sucesso para ${nome}, ${quantidade} pessoas, telefone: ${telefone}.`
    )

    // Fechar o popup e limpar os campos
    closePopup()
  }

  return (
    <div className="reserve-page">
      <h1>Agendamento de Quadras</h1>

      <h2>Horários</h2>
      <table>
        <thead>
          <tr>
            <th>Horário</th>
            <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
            <th>Sábado</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              <td>{horario.time}</td>
              <td>
                {horario.seg === 'Disponível' ? (
                  <button
                    className="available"
                    onClick={() => handleAvailableClick(horario.time)}
                  >
                    {horario.seg}
                  </button>
                ) : (
                  <span className="unavailable">{horario.seg}</span>
                )}
              </td>
              <td>
                {horario.ter === 'Disponível' ? (
                  <button
                    className="available"
                    onClick={() => handleAvailableClick(horario.time)}
                  >
                    {horario.ter}
                  </button>
                ) : (
                  <span className="unavailable">{horario.ter}</span>
                )}
              </td>
              <td>
                {horario.qua === 'Disponível' ? (
                  <button
                    className="available"
                    onClick={() => handleAvailableClick(horario.time)}
                  >
                    {horario.qua}
                  </button>
                ) : (
                  <span className="unavailable">{horario.qua}</span>
                )}
              </td>
              <td>
                {horario.qui === 'Disponível' ? (
                  <button
                    className="available"
                    onClick={() => handleAvailableClick(horario.time)}
                  >
                    {horario.qui}
                  </button>
                ) : (
                  <span className="unavailable">{horario.qui}</span>
                )}
              </td>
              <td>
                {horario.sex === 'Disponível' ? (
                  <button
                    className="available"
                    onClick={() => handleAvailableClick(horario.time)}
                  >
                    {horario.sex}
                  </button>
                ) : (
                  <span className="unavailable">{horario.sex}</span>
                )}
              </td>
              <td>
                {horario.sab === 'Disponível' ? (
                  <button
                    className="available"
                    onClick={() => handleAvailableClick(horario.time)}
                  >
                    {horario.sab}
                  </button>
                ) : (
                  <span className="unavailable">{horario.sab}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Consulta e Cancelamento</h2>
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Horário</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta, index) => (
            <tr key={index}>
              <td>{consulta.user}</td>
              <td>{consulta.horario}</td>
              <td>{consulta.data}</td>
              <td>{consulta.status}</td>
              <td>
                <button className="cancel-button">Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Reservar para {selectedTime}</h3>
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
    </div>
  )
}

export default Reserve
