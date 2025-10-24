// Giphy API configuration
const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const BASE_URL = 'https://api.giphy.com/v1/gifs';

// DOM elements
const gifForm = document.getElementById('gifForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const gifsContainer = document.getElementById('gifsContainer');

// Store GIFs data for deletion
let gifs = [];

// Function to fetch random GIF based on search term
async function fetchRandomGif(searchTerm) {
    try {
        // Build the API URL
        const url = `${BASE_URL}/random?api_key=${API_KEY}&tag=${encodeURIComponent(searchTerm)}&rating=g`;
        
        // Fetch data from Giphy API
        const response = await fetch(url);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convert response to JSON
        const data = await response.json();
        
        // Add GIF to our array and display it
        addGif(data.data, searchTerm);
        
    } catch (error) {
        // Handle errors
        showError(`Failed to fetch GIF: ${error.message}`);
        console.error('Error fetching GIF:', error);
    } finally {
        // Re-enable the button
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search GIF';
    }
}

// Function to add GIF to the page
function addGif(gifData, searchTerm) {
    if (!gifData || !gifData.images) {
        showError('look for a gif ');
        return;
    }
    
    // Get the original GIF URL from the images sub-object
    const gifUrl = gifData.images.original.url;
    const gifId = gifData.id;
    const gifTitle = gifData.title || `GIF about ${searchTerm}`;
    
    // Create unique ID for this GIF item
    const gifItemId = `gif-${gifId}`;
    
    // Create HTML for the GIF item
    const gifHTML = `
        <div class="gif-item" id="${gifItemId}">
            <img 
                class="gif-image" 
                src="${gifUrl}" 
                alt="${gifTitle}"
                title="${gifTitle}"
            >
            <button class="delete-btn" onclick="deleteGif('${gifItemId}')">
                ❌ DELETE
            </button>
        </div>
    `;
    
    // Add to the beginning of the container (newest first)
    gifsContainer.insertAdjacentHTML('afterbegin', gifHTML);
    
    // Store GIF data for potential future use
    gifs.push({
        id: gifItemId,
        url: gifUrl,
        title: gifTitle,
        searchTerm: searchTerm
    });


    
    // Update delete all button visibility
    updateDeleteAllButton();
}

// Function to delete a specific GIF
function deleteGif(gifId) {
    const gifElement = document.getElementById(gifId);
    if (gifElement) {
        gifElement.remove();
        
        // Remove from our gifs array
        gifs = gifs.filter(gif => gif.id !== gifId);
        
        // Update delete all button visibility
        updateDeleteAllButton();
    }
}

// Function to delete all GIFs
function deleteAllGifs() {
    if (gifs.length === 0) {
        showError('No GIFs to delete!');
        return;
    }
    
    // Remove all GIF elements
    gifsContainer.innerHTML = '';
    
    // Clear the gifs array
    gifs = [];
    
    // Update delete all button visibility
    updateDeleteAllButton();
    
    // Show empty state
    showEmptyState();
}

// Function to update delete all button visibility
function updateDeleteAllButton() {
    if (gifs.length === 0) {
        deleteAllBtn.style.display = 'none';
    } else {
        deleteAllBtn.style.display = 'block';
    }
}

// Function to show loading state
function showLoading() {
    gifsContainer.innerHTML = `
        <div class="loading">
            <p>🔍 Searching for GIFs...</p>
        </div>
    `;
}

// Function to show error message
function showError(message) {
    const errorHTML = `
        <div class="error">
            <p>❌ ${message}</p>
        </div>
    `;
    
    // Add error message at the top
    gifsContainer.insertAdjacentHTML('afterbegin', errorHTML);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        const errorElement = gifsContainer.querySelector('.error');
        if (errorElement) {
            errorElement.remove();
        }
    }, 3000);
}

// Function to show empty state
function showEmptyState() {
    if (gifs.length === 0) {
        gifsContainer.innerHTML = `
            <div class="empty-state">
                <p>Search for something above 👆</p>
            </div>
        `;
    }
}

// Event listener for form submission
gifForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing page
    
    // Get the search term and trim whitespace
    const searchTerm = searchInput.value.trim();
    
    // Validate input
    if (!searchTerm) {
        showError('Please enter a search term!');
        return;
    }
    
    // Disable button during search
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';
    
    // Clear input
    searchInput.value = '';
    
    // Fetch the random GIF
    await fetchRandomGif(searchTerm);
});

// Event listener for delete all button
deleteAllBtn.addEventListener('click', deleteAllGifs);

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Hide delete all button initially
    updateDeleteAllButton();
    
    // Show empty state
    showEmptyState();
});