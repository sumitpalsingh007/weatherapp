
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
     a: {
     	demand: true,
     	alias: 'address',
     	describe: 'Address to fetch weather for',
     	string: true
     }
	})
	.help()
	.alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios.get(geocodeUrl).then((res) => {
    if (res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.forecast.io/forecast/6003d1fb261b8a1c82b57fa9a468cc6d/${lat},${lng}`;
    console.log('Success: ', res.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((res) => {
var temp = res.data.currently.temperature;
var appTemp = res.data.currently.apparentTemperature;
console.log(`Temperated is ${temp} it feels like ${appTemp}`);
})
.catch((error) =>{
    if(error.code === 'ENOTFOUND'){
        console.log('Error: ','Unable to find the aoi servers.');
    } else {
    console.log('Error: ',error.message);
  }

});