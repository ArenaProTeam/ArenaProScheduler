import React from 'react';

function BookingList({ bookings }) {
  return (
    <ul>
      {bookings.map((booking, index) => (
        <li key={index}>
          {booking.name} agendou {booking.sport} para {booking.date} às {booking.time}
        </li>
      ))}
    </ul>
  );
}

export default BookingList;