import axios from 'axios';
import promptSync from 'prompt-sync';

const prompt = promptSync();

const API_KEY = '80004d0aedeb4fcb814155414252310'; // This is a demo key


export default async function fetchWeather() {
    const query =prompt('enter the location :');
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/search.json`, {
            params: {
                key: API_KEY,
                q: query
            }
        });
        const data = response.data;
        return console.log(data)        
    } catch (error) {
        console.error('❌ Error fetching weather data:', error.message);
    }
}


