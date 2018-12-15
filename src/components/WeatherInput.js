import React from 'react';
import { Checkbox } from 'semantic-ui-react';

class WeatherInput extends React.Component {
    state = { 
        lon: null, 
        lat: null, 
        searchTerm: '', 
        searchMethod: 'by-zip',
        country: 'US',
        units: 'imperial',
        forecast: false
    }

    componentDidMount = () => {    
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({lat: position.coords.latitude});
                this.setState({lon: position.coords.longitude});
                this.props.onSubmit(null, null, null, this.state.units, this.state.forecast, this.state.lat, this.state.lon);
            },
            err => {
                this.setState({errorMessage: err.message});
            }
        );
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchTerm.trim(), this.state.country, this.state.searchMethod, this.state.units, this.state.forecast, this.state.lat, this.state.lon);
    }

    onSearchMethodChange = (event) => {
        this.setState({searchMethod: event.target.value});
    }

    onCountryChange = (event) => {
        this.setState({country: event.target.value});
    }

    onForecastChange = (event) => {
        this.setState({forecast: !this.state.forecast});
    }

    renderContent() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h2 className="ui header">Enter location information</h2>
                <p>Default weather is based on your current location</p>
                <div className="ui action input">
                    <input 
                        value={this.state.searchTerm} 
                        placeholder='City or Zip...'
                        onChange={e => this.setState({searchTerm: e.target.value})}
                    />
                    <select className="ui compact selection dropdown" value={this.state.searchMethod} onChange={this.onSearchMethodChange}>
                        <option value="by-zip">By Zip Code</option>
                        <option value="by-city">By City</option>
                    </select>
                    <select className="ui compact selection dropdown" value={this.state.country} onChange={e => this.setState({country: e.target.value})}>
                        <option value="US">USA</option>
                        <option value="GB">UK</option>
                        <option value="IN">India</option>
                        <option value="CN">China</option>
                    </select>
                    <select className="ui compact selection dropdown" value={this.state.units} onChange={e => this.setState({units: e.target.value})}>
                        <option value="imperial">Fahrenheit</option>
                        <option value="metric">Celsius</option>
                    </select>
                    <div className="ui button" onClick={this.onFormSubmit}>Show Weather</div>
                </div>
                <div className="field" style={{marginTop: '1em'}}>
                    <Checkbox 
                        toggle 
                        label='5 Days Forecast'
                        checked={this.state.forecast} 
                        onChange={this.onForecastChange} 
                    />
                </div>
            </form>
        );
    }
    render() {
        return (
            <div className="ui segment" style={{backgroundColor: 'whitesmoke'}}>
                {this.renderContent()}
            </div>
        );
    }
}

export default WeatherInput;
