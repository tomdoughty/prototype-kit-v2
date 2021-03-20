const express = require('express');
const axios = require('axios');
const postcodes = require('node-postcodes.io');

const router = express.Router();

const calculateDistance = require('../lib/calculateDistance');
const dataUrls = require('../lib/dataUrls');
const mapResults = require('../lib/mapResults');
const savedData = require('../assets/src/data/data.json');

router.get('/data', async (_, res) => {
  const allData = await Promise.all(dataUrls.map(async (tileUrl) => {
    const { data } = await axios(`https://maps.test-and-trace.nhs.uk/tileddata/${tileUrl}`);
    return data.testCentres;
  }));
  return res.json(allData.flat());
});

router.get('/results', async (req, res) => {
  const { postcode } = req.query;

  try {
    const { result } = await postcodes.lookup(req.query.postcode);

    const results = savedData.map((tc) => ({
      ...tc,
      distance: calculateDistance(
        tc.location.lat,
        tc.location.lng,
        result.latitude,
        result.longitude
      ),
    }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 25)
      .map(mapResults);

    return res.render('v1/results', {
      postcode,
      results,
    });
  } catch (error) {
    return res.render('v1/results', {
      postcode: postcode || '',
      results: [],
    });
  }
});

module.exports = router;
