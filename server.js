const express = require('express');
const socket = require('socket.io');

const app = express();

const tasks = [];

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on = ('connection', (socket) => {
  console.log('New client - its id ' + socket.id);
  socket.on('updateDate', () => {
    console.log('Wysłanie tablicy tasks do klienta')
    io.to(socket.id).emit('updateDate', tasks);
  });
  socket.on('addTask', (message) => {
    console.log('serv nasłuchuje addTask, message:', message);
    tasks.push(message);
    socket.broadcast.emit('addTask', message);
  });
  socket.on('removeTask', () => {
    const index = tasks.indexOf(index);
    tasks.splice(index, 1);
    socket.broadcast.emit('removeTask', index);
  });
});