const axios = require('axios');

const apiKey = '801028781d4e268b6cf38beb60e4132d';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const fetchTemperature = async (cityName, countryCode) => {
    const weather = await axios.get(`${baseUrl}?q=${cityName},${countryCode}&appid=${apiKey}&units=metric`);
    // Workaround for optional chaining on AWS Lambda
    if (!weather || !weather.data || !weather.data.main) return null;
    const temperature = weather.data.main.temp;
    if (temperature === undefined) return null;
    return temperature;
};

module.exports = {
    fetchTemperature,
};
