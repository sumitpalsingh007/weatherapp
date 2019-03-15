const request = require('request');

var geocodeAddress = (address) => {
   return new Promise((resolve, reject) => {

   request({
	url:  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
	json: true
}, (error, response, body) => {
    if (body.status === 'OK') {
    	resolve({
    		address: body.results[0].formatted_address,
    		latitude: body.results[0].geometry.location.lat,
    		longitude: body.results[0].geometry.location.lng
    	});
    } else {
    	reject(response);
    }
}); 

   });
};

geocodeAddress('122016').then((location) =>{
	console.log(JSON.stringify(location, undefined, 2));
}, (error) => {
	console.log('Error: ',response);
}); 