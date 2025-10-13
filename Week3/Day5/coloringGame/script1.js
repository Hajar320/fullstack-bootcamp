        // ============================================
        // LEARNING: DOM TREE MANIPULATION
        // ============================================

        // Get references to DOM elements
        const colorPalette = document.getElementById('colorPalette');
        const paintingGrid = document.getElementById('paintingGrid');
        const clearBtn = document.getElementById('clearBtn');

        // Application state
        let selectedColor = '#FF0000'; // Start with red
        let isMouseDown = false; // Track if mouse button is pressed

        // Color options for our palette
        const colors = [
            '#FF0000', // Red
            '#00FF00', // Green
            '#0000FF', // Blue
            '#FFFF00', // Yellow
            '#FF00FF', // Magenta
            '#00FFFF', // Cyan
            '#FFA500', // Orange
            '#800080', // Purple
            '#008000', // Dark Green
            '#000000'  // Black
        ];

        // ============================================
        // LEARNING: CREATING ELEMENTS (DOM TREE)
        // ============================================

        function initializeColorPalette() {
            console.log("Creating color palette using DOM tree manipulation...");
            
            colors.forEach((color, index) => {
                // Create a new div element for each color
                const colorOption = document.createElement('div');
                
                // Set properties and attributes
                colorOption.className = 'color-option';
                colorOption.style.backgroundColor = color;
                colorOption.dataset.color = color; // Store color in data attribute
                
                // Add to the DOM tree
                colorPalette.appendChild(colorOption);
                
                // Select the first color by default
                if (index === 0) {
                    colorOption.classList.add('selected');
                }
            });
            
            console.log("Color palette created with", colors.length, "colors");
        }

        function initializePaintingGrid() {
            console.log("Creating painting grid using DOM tree manipulation...");
            
            // Create 16x16 grid (256 cells)
            for (let i = 0; i < 256; i++) {
                const gridCell = document.createElement('div');
                gridCell.className = 'grid-cell';
                gridCell.dataset.index = i; // Store index for debugging
                
                // Add to the DOM tree
                paintingGrid.appendChild(gridCell);
            }
            
            console.log("Painting grid created with 256 cells (16x16)");
        }

        // ============================================
        // LEARNING: DOM EVENTS
        // ============================================

        function setupEventListeners() {
            console.log("Setting up DOM event listeners...");
            
            // EVENT: Color selection
            colorPalette.addEventListener('click', function(event) {
                // Check if clicked element is a color option
                if (event.target.classList.contains('color-option')) {
                    // Remove 'selected' class from all colors
                    document.querySelectorAll('.color-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                    
                    // Add 'selected' class to clicked color
                    event.target.classList.add('selected');
                    
                    // Update selected color
                    selectedColor = event.target.dataset.color;
                    
                    console.log("Color selected:", selectedColor);
                }
            });

            // EVENT: Mouse down on grid (start painting)
            paintingGrid.addEventListener('mousedown', function(event) {
                if (event.target.classList.contains('grid-cell')) {
                    isMouseDown = true;
                    paintCell(event.target);
                    console.log("Mouse down - started painting");
                }
            });

            // EVENT: Mouse over grid (painting while dragging)
            paintingGrid.addEventListener('mouseover', function(event) {
                if (isMouseDown && event.target.classList.contains('grid-cell')) {
                    paintCell(event.target);
                }
            });

            // EVENT: Mouse up (stop painting)
            document.addEventListener('mouseup', function() {
                if (isMouseDown) {
                    isMouseDown = false;
                    console.log("Mouse up - stopped painting");
                }
            });

            // EVENT: Clear button click
            clearBtn.addEventListener('click', function() {
                clearGrid();
                console.log("Grid cleared");
            });


            // Prevent drag image on grid (bonus learning)
            paintingGrid.addEventListener('dragstart', function(event) {
                event.preventDefault();
            });
        }

        // ============================================
        // LEARNING: DOM MANIPULATION FUNCTIONS
        // ============================================

        function paintCell(cell) {
            // Change the cell's background color
            cell.style.backgroundColor = selectedColor;
        }

        function clearGrid() {
            // Reset all cells to white
            const cells = paintingGrid.querySelectorAll('.grid-cell');
            cells.forEach(cell => {
                cell.style.backgroundColor = '';
            });
        }

        // ============================================
        // INITIALIZE THE APPLICATION
        // ============================================

        function init() {
            console.log("Initializing Coloring Squares application...");
            
            // Build the DOM tree
            initializeColorPalette();
            initializePaintingGrid();
            
            // Set up event listeners
            setupEventListeners();
            
            console.log("Application ready! Start coloring!");
            console.log("=== LEARNING OBJECTIVES ===");
            console.log("✓ DOM Tree Manipulation");
            console.log("✓ DOM Events Handling");
            console.log("✓ CSS Grid Layout");
        }

        // Start the application when the page loads
        document.addEventListener('DOMContentLoaded', init);

        // ============================================
        // BONUS LEARNING: DEBUGGING AND EXPLORATION
        // ============================================

        // You can explore these in the browser console:
        window.exploreDOM = {
            // See the color palette element
            palette: colorPalette,
            
            // See all color options
            colorOptions: () => document.querySelectorAll('.color-option'),
            
            // See all grid cells
            gridCells: () => document.querySelectorAll('.grid-cell'),
            
            // Current application state
            state: () => ({
                selectedColor: selectedColor,
                isMouseDown: isMouseDown,
                totalColors: colors.length,
                totalCells: paintingGrid.children.length
            })
        };

        console.log("💡 Tip: Try 'exploreDOM.state()' in the console to see current state!");
        console.log("💡 Tip: Try 'exploreDOM.colorOptions()' to see all color elements!");
