import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://chat-react-socketio-delta.vercel.app/',
  },
});

app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log('Serve started');
  socket.on('message', ({ name, message }) => {
    socket.broadcast.emit('message', { name, message, id: socket.id });
    console.log(`${name} says ${message}`);
  });
});

server.listen(port, () => console.log('Server ON'));
