const { Mongo } = require('./handler');

const fetchLocation = async (city, countryCode) => Mongo.db
    .db('vopakdb')
    .collection('locations')
    .findOne({
        city,
        countryCode,
    });

const fetchAllLocations = async () => Mongo.db
    .db('vopakdb')
    .collection('locations')
    .find({})
    .toArray();

module.exports = {
    fetchLocation,
    fetchAllLocations,
};
