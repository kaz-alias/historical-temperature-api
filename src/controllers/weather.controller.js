const { fetchLocation } = require('../db/locations.model');
const { fetchAverageTemperature } = require('../db/temperatures.model');
const { fetchTemperature } = require('../services/weather.service');

const getCurrentTemperature = async (req, res) => {
    const { cityName, countryCode } = req.query;
    if (!cityName || !countryCode) {
        res.status(400).send('No city name or country code given');
        return;
    }

    try {
        const currentTemperature = await fetchTemperature(cityName, countryCode);
        if (currentTemperature === null) {
            res.status(404).send('No temperature available for this location');
            return;
        }
        res.json({
            currentTemperature,
        });
    } catch (e) {
        res.status(500).send('Could not fetch temperature');
    }
};

const getAverageTemperature = async (req, res) => {
    const {
        cityName, countryCode, fromDate, toDate,
    } = req.query;
    if (!cityName || !countryCode || !fromDate) {
        res.status(400).send('No city name, country code or start date given');
        return;
    }

    const location = await fetchLocation(cityName, countryCode);
    if (!location) {
        res.status(404).send('No historical data available for this location');
        return;
    }
    const from = new Date(fromDate);
    const to = (toDate) ? new Date(toDate) : null;
    const averageTemperature = await fetchAverageTemperature(location._id, from, to);
    if (averageTemperature === null) {
        res.status(404).send('No historical data available for these dates');
        return;
    }
    res.json({
        averageTemperature,
    });
};

module.exports = {
    getCurrentTemperature,
    getAverageTemperature,
};
