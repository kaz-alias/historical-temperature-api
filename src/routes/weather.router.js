const { Router } = require('express');
const { getAverageTemperature, getCurrentTemperature } = require('../controllers/weather.controller');

const router = Router();

router.get('/getCurrentTemperature', getCurrentTemperature);
router.get('/getAverageTemperature', getAverageTemperature);

module.exports = router;
