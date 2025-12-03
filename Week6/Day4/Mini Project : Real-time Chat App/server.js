const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
  
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store active users and rooms
const users = new Map();
const rooms = new Map();

// Helper functions
const getUsersInRoom = (room) => {
  return Array.from(users.values()).filter(user => user.room === room);
};

const getRoomUsers = (room) => {
  return getUsersInRoom(room).map(user => ({
    id: user.id,
    username: user.username
  }));
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Handle user joining
  socket.on('joinRoom', (data) => {
    const { username, room } = data;
    
    // Leave previous room if any
    if (users.has(socket.id)) {
      const previousRoom = users.get(socket.id).room;
      socket.leave(previousRoom);
      
      // Notify room about user leaving
      io.to(previousRoom).emit('userLeft', {
        username: users.get(socket.id).username,
        users: getRoomUsers(previousRoom)
      });
    }

    // Join new room
    socket.join(room);
    
    // Store user info
    users.set(socket.id, { id: socket.id, username, room });
    
    // Initialize room if it doesn't exist
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(socket.id);

    // Welcome message to the user
    socket.emit('message', {
      username: 'ChatBot',
      text: `Welcome to the ${room} chat room!`,
      timestamp: new Date().toLocaleTimeString()
    });

    // Broadcast to room that a user joined
    socket.broadcast.to(room).emit('message', {
      username: 'ChatBot',
      text: `${username} has joined the chat`,
      timestamp: new Date().toLocaleTimeString()
    });

    // Send users and room info
    io.to(room).emit('roomUsers', {
      room,
      users: getRoomUsers(room)
    });
  });

  // Handle chat messages
  socket.on('chatMessage', (data) => {
    const user = users.get(socket.id);
    if (user) {
      const messageData = {
        username: user.username,
        text: data.text,
        timestamp: new Date().toLocaleTimeString()
      };
      
      io.to(user.room).emit('message', messageData);
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.to(user.room).emit('typing', {
        username: user.username,
        isTyping: data.isTyping
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      const { username, room } = user;
      
      // Remove user from storage
      users.delete(socket.id);
      if (rooms.has(room)) {
        rooms.get(room).delete(socket.id);
      }

      // Notify room
      io.to(room).emit('message', {
        username: 'ChatBot',
        text: `${username} has left the chat`,
        timestamp: new Date().toLocaleTimeString()
      });

      // Update users list
      io.to(room).emit('roomUsers', {
        room,
        users: getRoomUsers(room)
      });
    }
    
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});