const axios = require('axios');

const dataUrls = require('./dataUrls');
const cacheProvider = require('../../lib/cacheProvider');

module.exports = async () => {
  const cache = cacheProvider.instance();
  let testCentres = cache.get('testCentres');

  if (!testCentres) {
    console.log('no cache!');
    const allData = await Promise.all(dataUrls.map(async (tileUrl) => {
      const { data } = await axios(`https://maps.test-and-trace.nhs.uk/tileddata/${tileUrl}`);
      return data.testCentres;
    }));

    testCentres = allData
      .flat()
      // Horrible filter stolen from T&T
      .filter((tc) => tc.enabled && tc.orgId !== 'AACV');

    cache.set('testCentres', testCentres, 300);
  }

  return testCentres;
};
