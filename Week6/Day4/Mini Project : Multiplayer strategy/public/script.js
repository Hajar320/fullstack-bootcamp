let currentSession = null;
let currentGameId = null;
let currentUsername = null;

// API base URL
const API_BASE = '/api';

// Utility functions
function showMessage(message, isError = false) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = isError ? 'error' : '';
    messageEl.classList.remove('hidden');
    
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 10000);
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Authentication
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showMessage('Please enter username and password', true);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentSession = data.sessionId;
            currentUsername = data.username;
            showMessage('Login successful!');
            showSection('game-section');
        } else {
            showMessage(data.error, true);
        }
    } catch (error) {
        showMessage('Login failed: ' + error.message, true);
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showMessage('Please enter username and password', true);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentSession = data.sessionId;
            currentUsername = data.username;
            showMessage('Registration successful!');
            showSection('game-section');
        } else {
            showMessage(data.error, true);
        }
    } catch (error) {
        showMessage('Registration failed: ' + error.message, true);
    }
}

// Game management
async function createGame() {
    try {
        const response = await fetch(`${API_BASE}/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: currentSession })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentGameId = data.gameId;
            showMessage('Game created! Share the Game ID with your opponent: ' + currentGameId);
            updateGameInfo(data.game);
            showSection('board-section');
            renderBoard(data.game);
        } else {
            showMessage(data.error, true);
        }
    } catch (error) {
        showMessage('Failed to create game: ' + error.message, true);
    }
}

async function joinGame() {
    const gameId = document.getElementById('gameId').value;
    
    if (!gameId) {
        showMessage('Please enter a game ID', true);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/games/${gameId}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: currentSession })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentGameId = gameId;
            showMessage('Joined game successfully!');
            updateGameInfo(data.game);
            showSection('board-section');
            renderBoard(data.game);
            startGamePolling();
        } else {
            showMessage(data.error, true);
        }
    } catch (error) {
        showMessage('Failed to join game: ' + error.message, true);
    }
}

// Game rendering
function renderBoard(game) {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            // Check for obstacles
            if (game.obstacles.some(obs => obs.x === x && obs.y === y)) {
                cell.classList.add('obstacle');
                cell.textContent = '■';
            }
            
            // Check for player bases
            if (x === game.players[0].base.x && y === game.players[0].base.y) {
                cell.classList.add('base-1');
                cell.textContent = '🏠';
            } else if (game.players[1] && x === game.players[1].base.x && y === game.players[1].base.y) {
                cell.classList.add('base-2');
                cell.textContent = '🏠';
            }
            
            // Check for player positions
            if (x === game.players[0].position.x && y === game.players[0].position.y) {
                cell.classList.add('player-1');
                cell.textContent = 'P1';
            } else if (game.players[1] && x === game.players[1].position.x && y === game.players[1].position.y) {
                cell.classList.add('player-2');
                cell.textContent = 'P2';
            }
            
            board.appendChild(cell);
        }
    }
}

function updateGameInfo(game) {
    document.getElementById('current-game-id').textContent = currentGameId;
    document.getElementById('game-status').textContent = game.status;
    
    if (game.players[game.currentPlayer]) {
        document.getElementById('current-player').textContent = game.players[game.currentPlayer].username;
    }
    
    const controls = document.getElementById('controls');
    const winnerMessage = document.getElementById('winner-message');
    
    if (game.winner) {
        winnerMessage.textContent = `Winner: ${game.winner}!`;
        winnerMessage.classList.remove('hidden');
      //  controls.classList.add('hidden');
    } else {
        winnerMessage.classList.add('hidden');
        
        if (game.players[game.currentPlayer]?.username === currentUsername) {
            controls.classList.remove('hidden');
        } else {
          //  controls.classList.add('hidden');
        }
    }
    
    document.getElementById('game-info').classList.remove('hidden');
}

// Game actions
async function makeMove(direction) {
    try {
        const response = await fetch(`${API_BASE}/games/${currentGameId}/move`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sessionId: currentSession, 
                direction 
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            if (data.success) {
                showMessage(data.message || 'Move successful!');
                updateGameInfo(data.game);
                renderBoard(data.game);
                
                if (data.winner) {
                    showMessage(`Game over! Winner: ${data.winner}`);
                }
            } else {
                showMessage(data.error, true);
            }
        } else {
            showMessage(data.error, true);
        }
    } catch (error) {
        showMessage('Move failed: ' + error.message, true);
    }
}

// Polling for game updates
let pollingInterval = null;

function startGamePolling() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
    
    pollingInterval = setInterval(async () => {
        if (!currentGameId) return;
        
        try {
            const response = await fetch(`${API_BASE}/games/${currentGameId}`);
            const data = await response.json();
            
            if (response.ok) {
                updateGameInfo(data.game);
                renderBoard(data.game);
                
                // Stop polling if game is finished
                if (data.game.status === 'finished') {
                    clearInterval(pollingInterval);
                }
            }
        } catch (error) {
            console.error('Polling error:', error);
        }
    }, 2000); // Poll every 2 seconds
}

// Initialize
showSection('auth-section');