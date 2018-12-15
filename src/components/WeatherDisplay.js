import React from 'react';
import { Placeholder, Message, Label, Feed, Card, Image } from 'semantic-ui-react'

class WeatherDisplay extends React.Component {

    daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    renderContent = (name, weather, country, units, centered) => {
        var imgSrc = 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';
        var thisDate = (weather.dt_txt ? new Date(weather.dt_txt) : new Date());

        var timeStr = "" + ((thisDate.getHours() > 12) ? thisDate.getHours() - 12 : thisDate.getHours());
        timeStr  += ((thisDate.getMinutes() < 10) ? ":0" : ":") + thisDate.getMinutes();
        timeStr  += (thisDate.getHours() >= 12) ? " PM" : " AM";

        var dateStr = (this.daysOfWeek[thisDate.getDay()] + ', ' + thisDate.getMonth() + '/' + thisDate.getDate());
        var cardBackgroundColor = (Math.round(weather.main.temp) > (units === 'F' ? 72 : 22) ? 'orange' : 'aliceblue');
        return (
            <Card centered={centered} key={weather.dt}>
                <Card.Content style={{backgroundColor: cardBackgroundColor}}>
                    <Card.Header>
                        {name + ', ' + country}
                        <Image floated='right' src={imgSrc} alt={weather.weather[0].description}/>
                    </Card.Header>
                    <Card.Meta>{dateStr + ' - ' + timeStr}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    Current
                                </Feed.Summary>
                            </Feed.Content>
                            <Label circular style={{backgroundColor: cardBackgroundColor, width: 'auto'}}>
                                {Math.round(weather.main.temp)+'°'+units}
                            </Label>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    Max
                                </Feed.Summary>
                            </Feed.Content>
                            <Label circular style={{backgroundColor: cardBackgroundColor, width: 'auto'}}>
                                {Math.round(weather.main.temp_max)+'°'+units}
                            </Label>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    Min
                                </Feed.Summary>
                            </Feed.Content>
                            <Label circular style={{backgroundColor: cardBackgroundColor, width: 'auto'}}>
                                {Math.round(weather.main.temp_min)+'°'+units}
                            </Label>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    Humidity
                                </Feed.Summary>
                            </Feed.Content>
                            <Label circular style={{backgroundColor: cardBackgroundColor, width: 'auto'}}>
                                {Math.round(weather.main.humidity)+'%'}
                            </Label>
                        </Feed.Event>
                    </Feed>
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
        } else if (this.props.errorMsg) {
            return (
                <Message negative>
                    <Message.Header>Weather information could not be retrieved!</Message.Header>
                    <p>Internal error: {this.props.errorMsg}</p>
                </Message>
            )
        } else {
            return (
                <Card centered={true}>
                    <Card.Content>
                        <Placeholder>
                        <Placeholder.Image square />
                        </Placeholder>
                    </Card.Content>
                </Card>
            )
        }
    }
}

export default WeatherDisplay;
