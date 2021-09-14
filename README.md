# Historical Weather API

This application grabs temperature samples every hour from OpenWeatherMap for every location that
exists in the database.

The API has two endpoints:

# /weather/getCurrentTemperature
- Input parameters:
  - cityName (string): The name of the city you would like to get the current temperature of (ex: Rotterdam)
  - countryCode (string): The country code of the country the city is in (ex: NL)
- Returns:
```javascript
{
    "currentTemperature": 12.53
}
```

# /weather/getAverageTemperature
- Input parameters:
  - cityName (string): The name of the city you would like to get the current temperature of (ex: Rotterdam)
  - countryCode (string): The country code of the country the city is in (ex: NL)
  - fromDate (Date): The range from which to start calculating the average temperature (ex: 2021-01-01 or 2021-01-01T00:00:00.000Z)
  - toDate (Date) -optional-: The range from which to stop calculating the average temperature (ex: 2021-01-01 or 2021-01-01T00:00:00.000Z)
- Returns:
```javascript
{
    "averageTemperature": 12.53
}
