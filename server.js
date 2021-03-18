const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();

const tasks = [];

app.use(cors());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const io = socket(server, { cors: { origin: '*', } });
// const io = socket(server);


io.on('connection', (socket) => {
  console.log('New client - its id ' + socket.id);
  socket.on('updateDate', () => {
    console.log('Wysłanie tablicy tasks do klienta')
    io.to(socket.id).emit('updateDate', tasks);
  });
  socket.on('addTask', (newTask) => {
    console.log('serv nasłuchuje addTask, message:', newTask);
    tasks.push(newTask);
    socket.broadcast.emit('addTask', newTask);
  });
  socket.on('removeTask', (id) => {
    const index = tasks.indexOf(tasks.find(task => task.id === id));
    tasks.splice(index, 1);
    socket.broadcast.emit('removeTask', id);
  });
});