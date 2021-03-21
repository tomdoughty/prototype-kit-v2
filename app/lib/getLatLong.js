const postcodes = require('node-postcodes.io');

module.exports = async (postcode) => postcodes.lookup(postcode);
