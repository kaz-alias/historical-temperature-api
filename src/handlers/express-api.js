const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const mongoSanitize = require('express-mongo-sanitize');
const weatherRouter = require('../routes/weather.router');
const { Mongo } = require('../db/handler');
require('source-map-support/register');

let serverlessExpressInstance;

const setup = async (event, context) => {
    await Mongo.connect();
    const app = express();
    app.use(mongoSanitize());
    app.use('/weather', weatherRouter);
    app.get('*', (req, res) => res.sendStatus(404));
    serverlessExpressInstance = serverlessExpress({ app });
    return serverlessExpressInstance(event, context);
};

exports.handler = (event, context) => {
    if (serverlessExpressInstance) return serverlessExpressInstance(event, context);
    return setup(event, context);
};
