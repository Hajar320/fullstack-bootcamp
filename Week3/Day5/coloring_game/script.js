class ColoringGame {
    constructor() {
        this.gridSize = 20;
        this.currentColor = 'red';
        this.isDrawing = false;
        this.grid = document.getElementById('grid');
        this.init();
    }

    init() {
        this.createGrid();
        this.setupEventListeners();
        this.selectColor('red');
    }

    createGrid() {
        this.grid.innerHTML = '';
        for (let i = 0; i < this.gridSize; i++) {
            const row = document.createElement('div');
            row.className = 'grid-row';
            
            for (let j = 0; j < this.gridSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // Add event listeners for coloring
                cell.addEventListener('mousedown', (e) => {
                    this.isDrawing = true;
                    this.colorCell(e.target);
                });
                
                cell.addEventListener('mouseover', (e) => {
                    if (this.isDrawing) {
                        this.colorCell(e.target);
                    }
                });
                
                row.appendChild(cell);
            }
            this.grid.appendChild(row);
        }
    }

    colorCell(cell) {
        cell.style.backgroundColor = this.currentColor;
    }

    setupEventListeners() {
        // Color palette selection
        document.querySelectorAll('.color').forEach(colorDiv => {
            colorDiv.addEventListener('click', (e) => {
                this.selectColor(e.target.dataset.color);
            });
        });

        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearGrid();
        });

        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveDrawing();
        });

        // Mouse up event to stop drawing
        document.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
    }

    selectColor(color) {
        this.currentColor = color;
        
        // Update UI
        document.querySelectorAll('.color').forEach(colorDiv => {
            colorDiv.classList.remove('selected');
        });
        
        document.querySelector(`[data-color="${color}"]`).classList.add('selected');
    }

    clearGrid() {
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.style.backgroundColor = '';
        });
    }


}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ColoringGame();
});