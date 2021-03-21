const calculateDistance = require('./calculateDistance');
const fullAddress = require('./fullAddress');

module.exports = (testCentres, latitude, longitude) => testCentres.map((testCentre) => ({
  ...testCentre,
  distance: calculateDistance(
    testCentre,
    latitude,
    longitude
  ),
  fullAddress: fullAddress(testCentre),
}))
  .sort((a, b) => a.distance - b.distance)
  .slice(0, 25);
