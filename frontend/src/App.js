import React, { useState, useEffect } from 'react';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';

function App() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/bookings')
      .then(response => response.json())
      .then(data => setBookings(data));
  }, []);

  const addBooking = (booking) => {
    fetch('http://localhost:3001/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    })
    .then(response => response.json())
    .then(newBooking => {
      setBookings([...bookings, newBooking]);
    });
  };

  return (
    <div className="App">
      <h1>Agendamento da Arena</h1>
      <BookingForm addBooking={addBooking} />
      <BookingList bookings={bookings} />
    </div>
  );
}

export default App;