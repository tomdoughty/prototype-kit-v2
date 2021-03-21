const getTestCentres = require('./getTestCentres');
const facilities = require('./facilities');
const fullAddress = require('./fullAddress');
const openingTimes = require('./openingTimes');

module.exports = async (id) => {
  const testCentres = await getTestCentres();
  const testCentre = testCentres
    .find((centre) => centre.id === id);

  return {
    ...testCentre,
    facilities: facilities(testCentre),
    fullAddress: fullAddress(testCentre, true),
    openingTimes: openingTimes(testCentre),
  };
};
