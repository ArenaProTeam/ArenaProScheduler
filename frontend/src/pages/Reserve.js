import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reserve.css';
import API_BASE_URL from '../api/apiConfig';

const Reserve = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const initialHorarios = [
    { time: '07:30 - 08:30', seg: true, ter: true, qua: true, qui: true, sex: true, sab: true },
    { time: '08:30 - 09:30', seg: true, ter: true, qua: true, qui: true, sex: true, sab: true },
    { time: '09:30 - 10:30', seg: true, ter: true, qua: true, qui: true, sex: true, sab: true },
    { time: '10:30 - 11:30', seg: true, ter: true, qua: true, qui: true, sex: true, sab: true },
    { time: '11:30 - 12:30', seg: true, ter: true, qua: true, qui: true, sex: true, sab: true },
  ];

  const [horarios, setHorarios] = useState(initialHorarios);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({ nome: '', quantidade: '', telefone: '' });
  const [nextDates, setNextDates] = useState({});

  // Gerar datas dos próximos dias da semana
  useEffect(() => {
    const getNextDate = (dayOffset) => {
      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + ((dayOffset + 7) % 7));
      return `${nextDate.getDate()}/${nextDate.getMonth() + 1}`;
    };

    const dates = {
      seg: getNextDate(1 - new Date().getDay()),
      ter: getNextDate(2 - new Date().getDay()),
      qua: getNextDate(3 - new Date().getDay()),
      qui: getNextDate(4 - new Date().getDay()),
      sex: getNextDate(5 - new Date().getDay()),
      sab: getNextDate(6 - new Date().getDay()),
    };

    setNextDates(dates);
  }, []);

  // Atualizar estado de horários com base nas reservas ativas
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reservations/active`);
        const reservations = await response.json();

        setHorarios((prevHorarios) =>
          prevHorarios.map((horario) => {
            const updatedHorario = { ...horario };
            Object.keys(nextDates).forEach((day) => {
              const dateForDay = nextDates[day];
              reservations.forEach((reservation) => {
                if (
                  reservation.time === horario.time &&
                  reservation.date === dateForDay
                ) {
                  updatedHorario[day] = false; // Marca como indisponível
                }
              });
            });
            return updatedHorario;
          })
        );
      } catch (error) {
        console.error('Erro ao buscar reservas ativas:', error.message);
      }
    };

    if (Object.keys(nextDates).length > 0) {
      fetchReservations();
    }
  }, [nextDates]);

  // Submeter a reserva
  const submitForm = async () => {
    const { nome, quantidade, telefone } = formData;

    if (!nome || !quantidade || !telefone) {
      alert('Por favor, preencha todos os campos!');
      return;
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
          quantidade,
          telefone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao realizar a reserva.');
        return;
      }

      const data = await response.json();
      alert(data.message);
      closePopup();
    } catch (error) {
      console.error('Erro ao criar reserva:', error.message);
      alert('Erro ao criar reserva. Tente novamente mais tarde.');
    }
  };

  // Eventos do popup
  const handleAvailableClick = (time, day) => {
    if (!isLoggedIn) {
      alert('Você precisa estar logado para reservar!');
      navigate('/login');
      return;
    }
    setSelectedTime(time);
    setSelectedDate(nextDates[day]);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({ nome: '', quantidade: '', telefone: '' });
  };

  // Manipular mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="reserve-page">
      <h1>Agendamento de Quadras</h1>
      <h2>Horários</h2>
      <table>
        <thead>
          <tr>
            <th>Horário</th>
            {Object.keys(nextDates).map((day) => (
              <th key={day}>
                {`${day.charAt(0).toUpperCase() + day.slice(1)} (${nextDates[day]})`}
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
                    <button onClick={() => handleAvailableClick(horario.time, day)}>
                      Disponível
                    </button>
                  ) : (
                    <span>Indisponível</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
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
              <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
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
            <button onClick={submitForm}>Enviar</button>
            <button onClick={closePopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserve;