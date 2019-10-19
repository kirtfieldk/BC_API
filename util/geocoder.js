const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

console.log(process.env.GEOCODER_PROVIDER);

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
