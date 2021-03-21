const calculateDistance = require('./calculateDistance');
const fullAddress = require('./fullAddress');

module.exports = (testCentres, filters, latitude, longitude) => testCentres
  .filter((testCentre) => filters.every(({ value }) => testCentre[value]))
  .map((testCentre) => ({
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
