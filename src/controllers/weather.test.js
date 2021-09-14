const { ObjectId } = require('bson');
const weatherService = require('../services/weather.service');
const weatherController = require('./weather.controller');
const locationsModel = require('../db/locations.model');
const temperaturesModel = require('../db/temperatures.model');

jest.mock('mongodb');
jest.mock('../db/handler');
jest.mock('../services/weather.service');
jest.mock('../db/locations.model');
jest.mock('../db/temperatures.model');

describe('weather.controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getCurrentTemperature', () => {
        it('should return an error if cityName is not passed', async () => {
            const reqMock = {
                query: {
                    countryCode: 'NL',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            await weatherController.getCurrentTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.send).toHaveBeenCalledWith('No city name or country code given');
        });

        it('should return an error if countryCode is not passed', async () => {
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            await weatherController.getCurrentTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.send).toHaveBeenCalledWith('No city name or country code given');
        });

        it('should return an error if the location can not be found', async () => {
            jest.spyOn(weatherService, 'fetchTemperature').mockReturnValue(null);
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                    countryCode: 'NL',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            await weatherController.getCurrentTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(404);
            expect(resMock.send).toHaveBeenCalledWith('No temperature available for this location');
        });

        it('should get the current temperature for a given location', async () => {
            jest.spyOn(weatherService, 'fetchTemperature').mockReturnValue(123);
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                    countryCode: 'NL',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            await weatherController.getCurrentTemperature(reqMock, resMock);
            expect(resMock.json).toHaveBeenCalledWith({ currentTemperature: 123 });
        });
    });

    describe('getAverageTemperature', () => {
        it('should return an error if cityName is not passed', async () => {
            const reqMock = {
                query: {
                    countryCode: 'NL',
                    fromDate: '2021-09-01T00:00:00.000Z',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            await weatherController.getAverageTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.send).toHaveBeenCalledWith('No city name, country code or start date given');
        });

        it('should return an error if countryCode is not passed', async () => {
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                    fromDate: '2021-09-01T00:00:00.000Z',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            await weatherController.getAverageTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.send).toHaveBeenCalledWith('No city name, country code or start date given');
        });

        it('should return an error if fromDate is not passed', async () => {
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                    countryCode: 'NL',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            await weatherController.getAverageTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.send).toHaveBeenCalledWith('No city name, country code or start date given');
        });

        it('should return an error if a location doesn\'t exist', async () => {
            jest.spyOn(locationsModel, 'fetchLocation').mockReturnValue(null);
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                    countryCode: 'NL',
                    fromDate: '2021-09-01T00:00:00.000Z',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            await weatherController.getAverageTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(404);
            expect(resMock.send).toHaveBeenCalledWith('No historical data available for this location');
        });

        it('should return an error if there is no historical data for the given dates', async () => {
            jest.spyOn(locationsModel, 'fetchLocation').mockReturnValue({
                _id: ObjectId('6135359d308ad3019731d9cb'),
                city: 'Rotterdam',
                countryCode: 'NL',
            });
            jest.spyOn(temperaturesModel, 'fetchAverageTemperature').mockReturnValue(null);
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                    countryCode: 'NL',
                    fromDate: '2021-09-01T00:00:00.000Z',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            await weatherController.getAverageTemperature(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(404);
            expect(resMock.send).toHaveBeenCalledWith('No historical data available for these dates');
        });

        it('should return the average temperature for a specific location', async () => {
            jest.spyOn(locationsModel, 'fetchLocation').mockReturnValue({
                _id: ObjectId('6135359d308ad3019731d9cb'),
                city: 'Rotterdam',
                countryCode: 'NL',
            });
            jest.spyOn(temperaturesModel, 'fetchAverageTemperature').mockReturnValue(123);
            const reqMock = {
                query: {
                    cityName: 'Rotterdam',
                    countryCode: 'NL',
                    fromDate: '2021-09-01T00:00:00.000Z',
                },
            };
            const resMock = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            await weatherController.getAverageTemperature(reqMock, resMock);
            expect(resMock.json).toHaveBeenCalledWith({ averageTemperature: 123 });
        });
    });
});
