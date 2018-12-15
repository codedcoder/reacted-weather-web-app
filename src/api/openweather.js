import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
        appid: '386c9c97ea96d6aa43a5f204cb9ca3ca',
        units: 'imperial'
    }
});