# Historical Weather API

This application grabs temperature samples every hour from OpenWeatherMap for every location that is
present in the database.

The API has two endpoints:

# ./weather/getCurrentTemperature
- Input parameters:
  - cityName<string>: The name of the city you would like to get the current temperature of
  - countryCode<string>: The country code of the country the city is in

```javascript
{
    "currentTemperature": 12.53
}
```

# ./weather/getAverageTemperature
- Input parameters:
  - cityName<string>: The name of the city you would like to get the current temperature of
  - countryCode<string>: The country code of the country the city is in
  - fromDate<Date>: The range from where to start calculating the average temperature
  - toDate<Date> (optional): The range from where to stop calculating the average temperature

```javascript
{
    "averageTemperature": 12.53
}
