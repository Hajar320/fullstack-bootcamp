        const btn = document.querySelectorAll("button.x, button.o");

        // Store the original HTML to restore later
        const originalPageHTML = document.body.innerHTML;

        // Function to go back to symbol selection
        function goToSymbolSelection() {
            document.body.innerHTML = originalPageHTML;
            setupEventListeners();
        }

        // Setup event listeners for the symbol selection buttons
        function setupEventListeners() {
            const btn = document.querySelectorAll("button.x, button.o");
            btn.forEach(btn => btn.addEventListener("click", startGame));
        }

        // Start the game function
        function startGame() {
            const playerSymbol = this.classList.contains('x') ? 'X' : 'O';
            const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
            let currentPlayer = 'human';
            let gameBoard = ['', '', '', '', '', '', '', '', ''];
            const winCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            // Create game page
            document.body.innerHTML = `
                <h1>TIC TAC TOE Game</h1>
                <div id="gameBoard"></div>
                <div id="gameAlert" class="custom-alert">
                    <div class="alert-content">
                        <h2 id="alertMessage"></h2>
                        <button id="replayButton">Play Again</button>
                    </div>
                </div>
            `;

            const gameBoardEl = document.getElementById("gameBoard");

            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
            table.classList.add('game-table');
            gameBoardEl.appendChild(table);
            
            const cells = document.getElementsByTagName("td");
            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.add("cell");
                cells[i].setAttribute('data-index', i);
                cells[i].addEventListener('click', function() {
                    if (currentPlayer === 'human' && this.textContent === '') {
                        this.textContent = playerSymbol;
                        const index = parseInt(this.getAttribute('data-index'));
                        gameBoard[index] = playerSymbol;
                        
                        // Check for win/draw after human move
                        const winner = checkWin();
                        if (winner) {
                            showGameAlert(`${winner} Wins!`);
                            return;
                        }
                        if (checkDraw()) {
                            showGameAlert("Draw Game!");
                            return;
                        }
                        
                        currentPlayer = 'computer';
                        setTimeout(computerMove, 500);
                    }
                });
            }

            function computerMove() {
                if (currentPlayer === 'computer') {
                    const emptyCells = [];
                    for (let j = 0; j < gameBoard.length; j++) {
                        if (gameBoard[j] === '') {
                            emptyCells.push(j);
                        }
                    }
                    
                    if (emptyCells.length > 0) {
                        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                        cells[randomIndex].textContent = computerSymbol;
                        gameBoard[randomIndex] = computerSymbol;
                        
                        // Check for win/draw after computer move
                        const winner = checkWin();
                        if (winner) {
                            showGameAlert(`${winner} Wins!`);
                            return;
                        }
                        if (checkDraw()) {
                            showGameAlert("Draw Game!");
                            return;
                        }
                        
                        currentPlayer = 'human';
                    }
                }
            }

            function checkWin() {
                for (let combo of winCombos) {
                    const [a, b, c] = combo;
                    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                        return gameBoard[a];
                    }
                }
                return null;
            }

            function checkDraw() {
                return !gameBoard.includes('') && !checkWin();
            }

            function showGameAlert(message) {
                const alert = document.getElementById('gameAlert');
                const messageEl = document.getElementById('alertMessage');
                
                messageEl.textContent = message;
                alert.style.display = 'flex';
                
                // Setup replay button
                const replayButton = document.getElementById('replayButton');
                replayButton.onclick = goToSymbolSelection;
            }
        }

        // Initial setup
        setupEventListeners();
