const request = require('request');

var getWeather = (lat, lng, callback) => {

request({
	url:  `https://api.forecast.io/forecast/6003d1fb261b8a1c82b57fa9a468cc6d/${lat},${lng}`,
	json: true
}, (error, response, body) => {
     if ( !error && response.statusCode === 200) {
    callback(undefined, {
    	temperature:  body.currently.temperature,
        actualTemperature: body.currently.apparentTemperature
    });
    } else {
    	callback('unable to fetch weather');
    }
}); 
}

module.exports = {
	getWeather
};