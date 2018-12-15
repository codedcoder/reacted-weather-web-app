import React from 'react';
import { Card, Image } from 'semantic-ui-react'

class WeatherDisplay extends React.Component {

    daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'];

    renderContent = (name, weather, country, units, centered) => {
        var imgSrc = 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';
        var thisDate = (weather.dt_txt ? new Date(weather.dt_txt) : new Date());

        var timeStr = "" + ((thisDate.getHours() > 12) ? thisDate.getHours() - 12 : thisDate.getHours());
        timeStr  += ((thisDate.getMinutes() < 10) ? ":0" : ":") + thisDate.getMinutes();
        timeStr  += (thisDate.getHours() >= 12) ? " PM" : " AM";

        var dateStr = (this.daysOfWeek[thisDate.getDay() - 1] + ', ' + thisDate.getMonth() + '/' + thisDate.getDate());
        return (
            <Card centered={centered} key={weather.dt}>
                <Card.Content style={{backgroundColor: 'aliceblue'}}>
                    <Card.Header>
                        {name + ', ' + country}
                        <Image floated='right' src={imgSrc} alt={weather.weather[0].description}/>
                    </Card.Header>
                    <Card.Meta>{dateStr + ' - ' + timeStr}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Card.Description>
                        Current Temp: {Math.round(weather.main.temp)}°{units}
                    </Card.Description>
                    <Card.Description>
                        Max Temp: {Math.round(weather.main.temp_max)}°{units}
                    </Card.Description>
                    <Card.Description>
                        Min Temp: {Math.round(weather.main.temp_min)}°{units}
                    </Card.Description>
                    <Card.Description>
                        Humidity: {Math.round(weather.main.humidity)}%
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
    render = () => {
        if (this.props.weather && null != this.props.weather) {
            if (this.props.weather.list && null != this.props.weather.list) {
                return (
                    <Card.Group>
                        {this.props.weather.list.map((thisWeather) => {
                            return this.renderContent(
                                this.props.weather.city.name, 
                                thisWeather, 
                                this.props.weather.city.country, 
                                this.props.units,
                                false)
                        })}
                    </Card.Group>
                );
            } else {
                return (
                    this.renderContent(
                        this.props.weather.name, 
                        this.props.weather, 
                        this.props.weather.sys.country, 
                        this.props.units,
                        true)
                );
            }
        } else {
            return (
                <div>
                    No weather data :(.
                </div>
            )
        }
    }
}

export default WeatherDisplay;
