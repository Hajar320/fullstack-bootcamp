// Import axios mod
import axios from 'axios';

// Base URL for JSONPlaceholder API
const BASE_URL = 'https://jsonplaceholder.typicode.com';


async function fetchPosts(){
    try{
        const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
    }catch (error) {
    console.error('Error fetching posts:', error.message);
    throw error;
  }
};

// Export the fetchPosts function
export default fetchPosts
