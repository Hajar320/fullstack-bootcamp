const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage (in production, use a database)
let users = {};
let games = {};
let userSessions = {};

// User registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    
    if (users[username]) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    
    users[username] = { username, password };
    const sessionId = uuidv4();
    userSessions[sessionId] = username;
    
    res.json({ sessionId, username });
});

// User login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const sessionId = uuidv4();
    userSessions[sessionId] = username;
    
    res.json({ sessionId, username });
});

// Create new game
app.post('/api/games', (req, res) => {
    const { sessionId } = req.body;
    const username = userSessions[sessionId];
    
    if (!username) {
        return res.status(401).json({ error: 'Invalid session' });
    }
    
    const gameId = uuidv4();
    const game = createNewGame(username);
    games[gameId] = game;
    
    res.json({ gameId, game });
});

// Join existing game
app.post('/api/games/:gameId/join', (req, res) => {
    const { gameId } = req.params;
    const { sessionId } = req.body;
    const username = userSessions[sessionId];
    
    if (!username) {
        return res.status(401).json({ error: 'Invalid session' });
    }
    
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    if (game.players.length >= 2) {
        return res.status(400).json({ error: 'Game is full' });
    }
    
    game.players.push({
        username,
        position: { x: 9, y: 9 }, // Bottom-right corner
        base: { x: 9, y: 9 }
    });
    
    game.currentPlayer = 0; // Start with first player
    
    res.json({ game });
});

// Get game state
app.get('/api/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    const game = games[gameId];
    
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    res.json({ game });
});

// Make a move
app.post('/api/games/:gameId/move', (req, res) => {
    const { gameId } = req.params;
    const { sessionId, direction } = req.body;
    const username = userSessions[sessionId];
    
    if (!username) {
        return res.status(401).json({ error: 'Invalid session' });
    }
    
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    const currentPlayer = game.players[game.currentPlayer];
    if (currentPlayer.username !== username) {
        return res.status(400).json({ error: 'Not your turn' });
    }
    
    const moveResult = makeMove(game, direction);
    
    if (moveResult.error) {
        return res.status(400).json(moveResult);
    }
    
    // Check for win condition
    if (moveResult.winner) {
        game.winner = moveResult.winner;
        game.status = 'finished';
    } else {
        // Switch to next player
        game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
    }
    
    res.json(moveResult);
});

// Game logic functions
function createNewGame(creatorUsername) {
    const obstacles = generateObstacles();
    
    return {
        id: uuidv4(),
        players: [
            {
                username: creatorUsername,
                position: { x: 0, y: 0 }, // Top-left corner
                base: { x: 0, y: 0 }
            }
        ],
        grid: createGrid(obstacles),
        obstacles,
        currentPlayer: 0,
        status: 'waiting', // waiting, active, finished
        winner: null
    };
}

function createGrid(obstacles) {
    const grid = [];
    for (let y = 0; y < 10; y++) {
        const row = [];
        for (let x = 0; x < 10; x++) {
            const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
            row.push({
                x, y,
                type: isObstacle ? 'obstacle' : 'empty'
            });
        }
        grid.push(row);
    }
    return grid;
}

function generateObstacles() {
    const obstacles = [];
    const obstacleCount = 15;
    
    for (let i = 0; i < obstacleCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (
            (x === 0 && y === 0) || // Player 1 base
            (x === 9 && y === 9) || // Player 2 base
            obstacles.some(obs => obs.x === x && obs.y === y)
        );
        
        obstacles.push({ x, y });
    }
    
    return obstacles;
}

function makeMove(game, direction) {
    const player = game.players[game.currentPlayer];
    const opponent = game.players[(game.currentPlayer + 1) % game.players.length];
    
    const newPosition = calculateNewPosition(player.position, direction);
    
    // Check if move is valid
    if (!isValidMove(game, newPosition)) {
        return { error: 'Invalid move' };
    }
    
    // Update player position
    player.position = newPosition;
    
    // Check for win condition (reaching opponent's base)
    if (newPosition.x === opponent.base.x && newPosition.y === opponent.base.y) {
        return {
            success: true,
            winner: player.username,
            game: game
        };
    }
    
    // Check for attack condition (adjacent to opponent's base)
    if (isAdjacent(newPosition, opponent.base)) {
        // 50% chance to win when adjacent
        if (Math.random() > 0.5) {
            return {
                success: true,
                winner: player.username,
                game: game,
                message: 'Successful attack!'
            };
        }
    }
    
    return {
        success: true,
        game: game,
        message: 'Move successful'
    };
}

function calculateNewPosition(position, direction) {
    const newPos = { ...position };
    
    switch (direction) {
        case 'up': newPos.y = Math.max(0, newPos.y - 1); break;
        case 'down': newPos.y = Math.min(9, newPos.y + 1); break;
        case 'left': newPos.x = Math.max(0, newPos.x - 1); break;
        case 'right': newPos.x = Math.min(9, newPos.x + 1); break;
    }
    
    return newPos;
}

function isValidMove(game, position) {
    // Check boundaries
    if (position.x < 0 || position.x > 9 || position.y < 0 || position.y > 9) {
        return false;
    }
    
    // Check obstacles
    if (game.obstacles.some(obs => obs.x === position.x && obs.y === position.y)) {
        return false;
    }
    
    // Check if position is occupied by other player
    const otherPlayer = game.players[(game.currentPlayer + 1) % game.players.length];
    if (otherPlayer.position.x === position.x && otherPlayer.position.y === position.y) {
        return false;
    }
    
    return true;
}

function isAdjacent(pos1, pos2) {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});