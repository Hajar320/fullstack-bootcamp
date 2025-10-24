import axios from 'axios';
import chalk from 'chalk';

const API_KEY = '80004d0aedeb4fcb814155414252310';

// Use current.json endpoint for weather data
export default async function fetchWeather(cityname) {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
            params: {
                key: API_KEY,
                q: cityname
            }
        });
        
        const data = response.data; // axios returns data directly
        
        console.log(chalk.bgBlue.black("📍 Location:"));
        console.log(chalk.blue("   Name:", data.location.name));
        console.log(chalk.blue("   Country:", data.location.country));
        console.log(chalk.blue("   Region:", data.location.region));
        
        console.log(chalk.bgGreen.black("🌤️  Weather:"));
        console.log(chalk.green("   Temperature:", data.current.temp_c + "°C (" + data.current.temp_f + "°F)"));
        console.log(chalk.green("   Condition:", data.current.condition.text));
        console.log(chalk.green("   Humidity:", data.current.humidity + "%"));
        console.log(chalk.green("   Wind:", data.current.wind_kph + " km/h " + data.current.wind_dir));
        console.log(chalk.green("   Feels like:", data.current.feelslike_c + "°C"));
        
    } catch (error) {
        console.error('❌ Error fetching weather data:', error.message);
    }
}

