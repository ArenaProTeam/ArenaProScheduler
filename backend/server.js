const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRouter = require('./routes/bookings');

const app = express();
const port = 3001; // Porta do servidor back-end

app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingsRouter);

mongoose.connect('mongodb://localhost:27017/arena', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});