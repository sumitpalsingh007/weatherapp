
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');

const argv = yargs
	.options({
     a: {
     	demand: true,
     	alias: 'address',
     	describe: 'Address to ftech weather for',
     	string: true
     }
	})
	.help()
	.alias('help', 'h')
    .argv;

    geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    	if (errorMessage) {
            console.log(errorMessage); 
    	} else {
            //console.log(JSON.stringify(result, undefined, 2));

            console.log(results.address);
            weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResult) => {
			if (errorMessage) {
            	console.log(weatherResult); 
    		} else {
            	console.log(JSON.stringify(`its currently ${weatherResult.temperature}. It feels like ${weatherResult.actualTemperature}`, undefined, 2));
    		}
			});
    	}
    });

// lat, long

//console.log(encodeURIComponent(argv.a));    





