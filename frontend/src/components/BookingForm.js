import React, { useState } from 'react';

function BookingForm({ addBooking }) {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('beach-volley');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = { name, sport, date, time };
    addBooking(booking);
    setName('');
    setSport('beach-volley');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Esporte:
        <select value={sport} onChange={(e) => setSport(e.target.value)} required>
          <option value="beach-volley">Beach Volley</option>
          <option value="beach-tennis">Beach Tennis</option>
        </select>
      </label>
      <label>
        Data:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Horário:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <button type="submit">Agendar</button>
    </form>
  );
}

export default BookingForm;