const { Mongo } = require('../db/handler');
const { fetchAllLocations } = require('../db/locations.model');
const { insertTemperature } = require('../db/temperatures.model');
const { fetchTemperature } = require('../services/weather.service');

exports.handler = async () => {
    console.log('Retrieving temperatures');
    await Mongo.connect();
    const locations = await fetchAllLocations();
    await Promise.all(locations.map(async (location) => {
        const temperature = await fetchTemperature(location.city, location.countryCode);
        await insertTemperature(location._id, temperature);
    }));
};
