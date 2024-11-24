import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveReservations } from '../api/reservations'; // Importar a função da API
import './Reserve.css';

const Reserve = ({ isLoggedIn }) => {
  const navigate = useNavigate(); // Instância de navegação

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
    {
      time: '09:30 - 10:20',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true,
    },
    {
      time: '10:20 - 11:10',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true,
    },
    {
      time: '11:20 - 12:10',
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true,
    },
  ];

  const [horarios, setHorarios] = useState(initialHorarios);
  const [consultas, setConsultas] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    telefone: '',
  });
  const [nextDates, setNextDates] = useState({});

  useEffect(() => {
    const getNextDate = (dayOffset) => {
      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + ((dayOffset + 7) % 7));
      return `${nextDate.getDate()}/${nextDate.getMonth() + 1}`; // Formato: dd/mm
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

  // Buscar reservas ativas ao carregar as datas
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

    fetchReservations();
  }, [nextDates]);

  const handleAvailableClick = (time, day) => {
    if (!isLoggedIn) {
      alert('Você precisa estar logado para reservar!');
      navigate('/login'); // Redireciona para a tela de login
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

  const submitForm = () => {
    const { nome, quantidade, telefone } = formData;

    if (!nome || !quantidade || !telefone) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const newConsulta = {
      user: nome,
      horario: selectedTime,
      data: selectedDate,
      quantidade: parseInt(quantidade),
    };

    setConsultas((prevConsultas) => [...prevConsultas, newConsulta]);

    // Atualiza os horários para marcar como indisponível
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

    alert(
      `Reserva realizada com sucesso para ${nome}, ${quantidade} pessoas, telefone: ${telefone}.`
    );
    closePopup();
  };

  const handleCancelClick = (consulta) => {
    setSelectedConsulta(consulta);
    setIsConfirmPopupOpen(true);
  };

  const confirmCancel = () => {
    setConsultas((prevConsultas) =>
      prevConsultas.filter((c) => c !== selectedConsulta)
    );
    alert(`Reserva de ${selectedConsulta.user} cancelada com sucesso.`);
    closeConfirmPopup();

    // Redireciona para a tela de login após o cancelamento
    navigate('/login');
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
    setSelectedConsulta(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="reserve-page">
      {/* Renderização do componente segue como no código original */}
    </div>
  );
};

export default Reserve;