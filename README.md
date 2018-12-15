# Welcome to Reacted Weather Web App
A humble weather web app built with ReactJS(v16.6.3), Node.JS(v10.14.1) and NPM(v6.4.1). Base application structure was created by `create-react-app` command.

## Dependencies
List of dependencies

### 1. [Semantic UI - ReactJS Components Library](https://react.semantic-ui.com/)(v0.84.0)
ReactJS component library beautified with [Semantic UI](https://semantic-ui.com/) CSS classes.
- `npm install --save semantic-ui-react`
### 2. [Axios](https://github.com/axios/axios)(v0.18.0)
A simplified promise based HTTP client for Node.JS applications.
- `npm install --save axios`
### 3. [Open Weather Map API](https://openweathermap.org)
Free weather API to get current weather and forecast based on various parameters like city, zip, co-ordinates etc.

## Usage
- Application has a simple interface, makes initial search at page load with location information from browser. 
![First time loading](https://github.com/codedcoder/reacted-weather-web-app/raw/master/public/app_screenshots/first-time-loading.png)
![After location sharing allowed](https://github.com/codedcoder/reacted-weather-web-app/raw/master/public/app_screenshots/after-allowing-location-sharing.png)
- Either zip or city can be manually entered to search for specific location in the world. 
![Search by zip](https://github.com/codedcoder/reacted-weather-web-app/raw/master/public/app_screenshots/search-by-zip-without-forecast.png)
- Five different countries can be selected from along with units either Celsius or Fahrenheit.
![Searched for China showing units in Celsius](https://github.com/codedcoder/reacted-weather-web-app/raw/master/public/app_screenshots/by-city-no-forecast-celsius.png)
- Weather search can be performed either by hitting enter key or by clicking 'Show Weather' button. As a result, Weather information is shown underneath the input area.
- Every 3 hours weather data for next 5 days can be viewed for the entered location by selecting forecast option and performing search again.
![Search with Forecast](https://github.com/codedcoder/reacted-weather-web-app/raw/master/public/app_screenshots/search-by-city-with-forecast-2.png)
- Weather card has distinctive color code i.e. for tempratures below(including) 72°F or 22°C, mild blue background color for some sections and the same will be orange otherwise. Example search can be performed for cities in the USA or UK vs. cities in Australia like Brisbane etc.
![Showing colorful weather cards - 1](https://github.com/codedcoder/reacted-weather-web-app/raw/master/public/app_screenshots/search-by-city-with-forecast-1.png)
![Showing colorful weather cards - 2](https://github.com/codedcoder/reacted-weather-web-app/raw/master/public/app_screenshots/search-by-zip-with-forecast.png)


