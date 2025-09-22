const express = require('express');
const http = require('http');
const { Server } from 'socket.io';
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:8080' } // Match frontend port
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message));

// Seed departments (optional, run once)
const Department = require('./models/Department');
const seedDepts = async () => {
  const count = await Department.countDocuments();
  if (count === 0) {
    await Department.insertMany([
      { name: 'Roads', responsibleIssues: ['Pothole'] },
      { name: 'Sanitation', responsibleIssues: ['Garbage', 'Drainage'] },
      { name: 'Lighting', responsibleIssues: ['Streetlight'] }
    ]);
    console.log('Departments seeded');
  }
};
seedDepts();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports')); // We'll update this for real-time

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);

  // Join room for user-specific notifications (e.g., user ID as room)
  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

server.listen(PORT, () => console.log(`Server on ${PORT}`));