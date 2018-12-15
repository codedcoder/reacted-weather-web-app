import React from 'react';
import openweather from '../api/openweather';
import WeatherInput from './WeatherInput';
import WeatherDisplay from './WeatherDisplay';

class App extends React.Component {
    state = {
        weatherObject: null,
        units: 'F',
        errorMsg: ''
    };

    onSearchSubmit = async (searchTerm, country, searchMethod, units, forecast, lat, lon, errorMsg) => {
        var reqParams = null;
        var endPoint = (forecast ? '/forecast' : '/weather');
        this.setState({weatherObject: null});

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
        } else if ((lat && null != lat && '' !== lat) && (lon && null != lon && '' !== lon)) {
            reqParams = {
                params: {
                    lat: lat,
                    lon: lon,
                    units: units
                }
            }
        } else { //possible error
            if (errorMsg) {
                this.setState({errorMsg: errorMsg});
            } else {
                this.setState({errorMsg: 'Unknown error'});
            }
        }
        if (null != reqParams) {
            try {
                const response = await openweather.get(endPoint, reqParams);
                //console.log('api call response: ' + response);
                if (response.data) {
                    this.setState({weatherObject: response.data});
                    this.setState({units: ('metric' === units ? 'C' : 'F')});
                }
            } catch(error) {
                if (error.response && error.response.data && error.response.data.message) {
                    console.log('api call error: ' + error.response.data.message);
                    this.setState({errorMsg: error.response.data.message});
                } else {
                    this.setState({errorMsg: error.message});
                }
                console.log('network error: ' + error.message);
            }
        }
    }

    render() {
        return (
            <div>
                <div className="ui container" style={{marginTop: '10px'}}>
                    <h1>Reacted Weather App</h1>
                    <WeatherInput onSubmit={this.onSearchSubmit}/>
                    <WeatherDisplay weather={this.state.weatherObject} units={this.state.units} errorMsg={this.state.errorMsg}/>
                </div>
            </div>
        );
    }
}

export default App;
