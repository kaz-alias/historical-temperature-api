const { Mongo } = require('./handler');

const insertTemperature = async (locationId, temperature) => Mongo.db
    .db('vopakdb')
    .collection('temperatures')
    .insertOne({
        temperature,
        date: new Date(),
        locationId,
    });

const fetchAverageTemperature = async (locationId, fromDate, toDate) => {
    const res = await Mongo.db
        .db('vopakdb')
        .collection('temperatures')
        .find({
            locationId,
            date: {
                $gte: fromDate,
                ...(toDate && { $lte: toDate }),
            },
        })
        .toArray();
    if (!res.length) return null;
    return res.reduce((acc, { temperature }) => acc + temperature, 0) / res.length;
};

module.exports = {
    insertTemperature,
    fetchAverageTemperature,
};
