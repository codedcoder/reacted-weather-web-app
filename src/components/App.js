import React from 'react';
import openweather from '../api/openweather';
import WeatherInput from './WeatherInput';
import WeatherDisplay from './WeatherDisplay';

class App extends React.Component {
    state = {
        weatherObject: null,
        units: 'F'
    };

    onSearchSubmit = async (searchTerm, country, searchMethod, units, forecast, lat, lon) => {
        var reqParams = null;
        var endPoint = (forecast ? '/forecast' : '/weather');
        if (searchTerm && null !== searchTerm && '' !== searchTerm) {
            if (searchMethod === 'by-zip') {
                reqParams = {
                    params: {
                        zip: searchTerm + ',' + country,
                        units: units
                    }
                }
            } else if (searchMethod === 'by-city') {
                reqParams = {
                    params: {
                        q: searchTerm + ',' + country,
                        units: units
                    }
                }
            }
        } else {
            reqParams = {
                params: {
                    lat: lat,
                    lon: lon,
                    units: units
                }
            }
        }
        if (null != reqParams) {
            const response = await openweather.get(endPoint, reqParams);
            if (response.data) {
                this.setState({weatherObject: response.data});
                this.setState({units: ('metric' === units ? 'C' : 'F')});
            }        
        }
    }

    render() {
        return (
            <div>
                <div className="ui container" style={{marginTop: '10px'}}>
                    <h1>Reacted Weather App</h1>
                    <WeatherInput onSubmit={this.onSearchSubmit}/>
                    <WeatherDisplay weather={this.state.weatherObject} units={this.state.units}/>
                </div>
            </div>
        );
    }
}

export default App;
