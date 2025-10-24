import readline from 'readline';
import fetchWeather from './weather.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export default function weather(){

rl.question('🌤️  Enter city name to get weather: ', async (cityName) => {
    console.log(`\nFetching weather for ${cityName}...\n`);
    await fetchWeather(cityName);
    rl.close();
});

rl.on('close', () => {
    console.log('\nThanks for using our weather service! ☀️');
    process.exit(0);
});
}

