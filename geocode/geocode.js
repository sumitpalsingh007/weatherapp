const request = require('request');

const geocodeAddress = (address, callback) => {

request({
	url:  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
	json: true
}, (error, response, body) => {
    // if (error) {
    // 	callback('unbale to connect to google.');
    // } else if (body.status === 'ZERO_RESULTS') {
    //     callback('unable to find that address.');
    // } else 
    if (body.status === 'OK') {
    	callback(undefined, {
    		address: body.results[0].formatted_address,
    		latitude: body.results[0].geometry.location.lat,
    		longitude: body.results[0].geometry.location.lng
    	});
    //console.log('------------------------');
    //console.log(`Address: ${body.results[0].formatted_address}`);
    //console.log(`Lat: ${body.results[0].geometry.location.lat} Long: ${body.results[0].geometry.location.lng}`);
    } else{
    	console.log('unable to get address');
    }
}); 
}

module.exports = {
	geocodeAddress: geocodeAddress
};