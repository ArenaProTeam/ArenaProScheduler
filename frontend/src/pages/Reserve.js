import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveReservations } from '../api/reservations';
import './Reserve.css';
import API_BASE_URL from '../api/apiConfig'; // Ajuste o caminho conforme a estrutura da sua pasta

const Reserve = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const initialHorarios = [
    {
      time: '07:40 - 08:30',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true,
    },
    {
      time: '08:30 - 09:20',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true,
    },
    // Outros horários omitidos para simplificação...
  ];

  const [horarios, setHorarios] = useState(initialHorarios);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    telefone: '',
  });

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

  // Buscar reservas ativas no backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const activeReservations = await getActiveReservations();
        setHorarios((prevHorarios) =>
          prevHorarios.map((horario) => {
            activeReservations.forEach((reservation) => {
              if (horario.time === reservation.time) {
                const day = Object.keys(nextDates).find(
                  (key) => nextDates[key] === reservation.date
                );
                if (day) horario[day] = false;
              }
            });
            return horario;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'quantidade') {
      const quantidade = parseInt(value, 10);
      if (quantidade < 1 || quantidade > 12) {
        alert('O número de participantes deve estar entre 1 e 12.');
        return;
      }
    }

    if (name === 'telefone') {
      const telefoneFormatado = formatarTelefone(value);
      setFormData((prevData) => ({ ...prevData, [name]: telefoneFormatado }));
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formatarTelefone = (telefone) => {
    const somenteNumeros = telefone.replace(/\D/g, '');
    if (somenteNumeros.length <= 10) {
      return somenteNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return somenteNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const submitForm = async () => {
    const { nome, quantidade, telefone } = formData;

    if (!nome || !quantidade || !telefone) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
      alert('O número de telefone deve estar no formato (XX) XXXXX-XXXX.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          arena: 'Arena A',
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao realizar a reserva.');
        return;
      }

      const data = await response.json();
      alert(data.message);

      // Atualizar estado após a reserva bem-sucedida
      setHorarios((prevHorarios) =>
        prevHorarios.map((horario) => {
          if (horario.time === selectedTime) {
            return {
              ...horario,
              [Object.keys(nextDates).find(
                (day) => nextDates[day] === selectedDate
              )]: false,
            };
          }
          return horario;
        })
      );

      closePopup();
    } catch (error) {
      console.error('Erro ao criar reserva:', error.message);
      alert('Erro ao criar reserva. Tente novamente mais tarde.');
    }
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
                      onClick={() => handleAvailableClick(horario.time, day)}
                    >
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
    </div>
  );
};

export default Reserve;