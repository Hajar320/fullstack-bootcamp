const socket = io();
let currentUser = '';
let currentRoom = '';

// DOM Elements
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const joinBtn = document.getElementById('join-btn');
const leaveBtn = document.getElementById('leave-btn');
const roomName = document.getElementById('room-name');
const userCount = document.getElementById('user-count');
const usersList = document.getElementById('users-list');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const notificationSound = document.getElementById('notification-sound');

// Typing detection
let typing = false;
let typingTimer;

// Join chat room
joinBtn.addEventListener('click', joinChat);
roomInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});

function joinChat() {
    const username = usernameInput.value.trim();
    const room = roomInput.value.trim() || 'general';
    
    if (!username) {
        alert('Please enter a username');
        return;
    }
    
    currentUser = username;
    currentRoom = room;
    
    // Show chat container
    loginContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    
    // Join room
    socket.emit('joinRoom', { username, room });
    
    // Update room name
    roomName.textContent = room;
    
    // Focus on message input
    messageInput.focus();
}

// Leave chat room
leaveBtn.addEventListener('click', () => {
    socket.disconnect();
    socket.connect();
    
    // Show login container
    chatContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    
    // Clear inputs
    usernameInput.value = '';
    roomInput.value = '';
    
    // Clear messages and users
    messagesContainer.innerHTML = '';
    usersList.innerHTML = '';
});

// Send message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message) {
        socket.emit('chatMessage', { text: message });
        messageInput.value = '';
        
        // Stop typing indicator
        socket.emit('typing', { isTyping: false });
        typing = false;
        clearTimeout(typingTimer);
        
    }
}

// Typing indicator
messageInput.addEventListener('input', () => {
    if (!typing) {
        typing = true;
        socket.emit('typing', { isTyping: true });
    }
    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        typing = false;
        socket.emit('typing', { isTyping: false });
    }, 1000);
});

// Socket event listeners
socket.on('message', (data) => {
    displayMessage(data);
    
    // Play notification sound for messages from other users
    if (data.username !== currentUser && data.username !== 'ChatBot') {
        playNotification();
    }
    
    // Scroll to bottom
    scrollToBottom();
});

socket.on('roomUsers', (data) => {
    updateUsersList(data.users);
    userCount.textContent = `${data.users.length} user${data.users.length !== 1 ? 's' : ''}`;
});

socket.on('typing', (data) => {
    if (data.isTyping) {
        typingIndicator.textContent = `${data.username} is typing...`;
    } else {
        typingIndicator.textContent = '';
    }
});

socket.on('userLeft', (data) => {
    displaySystemMessage(`${data.username} left the chat`);
});

// Display message in chat
function displayMessage(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${data.username === currentUser ? 'own' : data.username === 'ChatBot' ? 'system-message' : 'other'}`;
    
    const messageHeader = data.username !== 'ChatBot' ? 
        `<div class="message-header">
            <strong>${data.username}</strong>
            <span>${data.timestamp}</span>
        </div>` : '';
    
    messageDiv.innerHTML = `
        ${messageHeader}
        <div class="message-text">${escapeHtml(data.text)}</div>
        ${data.username !== 'ChatBot' ? `<div class="message-time">${formatTime(data.timestamp)}</div>` : ''}
    `;
    
    messagesContainer.appendChild(messageDiv);
}

// Display system message
function displaySystemMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message system-message';
    messageDiv.innerHTML = `
        <div class="message-text">${escapeHtml(text)}</div>
    `;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Update users list
function updateUsersList(users) {
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username;
        if (user.username === currentUser) {
            li.innerHTML += ' <i class="fas fa-user"></i>';
            li.style.fontWeight = 'bold';
            li.style.borderLeftColor = '#4CAF50';
        }
        usersList.appendChild(li);
    });
}

// Scroll to bottom of messages
function scrollToBottom() {
     if (!messagesContainer) return;
    
    const threshold = 100; // pixels from bottom
    const atBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < threshold;
    
    if (!atBottom) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Play notification sound
function playNotification() {
    notificationSound.currentTime = 0;
    notificationSound.play().catch(e => console.log('Audio play failed:', e));
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(timeString) {
    return timeString;
}

// Handle page visibility change for notifications
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'New Message - ChatApp';
    } else {
        document.title = 'ChatApp';
    }
});

// Auto-focus username input on load
window.addEventListener('load', () => {
    usernameInput.focus();
});